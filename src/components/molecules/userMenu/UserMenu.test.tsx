import { render, fireEvent, screen } from "@testing-library/react"

import { CookiesProvider } from "../../../context/Cookie/CookieContext"
import UserMenu from "./UserMenu"

const mockCookies = {
  remove: jest.fn(),
};
const mockReload = jest.fn();
Object.defineProperty(window, "location", {
  value: { reload: mockReload },
});

describe("UserMenu component", () => {
    beforeEach(() => {
        render(
          <CookiesProvider>
            <UserMenu username="testuser" cookies={mockCookies} />
          </CookiesProvider>
        );
    });

  it("renders username correctly", () => {
    expect(screen.getByText("testuser")).toBeInTheDocument();
  });

  it("opens the user menu when IconButton is clicked", () => {
    fireEvent.click(screen.getByLabelText("account of current user"));

    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("calls cookies.remove and reloads the window when Logout is clicked", () => {
    fireEvent.click(screen.getByLabelText("account of current user"));
    fireEvent.click(screen.getByText("Logout"));

    expect(mockCookies.remove).toHaveBeenCalledWith("userData");
    expect(mockReload).toHaveBeenCalled();
  });
});
