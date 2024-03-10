import { useEffect, useState } from "react"
import { Box } from "@mui/material"

import { ActionsButtonsComponentProps } from "../../molecules/ActionButton/Types"
import ActionsButtonsComponent from "../../molecules/ActionButton/ActionsButtons"
import { SAMPLES_TABLE_HEADER_LABELS } from "../../../config/constants"
import { samplesToTableRowPropList } from "../../../adapters/TableRow"
import { TableRowProps } from "../../molecules/TableRow/Types"
import { useSample } from "../../../utils/hooks/useSample"
import Typography from "../../atoms/Typography/Typography"
import CircularSpinner from "../../atoms/Spinner/Spinner"
import TableComponent from "../table/Table"

function SamplesContent() {
    const { samples, getSamples, loading, error } = useSample();
    const [rowsValue, setRowsValue] = useState<TableRowProps[]>([]);
    const tableActions: ActionsButtonsComponentProps = {
        actions: [
            {action: "Detail", color: "primary" },
            {action: "Edit", color: "primary" },
            {action: "Delete", color: "error" },
    ]}

    const samplesActions: ActionsButtonsComponentProps = {
        actions: [
            {action: "create Sample", color: "primary", icon: "create"},
    ]}
    
    useEffect(() => {
        const getSampleList = async () =>{
            try {
                await getSamples();
                if(samples){
                    setRowsValue(samplesToTableRowPropList(samples));
                }
            } catch (error) {
                throw new Error("error getting samples");
            }
        }
        getSampleList();
    }, [])

    useEffect(() => {
        if(samples) {
            setRowsValue(samplesToTableRowPropList(samples));
        }
    }, [samples])

    if(loading) return <CircularSpinner />
    if(error) return <Typography text="Error" variant="h6" />
    return(
        <Box>
            <Box sx={{display:"flex", flexDirection: "row"}}>
                <Typography
                    text="Samples"
                    size="20px"
                    variant="h1"
                    padding="10px 0px"
                />
                <Box sx={{marginLeft: "auto"}}>
                    <ActionsButtonsComponent actions={samplesActions.actions} />
                </Box>
            </Box>
            <TableComponent headerLabels={SAMPLES_TABLE_HEADER_LABELS} rows={rowsValue} actions={tableActions} />
        </Box>
    )
}

export default SamplesContent;