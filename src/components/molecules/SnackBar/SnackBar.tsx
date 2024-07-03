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

  return (
    <div>
      <MuiSnackbar open={open} autoHideDuration={3000}>
        <Alert severity={severity} variant="filled" sx={{width: "100%"}}>
          {snackBarText}
        </Alert>
      </MuiSnackbar>
    </div>
  );
}

export default Snackbar;
