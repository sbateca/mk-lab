import {SnackBarSeverity} from "../../utils/enums";

export interface SnackBarContextType {
  isSnackBarOpen: boolean;
  snackBarText: string;
  snackBarSeverity: SnackBarSeverity;
  showSnackBarMessage: (
    text: string,
    severity: SnackBarSeverity,
    callback?: () => void,
  ) => void;
}
