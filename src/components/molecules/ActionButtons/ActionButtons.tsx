import {Button} from "@mui/material";

import {ButtonConfigs, ButtonConfig} from "./Types";
import {getIcon} from "../../../Utils/icons";

function ActionButtons({
  buttonConfigs,
}: ButtonConfigs): (React.ReactElement | null)[] {
  const renderedButtons: (JSX.Element | null)[] = buttonConfigs.map(
    (buttonConfig: ButtonConfig, index: number) => {
      const {label, color, icon} = buttonConfig;
      const button: JSX.Element | null = (
        <Button
          key={index}
          variant="contained"
          size="small"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          color={color as any}
          startIcon={getIcon(icon || "")}
          sx={{fontSize: "9px", margin: "2px"}}
        >
          {label}
        </Button>
      );
      return button;
    },
  );
  return renderedButtons;
}

export default ActionButtons;
