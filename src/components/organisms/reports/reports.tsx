import { useEffect, useState } from "react"
import { Box } from "@mui/material"

import { ActionsButtonsComponentProps } from "../../molecules/ActionButton/Types"
import { REPORTS_TABLE_HEADER_LABELS } from "../../../config/constants"
import { reportsToTableRowPropList } from "../../../adapters/TableRow"
import { TableRowProps } from "../../molecules/TableRow/Types"
import { useReports } from "../../../utils/hooks/useReports"
import Typography from "../../atoms/Typography/Typography"
import CircularSpinner from "../../atoms/Spinner/Spinner"
import TableComponent from "../table/Table"
import ActionsButtonsComponent from "../../molecules/ActionButton/ActionsButtons"

function Reports() {
    const { reports, getReports, loading, error } = useReports();
    const [rowsValue, setRowsValue] = useState<TableRowProps[]>([]);
    const tableActions: ActionsButtonsComponentProps = {actions:[
        {action: "Detail", color: "primary" },
        {action: "Edit", color: "primary" },
        {action: "Delete", color: "error" },
    ]}

    const reportsActions: ActionsButtonsComponentProps = {
        actions: [
            {action: "create report", color: "primary", icon: "create"},
    ]}
    
    useEffect(() => {
        const getReportsList = async () =>{
            try {
                await getReports();
                if(reports){
                    setRowsValue(reportsToTableRowPropList(reports));
                }
            } catch (error) {
                throw new Error("error getting samples");
            }
        }
        getReportsList();
    }, [])

    useEffect(() => {
        if(reports) {
            setRowsValue(reportsToTableRowPropList(reports));
        }
    }, [reports])

    if(loading) return <CircularSpinner />
    if(error) return <Typography text="Error" variant="h6" />

    return(
        <Box>
            <Box sx={{display:"flex", flexDirection: "row"}}>
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
            <TableComponent headerLabels={REPORTS_TABLE_HEADER_LABELS} rows={rowsValue} actions={tableActions} />
        </Box>
    )
}

export default Reports;