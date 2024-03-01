import { Box } from "@mui/material"

import Reports from "../reports/reports"
import Samples from "../samples/Samples"
import { contentStyle } from "./ContentStyle"
import { useMenu } from "../../../utils/hooks/useMenu"

function Content() {
  const {selectedItem} = useMenu();

  let contentComponent;
  switch (selectedItem) {
    case "Samples":
      contentComponent = <Samples />;
      break;
    case "Reports":
      contentComponent = <Reports />;
      break;
    default:
      contentComponent = <Samples />;
  }
  return (
    <Box sx={contentStyle}>
      {contentComponent}
    </Box>
  );
}

export default Content;
