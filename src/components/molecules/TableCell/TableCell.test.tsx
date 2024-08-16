import {render, screen} from "@testing-library/react";

import {TableCell} from "./TableCell";

describe("TableCell", () => {
  it("TableCell renders the text passed as parameter", () => {
    const mockText = "cell text";
    const mockAlign = "center";

    render(<TableCell text={mockText} align={mockAlign} />);

    const cell = screen.getByText(mockText);
    expect(cell).toBeInTheDocument();
  });
});
