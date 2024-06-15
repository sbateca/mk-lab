import {render, screen} from "@testing-library/react";

import {TableRowProps} from "../../molecules/TableRow/Types";
import Table from "./Table";

const mockHeaderLabels = ["header1", "header2"];
const mockRows: TableRowProps[] = [
  {
    cells: [
      {text: "cell1", align: "left"},
      {text: "cell2", align: "left"},
    ],
  },
  {
    cells: [
      {text: "cell3", align: "left"},
      {text: "cell4", align: "left"},
    ],
  },
];

describe("Table", () => {
  it("should render the table component with headers and cells provided", () => {
    render(<Table headerLabels={mockHeaderLabels} rows={mockRows} />);

    expect(screen.getByText("header1")).toBeInTheDocument();
    expect(screen.getByText("cell1")).toBeInTheDocument();
  });

  it("should render no results text when an empty rows list has been provided", () => {
    render(<Table headerLabels={mockHeaderLabels} rows={[]} />);

    expect(screen.getByText("No records to display")).toBeInTheDocument();
  });
});
