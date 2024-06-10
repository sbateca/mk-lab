import {useEffect, useState} from "react";
import {Box} from "@mui/material";

import {ButtonConfigs} from "../../Molecules/ActionButtons/Types";
import {REPORTS_TABLE_HEADER_LABELS} from "../../../Config/constants";
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

  const tableButtonConfigs: ButtonConfigs = {
    buttonConfigs: [
      {label: "Detail", color: "primary"},
      {label: "Edit", color: "primary"},
      {label: "Delete", color: "error"},
    ],
  };
  const buttonConfigs: ButtonConfigs = {
    buttonConfigs: [{label: "Create Report", color: "primary", icon: "create"}],
  };

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
        <Typography
          text="Reports"
          size="20px"
          variant="h1"
          padding="10px 0px"
        />
        <Box sx={{marginLeft: "auto"}}>
          <ActionButtons buttonConfigs={buttonConfigs.buttonConfigs} />
        </Box>
      </Box>
      <Table
        headerLabels={REPORTS_TABLE_HEADER_LABELS}
        rows={rows}
        buttonConfigs={tableButtonConfigs}
      />
    </Box>
  );
}

export default Reports;
