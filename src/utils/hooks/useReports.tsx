import {useContext} from "react";

import {ReportsContext} from "../../context/Services/ReportsContext";

export const useReports = () => {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error(
      "useReports should be used inside the MenuContext provider.",
    );
  }
  return context;
};
