import { render, screen } from "@testing-library/react"

import Typography from "./Typography"

describe("Typography", () =>{
    it("should render the Typography with the text passed by parameters", () =>{
        const mockText = "Mock text";

        render(<Typography text={mockText} size="medium" padding="10px" variant="h1" />);

        const text = screen.getByText(mockText);
        expect(text).toBeInTheDocument();

    });
});
