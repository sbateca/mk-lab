import {Box} from "@mui/material";

import {useMenu} from "../../../utils/hooks/useMenu";
import {ContentStyle} from "./ContentStyle";
import ReportsContent from "../ReportsContent/ReportsContent";
import SnackBarContainer from "../../molecules/SnackBarContainer/SnackBarContainer";
import SamplesContent from "../SamplesContent/SamplesContent";
import {SharedMenuItems} from "../../../utils/enums";

function Content(): React.ReactElement {
  const {selectedMenuItem} = useMenu();

  let contentComponent;
  switch (selectedMenuItem) {
    case SharedMenuItems.SAMPLES:
      contentComponent = <SamplesContent />;
      break;
    case SharedMenuItems.REPORTS:
      contentComponent = <ReportsContent />;
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
