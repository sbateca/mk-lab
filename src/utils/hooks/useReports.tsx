import {useContext} from "react";

import {ReportsContext} from "../../Context/Services/Reports";

export const useReports = () => {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error("useReports should be used inside MenuContext provider");
  }
  return context;
};
