import {Box} from "@mui/material";

import SamplesContent from "../SamplesContent/SamplesContent";
import {useMenu} from "../../../Utils/Hooks/useMenu";
import {contentStyle} from "./ContentStyle";
import Reports from "../Reports/Reports";

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
  return <Box sx={contentStyle}>{contentComponent}</Box>;
}

export default Content;
