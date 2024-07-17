import {useEffect, useState} from "react";
import {Alert, Box, Snackbar as MuiSnackbar} from "@mui/material";
import {SnackbarProps} from "./Types";

function Snackbar({isOpen, snackBarText, severity}: SnackbarProps) {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <Box>
      <MuiSnackbar open={open} autoHideDuration={3000}>
        <Alert severity={severity} variant="filled" sx={{width: "100%"}}>
          {snackBarText}
        </Alert>
      </MuiSnackbar>
    </Box>
  );
}

export default Snackbar;
