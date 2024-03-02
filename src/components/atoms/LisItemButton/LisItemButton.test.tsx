import { render, screen } from "@testing-library/react"
import ListItemButtonComponent from "./LisItemButton";

describe("LisItemButtonComponent", ()=>{
    it("should render the label passed by props correctly", ()=>{
        const mockLabel= "Test Label";

        render(<ListItemButtonComponent key={1} label={mockLabel} />);
        const itemButton = screen.getByText(mockLabel);

        expect(itemButton).toBeInTheDocument();
    });
});
