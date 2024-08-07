import {Box} from "@mui/material";

import MainTemplate from "../../templates/Main/Main";
import Header from "../../molecules/Header/Header";
import Menu from "../../molecules/Menu/Menu";
import Content from "../../organisms/Content/Content";
import {COMPANY_NAME, MENU_ITEMS} from "../../../utils/constants/pages/admin";
import {
  SampleProvider,
  ReportsProvider,
  SnackBarProvider,
  SideSectionProvider,
  SampleTypeProvider,
  ClientProvider,
  AnalyteProvider,
  CriteriaProvider,
} from "../../../context/";
import {AdminStyle} from "./AdminStyle";
import {AnalysisMethodProvider} from "../../../context/Services/AnalysisMethodContext";

function Admin(): React.ReactElement {
  return (
    <SideSectionProvider>
      <SnackBarProvider>
        <ClientProvider>
          <SampleTypeProvider>
            <SampleProvider>
              <ReportsProvider>
                <AnalyteProvider>
                  <CriteriaProvider>
                    <AnalysisMethodProvider>
                      <Box sx={AdminStyle}>
                        <MainTemplate
                          header={<Header companyName={COMPANY_NAME} />}
                          menu={<Menu menuItems={MENU_ITEMS} />}
                          mainContent={<Content />}
                        />
                      </Box>
                    </AnalysisMethodProvider>
                  </CriteriaProvider>
                </AnalyteProvider>
              </ReportsProvider>
            </SampleProvider>
          </SampleTypeProvider>
        </ClientProvider>
      </SnackBarProvider>
    </SideSectionProvider>
  );
}

export default Admin;
