import {Box} from "@mui/material";
import {Navigate} from "react-router";

import {mainContentContainer, mainTemplayeStyle} from "./MainTemplateStyle";
import {MenuProvider} from "../../../Context/Menu/MenuContext";
import {checkFieldInLocalStorage} from "../../../Utils/localStorage";
import {MainTemplateProps} from "./Type";
import {LOCAL_STORAGE_USER_KEY} from "../../../Utils/Constants/pages/shared";

function Main({
  header,
  menu,
  mainContent,
}: MainTemplateProps): React.ReactElement {
  const existsUserData = checkFieldInLocalStorage(LOCAL_STORAGE_USER_KEY);

  return !existsUserData ? (
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
}

export default Main;
