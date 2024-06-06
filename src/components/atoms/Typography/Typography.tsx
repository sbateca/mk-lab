import {Typography as MuiTypography} from "@mui/material";

import ITypographyProps from "./Types";
import typographyStyle from "./TypographyStyle";

function Typography({
  text,
  size,
  padding,
  variant,
  paragraph = false,
  gutterBottom = false,
  align = "left",
  color = "black",
}: ITypographyProps) {
  const textColor = typographyStyle[color];
  return (
    <MuiTypography
      fontSize={size}
      padding={padding}
      variant={variant}
      paragraph={paragraph}
      gutterBottom={gutterBottom}
      align={align}
      color={textColor}
    >
      {text}
    </MuiTypography>
  );
}

export default Typography;
