import { Box } from "@mui/material";

import MainTemplate from "../../templates/mainTemplate/MainTemplate";
import { mainTemplayeStyle } from "../../templates/mainTemplate/MainTemplateStyle";
import Header from "../../molecules/header/Header";
import Menu from "../../molecules/menu/Menu";
import Content from "../../organisms/content/Content";
import { COMPANY_NAME } from "../../../config/constants";

function MainPage() {
  return (
    <Box sx={mainTemplayeStyle}>
      <MainTemplate
        header={<Header companyName={COMPANY_NAME} />}
        menu={<Menu />}
        mainContent={<Content />}
        />
    </Box>
  );
}

export default MainPage;
