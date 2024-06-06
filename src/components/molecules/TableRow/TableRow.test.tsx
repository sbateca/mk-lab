import {render, screen} from "@testing-library/react";

import {TableCellProps} from "../../Atoms/TableCell/Types";
import TableRowComponent from "./TableRow";

describe("TableRow component", () => {
  it("should render correctly", () => {
    const mockCells: TableCellProps[] = [
      {align: "left", text: "cell1"},
      {align: "right", text: "cell2"},
      {align: "center", text: "cell3"},
    ];

    render(<TableRowComponent cells={mockCells} />);

    mockCells.forEach((cell) => {
      expect(screen.getByText(cell.text)).toBeInTheDocument();
    });
  });
});
