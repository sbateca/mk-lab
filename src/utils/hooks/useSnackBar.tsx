import {useCallback, useEffect, useState} from "react";
import {SnackBarSeverity} from "../enums";

export const useSnackBar = () => {
  const [isSnackBarOpen, setIsSnackBarOpen] = useState<boolean>(false);
  const [snackBarText, setSnackBarText] = useState<string>("");
  const [snackBarSeverity, setSnackBarSeverity] = useState<SnackBarSeverity>(
    SnackBarSeverity.Success,
  );
  const [snackbarCallback, setSnackBarCallback] = useState<() => void>(
    () => {},
  );

  const showSnackBarMessage = useCallback(
    (text: string, severity: SnackBarSeverity, callback?: () => void) => {
      setSnackBarText(text);
      setSnackBarSeverity(severity);
      setIsSnackBarOpen(true);

      if (callback) {
        setSnackBarCallback(() => callback);
      }

      setTimeout(() => {
        setIsSnackBarOpen(false);
      }, 2500);
    },
    [],
  );

  useEffect(() => {
    if (isSnackBarOpen === false && snackbarCallback) {
      snackbarCallback();
    }
  }, [snackbarCallback, isSnackBarOpen]);

  return {
    isSnackBarOpen,
    setIsSnackBarOpen,
    snackBarText,
    setSnackBarText,
    snackBarSeverity,
    setSnackBarSeverity,
    showSnackBarMessage,
  };
};
