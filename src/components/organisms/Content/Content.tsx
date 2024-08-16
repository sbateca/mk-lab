import {Box} from "@mui/material";

import {useMenu} from "../../../utils/hooks";
import {ContentStyle} from "./ContentStyle";
import {ReportsContent} from "../ReportsContent";
import {SnackBarContainer} from "../../molecules";
import {SamplesContent} from "../SamplesContent";
import {SharedMenuItems} from "../../../utils/enums";

export const Content = (): React.ReactElement => {
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
};
