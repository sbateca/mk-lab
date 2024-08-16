import React, {createContext, useState, useCallback, useEffect} from "react";

import {SnackBarContextType} from "./Types";
import {SnackBarSeverity} from "../../utils/enums";

export const SnackBarContext = createContext<SnackBarContextType>({
  isSnackBarOpen: false,
  snackBarText: "",
  snackBarSeverity: SnackBarSeverity.SUCCESS,
  showSnackBarMessage: () => {},
});

interface SnackBarProviderProps {
  children: React.ReactNode;
}

export const SnackBarProvider = ({children}: SnackBarProviderProps) => {
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarText, setSnackBarText] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState(
    SnackBarSeverity.SUCCESS,
  );
  const [callbackFunction, setCallbackFunction] = useState<() => void>();

  const showSnackBarMessage = useCallback(
    (text: string, severity: SnackBarSeverity, callback?: () => void) => {
      setSnackBarText(text);
      setSnackBarSeverity(severity);
      setCallbackFunction(callback);
      setIsSnackBarOpen(true);
    },
    [],
  );

  useEffect(() => {
    if (isSnackBarOpen) {
      const timer = setTimeout(() => {
        setIsSnackBarOpen(false);
        if (typeof callbackFunction === "function") {
          callbackFunction();
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSnackBarOpen, callbackFunction]);

  return (
    <SnackBarContext.Provider
      value={{
        isSnackBarOpen,
        snackBarText,
        snackBarSeverity,
        showSnackBarMessage,
      }}
    >
      {children}
    </SnackBarContext.Provider>
  );
};
