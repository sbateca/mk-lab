import {useContext} from "react";
import {AnalysisMethodContext} from "../../context/Services/AnalysisMethodContext";

export const useAnalysisMethod = () => {
  const context = useContext(AnalysisMethodContext);
  if (!context) {
    throw new Error(
      "useAnalysisMethod should be used inside the MenuSample provider.",
    );
  }
  return context;
};
