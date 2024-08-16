import {render, screen} from "@testing-library/react";

import {Button} from "./Button";
import {ButtonConfig} from "./Types";

describe("ActionsButtons", () => {
  const actions: ButtonConfig = {
    buttonConfigs: [
      {label: "Action 1", color: "primary"},
      {label: "Action 2", color: "secondary"},
    ],
  };

  it("renders buttons with correct text and color", () => {
    render(<Button buttonConfigs={actions.buttonConfigs} />);

    actions.buttonConfigs.forEach((actionItem) => {
      const button = screen.getByText(actionItem.label);
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass(
        `MuiButton-contained${actionItem.color.charAt(0).toUpperCase() + actionItem.color.slice(1)}`,
      );
    });
  });

  it("renders buttons with the text passed in parameters", () => {
    render(<Button buttonConfigs={actions.buttonConfigs} />);

    actions.buttonConfigs.forEach((buttonConfig) => {
      const buttonText = screen.getByText(buttonConfig.label);
      expect(buttonText).toBeInTheDocument();
    });
  });

  it("renders buttons with the icon passed in parameters", () => {
    const mockActionButtons: ButtonConfigs = {
      buttonConfigs: [
        {label: "Action 1", color: "primary", icon: "create"},
        {label: "Action 2", color: "secondary", icon: "delete"},
      ],
    };
    const dataTestIds = ["AddIcon", "DeleteIcon"];

    render(<ActionButtons buttonConfigs={mockActionButtons.buttonConfigs} />);

    mockActionButtons.buttonConfigs.forEach((_actionItem, index) => {
      const buttonText = screen.getByTestId(dataTestIds[index]);
      expect(buttonText).toBeInTheDocument();
    });
  });
});
