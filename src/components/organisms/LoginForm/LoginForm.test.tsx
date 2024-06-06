import {render, screen, fireEvent, waitFor} from "@testing-library/react";

import {getUserByUserNameAndPassword} from "../../../Services/userService";
import LoginForm from "./LoginForm";

jest.mock("../../../Config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

jest.mock("../../../Utils/Hooks/useCookies", () => ({
  useCookies: () => ({set: jest.fn()}),
}));

jest.mock("../../../Services/userService", () => ({
  getUserByUserNameAndPassword: jest.fn(),
}));

describe("LoginForm component", () => {
  it("renders form fields correctly", () => {
    render(
      <LoginForm
        fields={[
          {name: "username", label: "Username", type: "text", required: true},
          {
            name: "password",
            label: "Password",
            type: "password",
            required: true,
          },
        ]}
      />,
    );

    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
  });

  it("displays error message if login fails", async () => {
    (getUserByUserNameAndPassword as jest.Mock).mockResolvedValue([]);
    render(
      <LoginForm
        fields={[
          {name: "username", label: "Username", type: "text", required: true},
          {
            name: "password",
            label: "Password",
            type: "password",
            required: true,
          },
        ]}
      />,
    );

    // eslint-disable-next-line quotes
    const usernameInput = document.querySelector('input[name="username"]');
    // eslint-disable-next-line quotes
    const passwordInput = document.querySelector('input[name="password"]');
    if (usernameInput && passwordInput) {
      fireEvent.change(usernameInput, {target: {value: "testuser"}});
      fireEvent.change(passwordInput, {target: {value: "testpassword"}});
      const submitButton = screen.getByText("sign in");
      fireEvent.click(submitButton);
    }

    await waitFor(() => {
      expect(getUserByUserNameAndPassword).toHaveBeenCalled();
      expect(
        screen.getByText("email or password incorrect, please try again."),
      ).toBeInTheDocument();
    });
  });

  it("displays required error if fields are empty and blur event has been dispatched", () => {
    render(
      <LoginForm
        fields={[
          {name: "username", label: "Username", type: "text", required: true},
          {
            name: "password",
            label: "Password",
            type: "password",
            required: true,
          },
        ]}
      />,
    );

    // eslint-disable-next-line quotes
    const usernameInput = document.querySelector('input[name="username"]');
    // eslint-disable-next-line quotes
    const passwordInput = document.querySelector('input[name="password"]');

    if (usernameInput && passwordInput) {
      fireEvent.blur(usernameInput);
      fireEvent.blur(passwordInput);
      expect(screen.getByText("username is required")).toBeInTheDocument();
      expect(screen.getByText("password is required")).toBeInTheDocument();
    }
  });
});
