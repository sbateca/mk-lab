import {Box} from "@mui/material";
import {Navigate} from "react-router";

import {mainContentContainer, mainTemplayeStyle} from "./MainTemplateStyle";
import {MenuProvider} from "../../../Context/Menu/MenuContext";
import {checkFieldInCookies} from "../../../Utils/cookieData";
import {useCookies} from "../../../Utils/Hooks/useCookies";
import {MainTemplateProps} from "./Type";

function Main({
  header,
  menu,
  mainContent,
}: MainTemplateProps): React.ReactElement {
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

export default Main;
