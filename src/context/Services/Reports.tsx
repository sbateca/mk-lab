import React, {createContext, useState, useEffect} from "react";

import {getReportsService} from "../../services/reportsService";
import {IReport} from "../../model/report";

const ReportsContext = createContext<{
  reports: IReport[] | null;
  loading: boolean;
  error: string | unknown;
  getReports: () => void;
}>({
  reports: [],
  loading: true,
  error: null,
  getReports: () => {},
});

interface IProviderProps {
  children: React.ReactNode;
}

function ReportsProvider({children}: IProviderProps) {
  const [reports, setReports] = useState<IReport[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | unknown>(null);

  const getReports = async () => {
    try {
      const reports = await getReportsService();
      if (reports !== null) {
        setReports(reports);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  return (
    <ReportsContext.Provider
      value={{
        reports,
        loading,
        error,
        getReports,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
}

export {ReportsContext, ReportsProvider};
