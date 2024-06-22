import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions as MuiDialogActions,
  Box,
} from "@mui/material";
import {DialogProps} from "./Types";
import Typography from "../../atoms/Typography/Typography";

function Dialog({
  isOpen,
  dialogTitle,
  children,
  dialogActions,
  maxWidth,
  onClose,
}: DialogProps): React.ReactElement {
  return (
    <MuiDialog open={isOpen} onClose={onClose} maxWidth={maxWidth}>
      <Box>
        <DialogTitle>
          <Typography
            text={dialogTitle}
            variant="inherit"
            size="24px"
            align="center"
          />
        </DialogTitle>
      </Box>
      <DialogContent>{children}</DialogContent>
      <MuiDialogActions>{dialogActions}</MuiDialogActions>
    </MuiDialog>
  );
}

export default Dialog;
