import {render, screen} from "@testing-library/react";

import TableHead from "./TableHead";

describe("TableHead component", () => {
  it("should render correctly", () => {
    const mockHeaderLabels = ["header1", "header2", "header3"];

    render(<TableHead headerLabels={mockHeaderLabels} />);

    mockHeaderLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
