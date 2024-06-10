import {useEffect, useState} from "react";
import {Box} from "@mui/material";

import {ButtonConfigs} from "../../Molecules/ActionButtons/Types";
import ActionButtons from "../../Molecules/ActionButtons/ActionButtons";
import {SAMPLES_TABLE_HEADER_LABELS} from "../../../Config/constants";
import {samplesToTableRows} from "../../../Adapters/tableRow";
import {TableRowProps} from "../../Molecules/TableRow/Types";
import {useSample} from "../../../Utils/Hooks/useSample";
import Typography from "../../Atoms/Typography/Typography";
import Spinner from "../../Atoms/Spinner/Spinner";
import Table from "../Table/Table";

function SamplesContent(): React.ReactElement {
  const {samples, getSamples, loading, error} = useSample();
  const [rows, setRows] = useState<TableRowProps[]>([]);

  const tableButtonConfigs: ButtonConfigs = {
    buttonConfigs: [
      {label: "Detail", color: "primary"},
      {label: "Edit", color: "primary"},
      {label: "Delete", color: "error"},
    ],
  };
  const buttonConfigs: ButtonConfigs = {
    buttonConfigs: [{label: "Create Sample", color: "primary", icon: "create"}],
  };

  useEffect(() => {
    getSamples();
  }, [getSamples]);

  useEffect(() => {
    if (samples) {
      setRows(samplesToTableRows(samples));
    }
  }, [samples]);

  if (loading) return <Spinner />;
  if (error) return <Typography text="Error" variant="h6" />;
  return (
    <Box>
      <Box sx={{display: "flex", flexDirection: "row"}}>
        <Typography
          text="Samples"
          size="20px"
          variant="h1"
          padding="10px 0px"
        />
        <Box sx={{marginLeft: "auto"}}>
          <ActionButtons buttonConfigs={buttonConfigs.buttonConfigs} />
        </Box>
      </Box>
      <Table
        headerLabels={SAMPLES_TABLE_HEADER_LABELS}
        rows={rows}
        buttonConfigs={tableButtonConfigs}
      />
    </Box>
  );
}

export default SamplesContent;
