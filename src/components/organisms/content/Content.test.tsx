import {render, screen} from "@testing-library/react";

import {MenuContext, MenuProvider} from "../../../Context/Menu/MenuContext";
import Content from "./Content";

jest.mock("../../../Config/envManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://example.com/api",
  },
}));

jest.mock("../../Organisms/samplesContent/SamplesContent", () => ({
  __esModule: true,
  default: () => <div aria-label="samples-content"></div>,
}));

jest.mock("../../Organisms/reports/reports", () => ({
  __esModule: true,
  default: () => <div aria-label="reports-content"></div>,
}));

const renderWithCustomContext = (selectedMenuItem: string) => {
  return render(
    <MenuContext.Provider
      value={{
        menuOpen: false,
        selectedMenuItem: selectedMenuItem,
        setSelectedMenuItem: () => {},
        toggleMenu: () => {},
      }}
    >
      <Content />
    </MenuContext.Provider>,
  );
};

describe("Content component", () => {
  it("renders SamplesContent when selectedMenuItem is 'Samples'", () => {
    render(
      <MenuProvider>
        <Content />
      </MenuProvider>,
    );
    expect(screen.getByLabelText("samples-content")).toBeInTheDocument();
  });

  it("renders Reports when selectedMenuItem is 'Reports'", () => {
    renderWithCustomContext("Reports");

    expect(screen.getByLabelText("reports-content")).toBeInTheDocument();
  });

  it("renders SamplesContent by default when selectedMenuItem is unknown", () => {
    render(
      <MenuProvider>
        <Content />
      </MenuProvider>,
    );
    expect(screen.getByLabelText("samples-content")).toBeInTheDocument();
  });
});
