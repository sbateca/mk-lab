import {Button as MuiButton} from "@mui/material";

import {ButtonConfig} from "./Types";
import {getIcon} from "../../../utils/icons";

function Button(buttonConfig: ButtonConfig): React.ReactElement | null {
  const {label, disabled, color, icon, variant, size, onClick} = buttonConfig;
  return (
    <MuiButton
      variant={variant}
      disabled={disabled}
      size={size}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      color={color as any}
      startIcon={getIcon(icon ?? "")}
      sx={{fontSize: "9px", margin: "2px"}}
      onClick={onClick}
    >
      {label}
    </MuiButton>
  );
}

export default Button;
