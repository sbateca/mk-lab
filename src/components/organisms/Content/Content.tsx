import {Box} from "@mui/material";

import {useMenu} from "../../../utils/hooks/useMenu";
import {ContentStyle} from "./ContentStyle";
import Reports from "../Reports/Reports";
import SnackBarContainer from "../../molecules/SnackBarContainer/SnackBarContainer";
import SamplesContent from "../SamplesContent/SamplesContent";

function Content(): React.ReactElement {
  const {selectedMenuItem} = useMenu();

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
  return (
    <Box>
      <Box sx={ContentStyle}>{contentComponent}</Box>
      <SnackBarContainer />
    </Box>
  );
}

export default Content;
