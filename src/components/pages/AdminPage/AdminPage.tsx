import { Box } from "@mui/material";

import MainTemplate from "../../templates/mainTemplate/MainTemplate";
import Header from "../../molecules/header/Header";
import Menu from "../../molecules/menu/Menu";
import Content from "../../organisms/content/Content";
import { COMPANY_NAME } from "../../../config/constants";
import { adminPageStyle } from "./AdminPageStyle";

function AdminPage() {
  return (
    <Box sx={adminPageStyle}>
      <MainTemplate
        header={<Header companyName={COMPANY_NAME} />}
        menu={<Menu />}
        mainContent={<Content />}
        />
    </Box>
  );
}

export default AdminPage;
