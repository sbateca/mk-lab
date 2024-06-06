import {Box} from "@mui/material";

import MainTemplate from "../../Templates/MainTemplate/MainTemplate";
import Header from "../../Molecules/Header/Header";
import Menu from "../../Molecules/Menu/Menu";
import Content from "../../Organisms/Content/Content";
import {COMPANY_NAME, MENU_ITEMS} from "../../../Config/Constants";
import {SampleProvider} from "../../../Context/Services/Sample";
import {ReportsProvider} from "../../../Context/Services/Reports";
import {adminPageStyle} from "./AdminPageStyle";

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
