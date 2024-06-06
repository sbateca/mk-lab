import {useEffect, useState} from "react";
import {Box} from "@mui/material";

import {ActionsButtonsComponentProps} from "../../Molecules/ActionButton/Types";
import {REPORTS_TABLE_HEADER_LABELS} from "../../../Config/Constants";
import {reportsToTableRowPropList} from "../../../Adapters/TableRow";
import {TableRowProps} from "../../Molecules/TableRow/Types";
import {useReports} from "../../../Utils/Hooks/useReports";
import Typography from "../../Atoms/Typography/Typography";
import CircularSpinner from "../../Atoms/Spinner/Spinner";
import TableComponent from "../Table/Table";
import ActionsButtonsComponent from "../../Molecules/ActionButton/ActionsButtons";

function Reports() {
  const {reports, getReports, loading, error} = useReports();
  const [rowsValue, setRowsValue] = useState<TableRowProps[]>([]);
  const tableActions: ActionsButtonsComponentProps = {
    actions: [
      {action: "Detail", color: "primary"},
      {action: "Edit", color: "primary"},
      {action: "Delete", color: "error"},
    ],
  };

  const reportsActions: ActionsButtonsComponentProps = {
    actions: [{action: "create report", color: "primary", icon: "create"}],
  };

  useEffect(() => {
    const getReportsList = async () => {
      try {
        await getReports();
        if (reports) {
          setRowsValue(reportsToTableRowPropList(reports));
        }
      } catch (error) {
        throw new Error("error getting samples");
      }
    };
    getReportsList();
  }, []);

  useEffect(() => {
    if (reports) {
      setRowsValue(reportsToTableRowPropList(reports));
    }
  }, [reports]);

  if (loading) return <CircularSpinner />;
  if (error) return <Typography text="Error" variant="h6" />;

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
          <ActionsButtonsComponent actions={reportsActions.actions} />
        </Box>
      </Box>
      <TableComponent
        headerLabels={REPORTS_TABLE_HEADER_LABELS}
        rows={rowsValue}
        actions={tableActions}
      />
    </Box>
  );
}

export default Reports;
