import {Box} from "@mui/material";

import SamplesContent from "../SamplesContent/SamplesContent";
import {useMenu} from "../../../Utils/Hooks/useMenu";
import {ContentStyle} from "./ContentStyle";
import Reports from "../Reports/Reports";

function Content(): React.ReactElement {
  const {selectedMenuItem: selectedMenuItem} = useMenu();

  let contentComponent;
  switch (selectedMenuItem) {
    case "Samples":
      contentComponent = <SamplesContent />;
      break;
    case "Reports":
      contentComponent = <Reports />;
      break;
    default:
      contentComponent = <SamplesContent />;
  }
  return <Box sx={ContentStyle}>{contentComponent}</Box>;
}

export default Content;
