import {render, fireEvent, screen} from "@testing-library/react";

import UserMenu from "./UserMenu";
import {LOCAL_STORAGE_USER_KEY} from "../../../utils/constants/pages/shared";

const mockReload = jest.fn();
Object.defineProperty(window, "location", {
  value: {reload: mockReload},
});

describe("UserMenu component", () => {
  beforeEach(() => {
    Storage.prototype.removeItem = jest.fn();
    jest.spyOn(window.location, "reload").mockImplementation(() => {});

    render(<UserMenu username="testuser" />);
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

    expect(localStorage.removeItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_USER_KEY,
    );
    expect(mockReload).toHaveBeenCalled();
  });
});
