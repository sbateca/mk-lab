import {useSnackBar} from "../../../utils/hooks";
import {Snackbar} from "./SnackBar";

export const SnackBarContainer = () => {
  const {isSnackBarOpen, snackBarText, snackBarSeverity} = useSnackBar();
  return (
    <Snackbar
      isOpen={isSnackBarOpen}
      snackBarText={snackBarText}
      severity={snackBarSeverity}
    />
  );
};
