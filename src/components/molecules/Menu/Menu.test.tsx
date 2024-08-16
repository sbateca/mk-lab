import {fireEvent, render, screen} from "@testing-library/react";

import {MenuProvider} from "../../../context/Menu/MenuContext";
import {Header} from "../Header";
import {MenuProps} from "./Types";
import {Menu} from "./Menu";

describe("Menu component", () => {
  it("should render the menu with the elements passed by arguments successfuly", () => {
    const mockMenuProps: MenuProps = {
      menuItems: [{label: "Mock Home"}, {label: "Mock Contacts"}],
    };
    const companyName = "Company Name test";

    render(
      <MenuProvider>
        <Header companyName={companyName} />
        <Menu menuItems={mockMenuProps.menuItems} />
      </MenuProvider>,
    );
    const menu = screen.getByLabelText("menu");
    fireEvent.click(menu);

    const {menuItems} = mockMenuProps;
    menuItems.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it("the Menu component items (Drawer) should not appear by default", () => {
    const mockMenuProps: MenuProps = {
      menuItems: [{label: "Mock Home"}, {label: "Mock Contacts"}],
    };

    render(
      <MenuProvider>
        <Menu menuItems={mockMenuProps.menuItems} />
      </MenuProvider>,
    );

    const menuItems = screen.queryByRole("presentation");
    expect(menuItems).toBeNull();
  });
});
