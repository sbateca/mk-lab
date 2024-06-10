import {useEffect, useState} from "react";
import {Box} from "@mui/material";

import {
  REPORTS_TITLE_CONFIG,
  REPORTS_BUTTON_CONFIGS,
  REPORTS_TABLE_HEADER_LABELS,
  REPORTS_TABLE_BUTTON_CONFIGS,
} from "../../../Utils/Constants/pages/reports";
import {reportsToTableRows} from "../../../Adapters/tableRow";
import {TableRowProps} from "../../Molecules/TableRow/Types";
import {useReports} from "../../../Utils/Hooks/useReports";
import Typography from "../../Atoms/Typography/Typography";
import Spinner from "../../Atoms/Spinner/Spinner";
import Table from "../Table/Table";
import ActionButtons from "../../Molecules/ActionButtons/ActionButtons";

function Reports(): React.ReactElement {
  const {reports, getReports, loading, error} = useReports();
  const [rows, setRows] = useState<TableRowProps[]>([]);

  useEffect(() => {
    getReports();
  }, [getReports]);

  useEffect(() => {
    if (reports) {
      setRows(reportsToTableRows(reports));
    }
  }, [reports]);

  if (loading) return <Spinner />;
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
