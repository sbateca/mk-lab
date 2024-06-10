import {Box} from "@mui/material";

import MainTemplate from "../../Templates/Main/Main";
import Header from "../../Molecules/Header/Header";
import Menu from "../../Molecules/Menu/Menu";
import Content from "../../Organisms/Content/Content";
import {COMPANY_NAME, MENU_ITEMS} from "../../../Utils/Constants/pages/admin";
import {SampleProvider} from "../../../Context/Services/SampleContext";
import {ReportsProvider} from "../../../Context/Services/ReportsContext";
import {AdminStyle} from "./AdminStyle";

function Admin(): React.ReactElement {
  return (
    <SampleProvider>
      <ReportsProvider>
        <Box sx={AdminStyle}>
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

export default Admin;
