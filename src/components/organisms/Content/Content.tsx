import {Box} from "@mui/material";

import {SamplesContentContainer} from "../SamplesContent/SamplesContent";
import {useMenu} from "../../../utils/hooks/useMenu";
import {ContentStyle} from "./ContentStyle";
import Reports from "../Reports/Reports";

function Content(): React.ReactElement {
  const {selectedMenuItem: selectedMenuItem} = useMenu();

  let contentComponent;
  switch (selectedMenuItem) {
    case "Samples":
      contentComponent = <SamplesContentContainer />;
      break;
    case "Reports":
      contentComponent = <Reports />;
      break;
    default:
      contentComponent = <SamplesContentContainer />;
  }
  return <Box sx={ContentStyle}>{contentComponent}</Box>;
}

export default Content;
