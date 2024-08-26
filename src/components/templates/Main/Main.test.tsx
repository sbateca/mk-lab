import {render, screen} from "@testing-library/react";
import {MainTemplate} from "./Main";

jest.mock("../../../utils/localStorage", () => ({
  localStorageContainsField: () => true,
}));

describe("MainTemplate", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render header, menu, and mainContent if there is user data in local storage", () => {
    render(
      <MainTemplate
        header={<div data-testid="header">Header</div>}
        menu={<div data-testid="menu">Menu</div>}
        mainContent={<div data-testid="mainContent">Main Content</div>}
      />,
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("menu")).toBeInTheDocument();
    expect(screen.getByTestId("mainContent")).toBeInTheDocument();
  });
});
