import {Box} from "@mui/material";

import MainTemplate from "../../templates/Main/Main";
import Header from "../../molecules/Header/Header";
import Menu from "../../molecules/Menu/Menu";
import Content from "../../organisms/Content/Content";
import {COMPANY_NAME, MENU_ITEMS} from "../../../utils/constants/pages/admin";
import {SampleProvider} from "../../../context/Services/SampleContext";
import {ReportsProvider} from "../../../context/Services/ReportsContext";
import {AdminStyle} from "./AdminStyle";
import {SnackBarProvider} from "../../../context/SnackBar/SnackBarContext";
import {SideSectionProvider} from "../../../context/SideSection/SideSectionContext";

function Admin(): React.ReactElement {
  return (
    <SideSectionProvider>
      <SnackBarProvider>
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
      </SnackBarProvider>
    </SideSectionProvider>
  );
}

export default Admin;
