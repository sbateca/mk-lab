import {render, screen} from "@testing-library/react";

import Header from "./Header";
import {CookiesProvider} from "../../../Context/Cookie/CookieContext";

describe("Header", () => {
  let companyName: string;

  beforeEach(() => {
    companyName = "Company Name test";
    render(
      <CookiesProvider>
        <Header companyName={companyName} />
      </CookiesProvider>,
    );
  });

  it("should render the company name passed by arguments", () => {
    expect(screen.getByText(companyName)).toBeInTheDocument();
  });

  it("Should render the menu icon successfuly", () => {
    expect(screen.getByLabelText("menu")).toBeInTheDocument();
  });
});
