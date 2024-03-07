import { render } from "@testing-library/react";
import CircularSpinner from "./Spinner";

describe("CircularSpinner", () => {
  it("renders circular spinner", () => {
    const { getByRole } = render(<CircularSpinner />);
    const spinner = getByRole("progressbar");
    expect(spinner).toBeInTheDocument();
  });
});
