import React from "react";

import { render, cleanup , waitForElement, getByText, prettyDOM, queryByAltText, 
  getAllByTestId, queryByText, getByAltText, getByLabelText, getByDisplayValue} from "@testing-library/react";

import DayListItem from "components/DayListItem";
import Application from "components/Application"
import { fireEvent } from "@testing-library/react/dist";

afterEach(cleanup);

describe("DayListItem", () => {
  xit("renders without crashing", () => {
    render(<DayListItem />);
  });

  xit("renders 'no spots remaining' when there are 0 spots", () => {
    const { getByText } = render(<DayListItem name="Monday" spots={0} />);
    expect(getByText("no spots remaining")).toBeInTheDocument();
  });

  xit("renders '1 spot remaining' when there is 1 spot", () => {
    const { getByText } = render(<DayListItem name="Monday" spots={1} />);
    expect(getByText("1 spot remaining")).toBeInTheDocument();
  });

  xit("renders '2 spots remaining' when there are 2 spots", () => {
    const { getByText } = render(<DayListItem name="Monday" spots={2} />);
    expect(getByText("2 spots remaining")).toBeInTheDocument();
  });

  xit("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
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
  
    expect(getByText(day, "1 spots remaining")).toBeInTheDocument();

    //debug - This way we can continue to verify that our DOM contains what we expect it to as we go through phase two of our test.
    debug();
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

  // Click the "Save" button on the confirmation.

  // Ensure no spots change for "Monday"
  
  // Check that the element with the text "Saving" is displayed.


  debug();
  })

});