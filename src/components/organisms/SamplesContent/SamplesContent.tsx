import {useEffect, useState} from "react";
import {Box} from "@mui/material";

import ActionButtons from "../../molecules/ActionButtons/ActionButtons";
import {
  SAMPLES_BUTTON_CONFIGS,
  SAMPLES_TABLE_HEADER_LABELS,
  SAMPLES_TABLE_BUTTON_CONFIGS,
  SAMPLES_TITLE_CONFIG,
} from "../../../utils/constants/pages/samples";
import {samplesToTableRows} from "../../../adapters/tableRow";
import {TableRowProps} from "../../molecules/TableRow/Types";
import {useSample} from "../../../utils/hooks/useSample";
import Typography from "../../atoms/Typography/Typography";
import Spinner from "../../atoms/Spinner/Spinner";
import Table from "../Table/Table";

function SamplesContent(): React.ReactElement {
  const {samples, isLoading, error} = useSample();
  const [rows, setRows] = useState<TableRowProps[]>([]);

  useEffect(() => {
    if (samples) {
      setRows(samplesToTableRows(samples));
    }
  }, [samples]);

  if (isLoading) return <Spinner />;
  if (error) return <Typography text={error} variant="h6" />;
  return (
    <Box>
      <Box sx={{display: "flex", flexDirection: "row"}}>
        <Typography {...SAMPLES_TITLE_CONFIG} />
        <Box sx={{marginLeft: "auto"}}>
          <ActionButtons buttonConfigs={SAMPLES_BUTTON_CONFIGS.buttonConfigs} />
        </Box>
      </Box>
      <Table
        headerLabels={SAMPLES_TABLE_HEADER_LABELS}
        rows={rows}
        buttonConfigs={SAMPLES_TABLE_BUTTON_CONFIGS}
      />
    </Box>
  );
}

export default SamplesContent;
