import {Typography as MuiTypography} from "@mui/material";

import ITypographyProps from "./Types";
import typographyStyle from "./TypographyStyle";

function Typography({
  text,
  size,
  padding,
  variant,
  isParagraph = false,
  hasButterBottom = false,
  align = "left",
  color = "black",
}: ITypographyProps): React.ReactElement {
  const textColor = typographyStyle[color];
  return (
    <MuiTypography
      fontSize={size}
      padding={padding}
      variant={variant}
      paragraph={isParagraph}
      gutterBottom={hasButterBottom}
      align={align}
      color={textColor}
    >
      {text}
    </MuiTypography>
  );
}

export default Typography;
