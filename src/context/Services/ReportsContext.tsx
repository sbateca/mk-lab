import React, {createContext, useState, useEffect, useCallback} from "react";

import {Report} from "../../Model/Report";
import {getReportsService} from "../../Services/reportsService";

const ReportsContext = createContext<{
  reports: Report[] | null;
  loading: boolean;
  error: string | null;
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
  const [reports, setReports] = useState<Report[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getReports = useCallback(async () => {
    try {
      const reports = await getReportsService();
      if (reports !== null) {
        setReports(reports);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getReports();
  }, [getReports]);

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
