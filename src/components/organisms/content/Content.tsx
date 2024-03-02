import { Box } from "@mui/material"

import Reports from "../reports/reports"
import SamplesContent from "../samplesContent/SamplesContent"
import { contentStyle } from "./ContentStyle"
import { useMenu } from "../../../utils/hooks/useMenu"

function Content() {
  const {selectedItem} = useMenu();

  let contentComponent;
  switch (selectedItem) {
    case "Samples":
      contentComponent = <SamplesContent />;
      break;
    case "Reports":
      contentComponent = <Reports />;
      break;
    default:
      contentComponent = <SamplesContent />;
  }
  return (
    <Box sx={contentStyle}>
      {contentComponent}
    </Box>
  );
}

export default Content;
