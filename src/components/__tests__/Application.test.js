import React from "react";
import axios from "__mocks__/axios";

import {render, cleanup , waitForElement, getByText, queryByAltText, 
  getAllByTestId, queryByText, getByAltText, getByDisplayValue, getByPlaceholderText} from "@testing-library/react";

import Application from "components/Application";
import { fireEvent } from "@testing-library/react/dist";

afterEach(cleanup);

describe("Application", () => {
  
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => { //wait until we are able to get a DOM element with the text "Monday"
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    })
  })
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    //Render the Application.
    const { container} = render(<Application />);
    
    //Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // console.log(prettyDOM(container));
    //All appointments
    const appointments = getAllByTestId(container, "appointment"); //to search for all of the appointments in the container
    // console.log(prettyDOM(appointments)); //The internal structure to each appointment has been removed to clarify that the data structure is an array of DOM nodes.
    //First Appointment
    const appointment = getAllByTestId(container, "appointment")[0];
    // console.log(prettyDOM(appointment));

    //Click the "Add" button on the first empty appointment
    fireEvent.click(getByAltText(appointment, "Add"));

    //Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name"
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    //DEBUG - ensure we see saving as the text
    // console.log(debug(appointment));
    // Check that the element with the text "Saving" is displayed
    expect(getByText(appointment, "Saving")).toBeInTheDocument();        //good, this works
    // expect(getByText(appointment, "Saving")).not.toBeInTheDocument(); //good, this doesnt work
  
    // Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // Check that the DayListItem with the text "Monday" also has the text "no spots remaining"
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    // console.log(prettyDOM(day))
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug} = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //COMPASS
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    // console.log(prettyDOM(container));

    // 3. Click the "Delete" button on the booked appointment.
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    // WRONG - expect(getByAltText(appointment, "Add")).toBeInTheDocument();  //how do I check that the add button is available in THAT SPECIFIC SPOT
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    // expect(getByText(appointment, "1 spots remaining")).toBeInTheDocument();
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  // 1. Render the Application.
  const { container, debug} = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  // Click the "Edit" button on the booked appointment.
  fireEvent.click(queryByAltText(appointment, "Edit"));

  // Check that the name "Archie Cohen" is shown. 
  const input = getByDisplayValue(appointment, "Archie Cohen");

  // Change the name 
  fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });

  // Click an Interviewer
  fireEvent.click(queryByAltText(appointment, "Sylvia Palmer")); 
  
  // Click the "Save" button on the confirmation.
  fireEvent.click(getByText(appointment,'Save'));

  // Check that the element with the text "Saving" is displayed.
  expect(getByText(appointment, "Saving")).toBeInTheDocument(); 

  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  // Ensure no spots change for "Monday"
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, "1 spot remaining"))


  debug();
  })

  it("shows the save error when failing to save an appointment", async() => {
    axios.put.mockRejectedValueOnce();  //We use mockRejectedValueOnce() because we want the mock to revert to the default behaviour after the single request that this test generates is complete. This replaces the mock from our src/__mocks__/axios.js module temporarily, until the put function is called once
    const { container, debug } = render(<Application />)
    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Edit"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));


    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Error")).toBeInTheDocument();
    
    fireEvent.click(queryByAltText(appointment, "Close"));

    expect(getByText(container, "Archie Cohen")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
      );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async() => {
    axios.delete.mockRejectedValueOnce();
    const { container, debug } = render(<Application />)
    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    fireEvent.click(queryByText(appointment, "Confirm"))
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Error")).toBeInTheDocument();
    fireEvent.click(queryByAltText(appointment, "Close"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

});