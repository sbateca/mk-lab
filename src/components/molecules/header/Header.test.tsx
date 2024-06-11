import {render, screen} from "@testing-library/react";

import Header from "./Header";

describe("Header", () => {
  let companyName: string;

  beforeEach(() => {
    companyName = "Company Name test";
    render(<Header companyName={companyName} />);
  });

  it("should render the company name passed by arguments", () => {
    expect(screen.getByText(companyName)).toBeInTheDocument();
  });

  it("Should render the menu icon successfuly", () => {
    expect(screen.getByLabelText("menu")).toBeInTheDocument();
  });
});
