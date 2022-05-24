import React from "react";

import {render, cleanup, fireEvent, waitForElement, prettyDOM,  getByText, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  // xit("renders without crashing", () => {
  //   render(<Application />);
  // });
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
    console.log(prettyDOM(appointment));

    // Check that the element with the text "Saving" is displayed.
    // Wait until the element with the text "Lydia Miller-Jones" is displayed.
    // Check that the DayListItem with the text "Monday" also has the text "no spots remaining"
  });
});