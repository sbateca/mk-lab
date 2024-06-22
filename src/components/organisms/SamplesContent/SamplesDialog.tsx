import {Box} from "@mui/material";
import {useModal} from "../../../utils/hooks/useModal";
import Button from "../../atoms/Button/Button";
import Dialog from "../../molecules/Dialog/Dialog";
import {Sample} from "../../../model/Sample";

interface SamplesDialogProps {
  dialogTitle: string;
  sample?: Sample;
}

function SamplesDialog({dialogTitle}: SamplesDialogProps): React.ReactElement {
  const {isOpen, closeModal} = useModal();

  const handleCreateReport = () => {
    // eslint-disable-next-line no-console
    console.log("Create report");
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
    <Dialog
      isOpen={isOpen}
      dialogTitle={dialogTitle}
      onClose={closeModal}
      dialogActions={dialogActions}
    >
      <Box>doalog content</Box>
    </Dialog>
  );
}

export default SamplesDialog;
