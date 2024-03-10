import { fireEvent, render, screen } from "@testing-library/react"

import { CookiesProvider } from "../../../context/Cookie/CookieContext"
import { MenuProvider } from "../../../context/Menu/MenuContext"
import Header from "../header/Header"
import { MenuProps } from "./Types"
import Menu from "./Menu"

describe("Menu component", () => {
    it("should render the menu with the elements passed by arguments successfuly", () => {
        const mockMenuProps: MenuProps = {
            menuItems: [
                { label: "Mock Home" },
                { label: "Mock Contacts" },
            ],
        };
        const companyName = "Company Name test";

        render(
            <CookiesProvider>
            <MenuProvider>
                <Header companyName={companyName} />
                <Menu menuItems={mockMenuProps.menuItems} />
            </MenuProvider>
            </CookiesProvider>
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
            menuItems: [
                { label: "Mock Home" },
                { label: "Mock Contacts" },
            ],
        };

        render(
            <CookiesProvider>
            <MenuProvider>
                <Menu menuItems={mockMenuProps.menuItems} />
            </MenuProvider>
            </CookiesProvider>
        );

        const menuItems = screen.queryByRole("presentation");
        expect(menuItems).toBeNull();
    });
});
