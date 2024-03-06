import { Box } from "@mui/material";

import MainTemplate from "../../templates/mainTemplate/MainTemplate"
import Header from "../../molecules/header/Header"
import Menu from "../../molecules/menu/Menu"
import Content from "../../organisms/content/Content"
import { COMPANY_NAME } from "../../../config/constants"
import { adminPageStyle } from "./AdminPageStyle"
import { SampleProvider } from "../../../context/Services/Sample"

function AdminPage() {
  return (
    <SampleProvider>
      <Box sx={adminPageStyle}>
        <MainTemplate
          header={<Header companyName={COMPANY_NAME} />}
          menu={<Menu />}
          mainContent={<Content />}
        />
      </Box>
    </SampleProvider>
  );
}

export default AdminPage;
