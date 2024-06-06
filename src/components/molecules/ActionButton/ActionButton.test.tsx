import {render, screen} from "@testing-library/react";

import ActionsButtonsComponent from "./ActionsButtons";
import {ActionsButtonsComponentProps} from "./Types";

describe("ActionsButtonsComponent", () => {
  const actions: ActionsButtonsComponentProps = {
    actions: [
      {action: "Action 1", color: "primary"},
      {action: "Action 2", color: "secondary"},
    ],
  };

  it("renders buttons with correct text and color", () => {
    render(<ActionsButtonsComponent actions={actions.actions} />);

    actions.actions.forEach((actionItem) => {
      const button = screen.getByText(actionItem.action);
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass(
        `MuiButton-contained${actionItem.color.charAt(0).toUpperCase() + actionItem.color.slice(1)}`,
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

  it("renders buttons with the icon passed in parameters", () => {
    const mockActions: ActionsButtonsComponentProps = {
      actions: [
        {action: "Action 1", color: "primary", icon: "create"},
        {action: "Action 2", color: "secondary", icon: "delete"},
      ],
    };
    const dataTestIds = ["AddIcon", "DeleteIcon"];

    render(<ActionsButtonsComponent actions={mockActions.actions} />);

    mockActions.actions.forEach((_actionItem, index) => {
      const buttonText = screen.getByTestId(dataTestIds[index]);
      expect(buttonText).toBeInTheDocument();
    });
  });
});
