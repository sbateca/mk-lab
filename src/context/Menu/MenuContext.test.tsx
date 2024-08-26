import {render, screen, fireEvent} from "@testing-library/react";
import {MenuProvider} from "./MenuContext";
import {SharedMenuItems} from "../../utils/enums";
import {useMenu} from "../../utils/hooks";

jest.mock("../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

const TesComponent = () => {
  const {menuOpen, selectedMenuItem, setSelectedMenuItem, toggleMenu} =
    useMenu();
  return (
    <div>
      <span data-testid="menuOpenValue">{menuOpen.toString()}</span>
      <span data-testid="selectecMenuItemValue">{selectedMenuItem}</span>
      <button onClick={toggleMenu}>Toggle Menu</button>
      <button onClick={() => setSelectedMenuItem(SharedMenuItems.SAMPLES)}>
        Set Selected Menu Item
      </button>
    </div>
  );
};

describe("MenuProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render children", async () => {
    render(
      <MenuProvider>
        <TesComponent />
      </MenuProvider>,
    );

    const childComponent = screen.getByText("Toggle Menu");
    expect(childComponent).toBeInTheDocument();
  });

  it("should toggle menuOpen state when toggleMenu is called", async () => {
    render(
      <MenuProvider>
        <TesComponent />
      </MenuProvider>,
    );

    const toggleButton = screen.getByText("Toggle Menu");
    const menuOpenValue = screen.getByTestId("menuOpenValue");

    expect(menuOpenValue).toHaveTextContent("false");
    fireEvent.click(toggleButton);
    expect(menuOpenValue).toHaveTextContent("true");
    fireEvent.click(toggleButton);
    expect(menuOpenValue).toHaveTextContent("false");
  });

  it("should update selectedMenuItem state when setSelectedMenuItem is called", async () => {
    render(
      <MenuProvider>
        <TesComponent />
      </MenuProvider>,
    );

    const setMenuItemButton = screen.getByText("Set Selected Menu Item");
    fireEvent.click(setMenuItemButton);

    expect(screen.getByTestId("selectecMenuItemValue")).toHaveTextContent(
      SharedMenuItems.SAMPLES,
    );
  });
});
