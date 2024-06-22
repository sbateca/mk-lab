import {useEffect, useState} from "react";
import {Box} from "@mui/material";

import {
  REPORTS_TITLE_CONFIG,
  REPORTS_TABLE_HEADER_LABELS,
} from "../../../utils/constants/pages/reports";
import {reportsToTableRows} from "../../../adapters/tableRow";
import {TableRowProps} from "../../molecules/TableRow/Types";
import {useReports} from "../../../utils/hooks/useReports";
import Typography from "../../atoms/Typography/Typography";
import Spinner from "../../atoms/Spinner/Spinner";
import Table from "../Table/Table";
import {ButtonConfig} from "../../atoms/Button/Types";
import Button from "../../atoms/Button/Button";

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
  const buttonPageConfig: ButtonConfig = {
    label: "Create report",
    variant: "outlined",
    size: "small",
    color: "primary",
    icon: "create",
  };

  return (
    <Box>
      <Box sx={{display: "flex", flexDirection: "row"}}>
        <Typography {...REPORTS_TITLE_CONFIG} />
        <Box sx={{marginLeft: "auto"}}>
          <Button {...buttonPageConfig} />
        </Box>
      </Box>
      <Table headerLabels={REPORTS_TABLE_HEADER_LABELS} rows={rows} />
    </Box>
  );
}

export default Reports;
