import {render, screen} from "@testing-library/react";

import {TableCellProps} from "../TableCell/Types";
import TableRow from "./TableRow";

jest.mock("../../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://example.com/api",
  },
}));

describe("TableRow component", () => {
  it("should render correctly", () => {
    const mockCells: TableCellProps[] = [
      {align: "left", children: "cell1"},
      {align: "right", children: "cell2"},
      {align: "center", children: "cell3"},
    ];

    render(<TableRow cells={mockCells} />);

    mockCells.forEach((cell) => {
      expect(screen.getByText(cell.children as string)).toBeInTheDocument();
    });
  });

  it("should show progress element when cells list is empty", () => {
    render(<TableRow cells={[]} />);

    expect(screen.queryByRole("progressbar")).toBeInTheDocument();
  });
});
