import {render, screen} from "@testing-library/react";

import TableHeadComponent from "./TableHead";

describe("TableHead component", () => {
  it("should render correctly", () => {
    const mockHeaderLabels = ["header1", "header2", "header3"];

    render(<TableHeadComponent headerLabels={mockHeaderLabels} />);

    mockHeaderLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
