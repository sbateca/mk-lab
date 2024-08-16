import {Box} from "@mui/material";
import {Navigate} from "react-router";

import {MenuProvider} from "../../../context/Menu/MenuContext";
import {localStorageContainsField} from "../../../utils/localStorage";
import {LOCAL_STORAGE_USER_KEY} from "../../../utils/constants";
import {MainTemplateProps} from "./Type";
import {mainContentContainer, mainTemplayeStyle} from "./MainTemplateStyle";

export const MainTemplate = ({
  header,
  menu,
  mainContent,
}: MainTemplateProps): React.ReactElement => {
  const hasUserData = localStorageContainsField(LOCAL_STORAGE_USER_KEY);

  return !hasUserData ? (
    <Navigate to="/" />
  ) : (
    <MenuProvider>
      <Box sx={mainTemplayeStyle}>
        <Box component="header">{header}</Box>
        {menu}
        <Box sx={mainContentContainer}>{mainContent}</Box>
      </Box>
    </MenuProvider>
  );
};
