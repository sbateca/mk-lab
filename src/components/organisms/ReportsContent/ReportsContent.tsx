import {useEffect, useState} from "react";
import {Box} from "@mui/material";

import {
  REPORTS_TITLE_CONFIG,
  REPORTS_TABLE_HEADER_LABELS,
  REPORT_CREATE_BUTTON_LABEL,
  CREATE_REPORT_TITLE_TEXT,
} from "../../../utils/constants/pages/reports";
import {reportsToTableRows} from "../../../adapters/tableRow";
import {TableRowProps} from "../../molecules/TableRow/Types";
import {useReports} from "../../../utils/hooks/useReports";
import Typography from "../../atoms/Typography/Typography";
import Spinner from "../../atoms/Spinner/Spinner";
import Table from "../Table/Table";
import Button from "../../atoms/Button/Button";
import {ReportsContentStyles} from "./ReportsContentStyles";
import {
  SharedButtonColors,
  SharedButtonIcons,
  SharedButtonSizes,
  SharedButtonVariants,
  SnackBarSeverity,
} from "../../../utils/enums";
import {useSnackBar} from "../../../utils/hooks/useSnackBar";
import {useSideSection} from "../../../utils/hooks/useSideSection";
import SideSection from "../SideSection/SideSection";
import ReportsDetail from "../ReportsDetail/ReportsDetail";
import {useSample} from "../../../utils/hooks/useSample";
import {useSampleType} from "../../../utils/hooks/useSampleType";

function ReportsContent(): React.ReactElement {
  const [rows, setRows] = useState<TableRowProps[]>([]);
  const [isReadOnlyMode, setIsReadOnlyMode] = useState(true);

  const {reports, getReports, setSelectedReport, isLoading, error} =
    useReports();
  const {sampleTypes} = useSampleType();
  const {samples} = useSample();
  const {showSnackBarMessage} = useSnackBar();
  const {isSideSectionOpen, setIsSideSectionOpen, setSideSectionTitle} =
    useSideSection();

  const handleOpenSideSection = () => {
    setSelectedReport(null);
    setIsReadOnlyMode(false);
    setSideSectionTitle(CREATE_REPORT_TITLE_TEXT);
    setIsSideSectionOpen(true);
  };

  useEffect(() => {
    if (reports) {
      setRows(reportsToTableRows(reports, samples, sampleTypes));
    }
  }, [reports]);

  useEffect(() => {
    if (error) {
      showSnackBarMessage(error, SnackBarSeverity.ERROR, getReports);
    }
  }, [error]);

  if (isLoading) return <Spinner />;
  if (error) return <Typography text={error} variant="h6" />;

  return isLoading ? (
    <Spinner />
  ) : (
    <Box>
      <Box sx={ReportsContentStyles.titleContentContainer}>
        <Typography {...REPORTS_TITLE_CONFIG} />
        <Box sx={ReportsContentStyles.titleContentActions}>
          <Button
            label={REPORT_CREATE_BUTTON_LABEL}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.PRIMARY}
            icon={SharedButtonIcons.CREATE}
            onClick={handleOpenSideSection}
          />
        </Box>
      </Box>
      <Table headerLabels={REPORTS_TABLE_HEADER_LABELS} rows={rows} />
      <SideSection isOpen={isSideSectionOpen}>
        <ReportsDetail
          isReadOnlyMode={isReadOnlyMode}
          setIsReadOnlyMode={setIsReadOnlyMode}
        />
      </SideSection>
    </Box>
  );
}

export default ReportsContent;
