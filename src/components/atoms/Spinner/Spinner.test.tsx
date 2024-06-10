import {render} from "@testing-library/react";

import Spinner from "./Spinner";

describe("Spinner", () => {
  it("renders Spinner", () => {
    const {getByRole} = render(<Spinner />);
    const spinner = getByRole("progressbar");
    expect(spinner).toBeInTheDocument();
  });
});
