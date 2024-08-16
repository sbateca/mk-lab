import {Box} from "@mui/material";

import {AnalysisMethodProvider} from "../../../context/Services/AnalysisMethodContext";
import {MainTemplate} from "../../templates";
import {Header, Menu} from "../../molecules";
import {Content} from "../../organisms";
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
import {COMPANY_NAME, MENU_ITEMS} from "../../../utils/constants";
import {AdminStyle} from "./AdminStyle";

export const Admin = (): React.ReactElement => {
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
};
