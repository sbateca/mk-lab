import {useContext} from "react";
import {AnalyteContext} from "../../context/Services/AnalyteContext";

export const useAnalyte = () => {
  const context = useContext(AnalyteContext);
  if (!context) {
    throw new Error(
      "useAnalyte should be used inside the MenuSample provider.",
    );
  }
  return context;
};
