import { Box } from "@mui/material"

import MainTemplate from "../../templates/mainTemplate/MainTemplate"
import Header from "../../molecules/header/Header"
import Menu from "../../molecules/menu/Menu"
import Content from "../../organisms/content/Content"
import { COMPANY_NAME, MENU_ITEMS } from "../../../config/constants"
import { SampleProvider } from "../../../context/Services/Sample"
import { ReportsProvider } from "../../../context/Services/Reports"
import { adminPageStyle } from "./AdminPageStyle"

function AdminPage() {
  return (
    <SampleProvider>
      <ReportsProvider>
      <Box sx={adminPageStyle}>
        <MainTemplate
          header={<Header companyName={COMPANY_NAME} />}
          menu={<Menu menuItems={MENU_ITEMS} />}
          mainContent={<Content />}
        />
      </Box>
      </ReportsProvider>
    </SampleProvider>
  );
}

export default AdminPage;
