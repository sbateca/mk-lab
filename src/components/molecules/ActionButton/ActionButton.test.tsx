import { render, screen } from "@testing-library/react"

import ActionsButtonsComponent from "./ActionsButtons"
import { ActionsButtonsComponentProps } from "./Types"

describe("ActionsButtonsComponent", () => {
    
	const actions: ActionsButtonsComponentProps = {
		actions: [
			{ action: "Action 1", color: "primary" },
			{ action: "Action 2", color: "secondary" },
		],
	};

	it("renders buttons with correct text and color", () => {
		render(<ActionsButtonsComponent actions={actions.actions} />);

		actions.actions.forEach((actionItem) => {
			const button = screen.getByText(actionItem.action);
			expect(button).toBeInTheDocument();
			expect(button).toHaveClass(
				`MuiButton-contained${actionItem.color.charAt(0).toUpperCase() + actionItem.color.slice(1)}`
			);
		});
	});

	it("renders buttons with the text passed in parameters", () => {
		render(<ActionsButtonsComponent actions={actions.actions} />);

		actions.actions.forEach((actionItem) => {
			const buttonText = screen.getByText(actionItem.action);
			expect(buttonText).toBeInTheDocument();
		});
	});
});
