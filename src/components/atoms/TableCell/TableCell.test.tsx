import { render, screen } from "@testing-library/react"

import TableCellComponent from "./TableCell"

describe("TableCell", ()=>{
    it("TableCell renders the text passed as parameter", () => {
        const mockText = "cell text";
        const mockAlign = "center";

        render(<TableCellComponent text={mockText} align={mockAlign} />);

        const cell = screen.getByText(mockText);
        expect(cell).toBeInTheDocument();
    });
});
