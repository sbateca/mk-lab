import {Box} from "@mui/material";
import {Navigate} from "react-router";

import {mainContentContainer, mainTemplayeStyle} from "./MainTemplateStyle";
import {MenuProvider} from "../../../context/Menu/MenuContext";
import {checkFieldInCookies} from "../../../utils/cookieData";
import {useCookies} from "../../../utils/hooks/useCookies";
import {MainTemplateProps} from "./Type";

function MainTemplate({header, menu, mainContent}: MainTemplateProps) {
  const cookies = useCookies();
  const existsUserData = checkFieldInCookies(cookies, "userData");
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

export default MainTemplate;
