import {render, screen} from "@testing-library/react";
import {SnackBarContainer} from "./SnackBarContainer";
import * as hooks from "../../../utils/hooks";
import {SnackBarSeverity} from "../../../utils/enums";

jest.mock("../../../utils/hooks", () => ({
  useSnackBar: jest.fn(),
}));

describe("SnackBarContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays the snackbar message", () => {
    jest.spyOn(hooks, "useSnackBar").mockReturnValue({
      isSnackBarOpen: true,
      snackBarText: "Test message",
      snackBarSeverity: SnackBarSeverity.INFO,
      showSnackBarMessage: jest.fn(),
    });

    render(<SnackBarContainer />);
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("does not render the snackbar when isSnackBarOpen value is false", () => {
    jest.spyOn(hooks, "useSnackBar").mockReturnValue({
      isSnackBarOpen: false,
      snackBarText: "Test message",
      snackBarSeverity: SnackBarSeverity.INFO,
      showSnackBarMessage: jest.fn(),
    });

    render(<SnackBarContainer />);
    expect(screen.queryByText("Test message")).not.toBeInTheDocument();
  });
});
