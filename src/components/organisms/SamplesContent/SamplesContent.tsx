import {useEffect, useState} from "react";
import {Box} from "@mui/material";

import {
  SAMPLES_PAGE_DIALOG_TITLE,
  SAMPLES_TABLE_HEADER_LABELS,
  SAMPLES_TITLE_CONFIG,
} from "../../../utils/constants/pages/samples";
import {samplesToTableRows} from "../../../adapters/tableRow";
import {TableRowProps} from "../../molecules/TableRow/Types";
import {useSample} from "../../../utils/hooks/useSample";
import Typography from "../../atoms/Typography/Typography";
import Spinner from "../../atoms/Spinner/Spinner";
import Table from "../Table/Table";
import Button from "../../atoms/Button/Button";
import {ButtonConfig} from "../../atoms/Button/Types";
import Dialog from "../../molecules/Dialog/Dialog";
import {
  SharedButtonColors,
  SharedButtonIcons,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../utils/enums";
import {useModal} from "../../../utils/hooks/useModal";

function SamplesContent(): React.ReactElement {
  const {samples, isLoading, error} = useSample();
  const [rows, setRows] = useState<TableRowProps[]>([]);
  const {isOpen, openModal, closeModal} = useModal();

  useEffect(() => {
    if (samples) {
      setRows(samplesToTableRows(samples));
    }
  }, [samples]);

  const handleCreateReport = () => {
    // eslint-disable-next-line no-console
    console.log("Create report");
  };

  if (isLoading) return <Spinner />;
  if (error) return <Typography text={error} variant="h6" />;

  const buttonPageConfig: ButtonConfig = {
    label: "Create sample",
    variant: SharedButtonVariants.Outlined,
    size: SharedButtonSizes.Small,
    color: SharedButtonColors.Primary,
    icon: SharedButtonIcons.Create,
    onClick: openModal,
  };

  const dialogActions = (
    <Box>
      <Button
        label="Cancel"
        variant="outlined"
        size="small"
        color="error"
        onClick={closeModal}
      />
      <Button
        label="Save"
        variant="contained"
        size="small"
        color="primary"
        onClick={handleCreateReport}
      />
    </Box>
  );

  return (
    <Box>
      <Box sx={{display: "flex", flexDirection: "row"}}>
        <Typography {...SAMPLES_TITLE_CONFIG} />
        <Box sx={{marginLeft: "auto"}}>
          <Button {...buttonPageConfig} />
        </Box>
      </Box>
      <Table headerLabels={SAMPLES_TABLE_HEADER_LABELS} rows={rows} />
      <Dialog
        isOpen={isOpen}
        dialogTitle={SAMPLES_PAGE_DIALOG_TITLE}
        onClose={closeModal}
        dialogActions={dialogActions}
      >
        <Box>hola</Box>
      </Dialog>
    </Box>
  );
}

export default SamplesContent;
