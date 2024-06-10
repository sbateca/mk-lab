import {render, screen} from "@testing-library/react";

import {TableCellProps} from "../TableCell/Types";
import TableRow from "./TableRow";

describe("TableRow component", () => {
  it("should render correctly", () => {
    const mockCells: TableCellProps[] = [
      {align: "left", text: "cell1"},
      {align: "right", text: "cell2"},
      {align: "center", text: "cell3"},
    ];

    render(<TableRow cells={mockCells} />);

    mockCells.forEach((cell) => {
      expect(screen.getByText(cell.text)).toBeInTheDocument();
    });
  });
});
