import {useSnackBar} from "../../../utils/hooks/useSnackBar";
import Snackbar from "./SnackBar";

const SnackBarContainer = () => {
  const {isSnackBarOpen, snackBarText, snackBarSeverity} = useSnackBar();
  return (
    <Snackbar
      isOpen={isSnackBarOpen}
      snackBarText={snackBarText}
      severity={snackBarSeverity}
    />
  );
};

export default SnackBarContainer;
