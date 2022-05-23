import React from "react";

import { render, cleanup, fireEvent, waitForElement } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

// describe("Application", () => {
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
// });