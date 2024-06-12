import React, {createContext, useState, useEffect} from "react";

import {Report} from "../../Model/Report";
import {getReportsService} from "../../Services/reportsService";

const ReportsContext = createContext<{
  reports: Report[] | null;
  isLoading: boolean;
  error: string | null;
}>({
  reports: [],
  isLoading: true,
  error: null,
});

interface IProviderProps {
  children: React.ReactNode;
}

function ReportsProvider({children}: IProviderProps) {
  const [reports, setReports] = useState<Report[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getReports = async () => {
    try {
      const reports = await getReportsService();
      if (reports !== null) {
        setReports(reports);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  return (
    <ReportsContext.Provider
      value={{
        reports,
        isLoading,
        error,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
}

export {ReportsContext, ReportsProvider};
