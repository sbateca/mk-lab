import {render, screen} from "@testing-library/react";

import ListItemButton from "./ListItemButton";

describe("LisItemButtonComponent", () => {
  it("should render the label passed by props correctly", () => {
    const mockLabel = "Test Label";

    render(<ListItemButton key={1} label={mockLabel} />);
    const itemButton = screen.getByText(mockLabel);

    expect(itemButton).toBeInTheDocument();
  });
});
