import {fireEvent, render, screen} from "@testing-library/react";
import {useSnackBar} from "../../utils/hooks";
import {SnackBarProvider} from "./SnackBarContext";
import {SnackBarSeverity} from "../../utils/enums";

jest.mock("../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

const TesComponent = () => {
  const {isSnackBarOpen, snackBarText, snackBarSeverity, showSnackBarMessage} =
    useSnackBar();

  return (
    <div>
      <span data-testid="isSnackBarOpenValue">{isSnackBarOpen.toString()}</span>
      <span data-testid="snackBarTextValue">{snackBarText}</span>
      <span data-testid="snackBarSeverityValue">{snackBarSeverity}</span>
      <button
        onClick={() =>
          showSnackBarMessage("Sample Text", SnackBarSeverity.SUCCESS)
        }
      >
        Show Snack Bar
      </button>
    </div>
  );
};

describe("SnackBarProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render Snackbar children successfully", async () => {
    render(
      <SnackBarProvider>
        <TesComponent />
      </SnackBarProvider>,
    );

    const childComponent = screen.getByText("Show Snack Bar");
    expect(childComponent).toBeInTheDocument();
  });

  it("should set isSnackBarOpen to true when showSnackBarMessage is called", async () => {
    render(
      <SnackBarProvider>
        <TesComponent />
      </SnackBarProvider>,
    );

    const showSnackBarButton = screen.getByText("Show Snack Bar");
    const isSnackBarOpenValue = screen.getByTestId("isSnackBarOpenValue");

    expect(isSnackBarOpenValue).toHaveTextContent("false");
    fireEvent.click(showSnackBarButton);
    expect(isSnackBarOpenValue).toHaveTextContent("true");
  });

  it("should set snackBarText and snackBarSeverity when showSnackBarMessage is called", async () => {
    render(
      <SnackBarProvider>
        <TesComponent />
      </SnackBarProvider>,
    );

    const showSnackBarButton = screen.getByText("Show Snack Bar");
    const snackBarTextValue = screen.getByTestId("snackBarTextValue");
    const snackBarSeverityValue = screen.getByTestId("snackBarSeverityValue");

    expect(snackBarTextValue).toHaveTextContent("");
    expect(snackBarSeverityValue).toHaveTextContent("success");
    fireEvent.click(showSnackBarButton);
    expect(snackBarTextValue).toHaveTextContent("Sample Text");
    expect(snackBarSeverityValue).toHaveTextContent("success");
  });
});
