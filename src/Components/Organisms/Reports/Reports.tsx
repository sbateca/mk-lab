import {useEffect, useState} from "react";
import {Box} from "@mui/material";

import {
  REPORTS_TITLE_CONFIG,
  REPORTS_BUTTON_CONFIGS,
  REPORTS_TABLE_HEADER_LABELS,
  REPORTS_TABLE_BUTTON_CONFIGS,
} from "../../../utils/constants/pages/reports";
import {reportsToTableRows} from "../../../adapters/tableRow";
import {TableRowProps} from "../../molecules/TableRow/Types";
import {useReports} from "../../../utils/hooks/useReports";
import Typography from "../../atoms/Typography/Typography";
import Spinner from "../../atoms/Spinner/Spinner";
import Table from "../Table/Table";
import ActionButtons from "../../molecules/ActionButtons/ActionButtons";

function Reports(): React.ReactElement {
  const {reports, isLoading, error} = useReports();
  const [rows, setRows] = useState<TableRowProps[]>([]);

  useEffect(() => {
    if (reports) {
      setRows(reportsToTableRows(reports));
    }
  }, [reports]);

  if (isLoading) return <Spinner />;
  if (error) return <Typography text={error} variant="h6" />;

  return (
    <Box>
      <Box sx={{display: "flex", flexDirection: "row"}}>
        <Typography {...REPORTS_TITLE_CONFIG} />
        <Box sx={{marginLeft: "auto"}}>
          <ActionButtons buttonConfigs={REPORTS_BUTTON_CONFIGS.buttonConfigs} />
        </Box>
      </Box>
      <Table
        headerLabels={REPORTS_TABLE_HEADER_LABELS}
        rows={rows}
        buttonConfigs={REPORTS_TABLE_BUTTON_CONFIGS}
      />
    </Box>
  );
}

export default Reports;
