import { render, screen } from "@testing-library/react"
import Content from "./Content"
import { MenuContext, MenuProvider } from "../../../context/Menu/MenuContext"

jest.mock("../../../config/envManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://example.com/api",
  },
}));

jest.mock("../../organisms/samplesContent/SamplesContent", () => ({
  __esModule: true,
  default: () => <div aria-label="samples-content"></div>,
}));

jest.mock("../../organisms/reports/reports", () => ({
  __esModule: true,
  default: () => <div aria-label="reports-content"></div>,
}));

const renderWithCustomContext = (selectedItem: string) => {
  return render(
    <MenuContext.Provider
      value={{
        menuOpen: false,
        selectedItem: selectedItem,
        setSelectedItem: () => { },
        toggleMenu: () => { },
      }}
    >
      <Content />
    </MenuContext.Provider>
  );
};

describe("Content component", () => {
  it("renders SamplesContent when selectedItem is 'Samples'", () => {
    render(
      <MenuProvider>
        <Content />
      </MenuProvider>
    );
    expect(screen.getByLabelText("samples-content")).toBeInTheDocument();
  });

  it("renders Reports when selectedItem is 'Reports'", () => {
    renderWithCustomContext("Reports");

    expect(screen.getByLabelText("reports-content")).toBeInTheDocument();
  });

  it("renders SamplesContent by default when selectedItem is unknown", () => {
    render(
      <MenuProvider>
        <Content />
      </MenuProvider>
    );
    expect(screen.getByLabelText("samples-content")).toBeInTheDocument();
  });
});
