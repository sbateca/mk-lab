import { useEffect, useState } from "react"
import { Box } from "@mui/material"

import { REPORTS_TABLE_HEADER_LABELS } from "../../../config/constants"
import { reportsToTableRowPropList } from "../../../adapters/TableRow"
import { TableRowProps } from "../../molecules/TableRow/Types"
import { useReports } from "../../../utils/hooks/useReports"
import Typography from "../../atoms/Typography/Typography"
import CircularSpinner from "../../atoms/Spinner/Spinner"
import TableComponent from "../table/Table"

function Reports() {
    const { reports, getReports, loading, error } = useReports();
    const [rowsValue, setRowsValue] = useState<TableRowProps[]>([]);
    
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
            <Box>
                <Typography
                    text="Reports"
                    size="20px"
                    variant="h1"
                    padding="10px 0px"
                />
                <TableComponent headerLabels={REPORTS_TABLE_HEADER_LABELS} rows={rowsValue} actions={true} />
            </Box>
        </Box>
    )
}

export default Reports;