import { useEffect, useState } from "react"
import { Box } from "@mui/material"

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
            <Box>
                <Typography
                    text="Samples"
                    size="20px"
                    variant="h1"
                    padding="10px 0px"
                />
                <TableComponent headerLabels={SAMPLES_TABLE_HEADER_LABELS} rows={rowsValue} />
            </Box>
        </Box>
    )
}

export default SamplesContent;