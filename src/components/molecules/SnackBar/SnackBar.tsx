import {Alert, Snackbar as MuiSnackbar} from "@mui/material";
import React, {useEffect} from "react";

interface SnackbarProps {
  isOpen: boolean;
  snackBarText: string;
  severity: "success" | "info" | "warning" | "error";
}

function Snackbar({isOpen, snackBarText, severity}: SnackbarProps) {
  const [open, setOpen] = React.useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <MuiSnackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{width: "100%"}}
        >
          {snackBarText}
        </Alert>
      </MuiSnackbar>
    </div>
  );
}

export default Snackbar;
