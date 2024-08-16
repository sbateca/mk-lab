import React, {createContext, useState, useEffect, useMemo} from "react";

import {
  createReportService,
  deleteReportService,
  editReportService,
  getReportByIdService,
  getReportsService,
} from "../../services/reportsService";
import {Report} from "../../model/Report";
import {
  REPORT_ID_MISSING_TEXT,
  REPORT_ID_OR_REPORTS_MISSING_TEXT,
} from "../../utils/constants";

const ReportsContext = createContext<{
  reports: Report[] | null;
  selectedReport: Report | null;
  setSelectedReport: React.Dispatch<React.SetStateAction<Report | null>>;
  getReports: () => Promise<void>;
  getReportById: (reportId: string) => Promise<Report | null>;
  createReport: (report: Report) => Promise<Report | null>;
  editReport: (reportId?: string, report?: Report) => Promise<Report | null>;
  deleteReport: (reportId?: string) => Promise<Report | null>;
  isLoading: boolean;
  error: string | null;
}>({
  reports: [],
  selectedReport: null,
  setSelectedReport: () => {},
  getReports: async () => {},
  getReportById: async () => ({}) as Report,
  createReport: async () => ({}) as Report,
  editReport: async () => ({}) as Report,
  deleteReport: async () => ({}) as Report,
  isLoading: true,
  error: null,
});

interface IProviderProps {
  children: React.ReactNode;
}

function ReportsProvider({children}: IProviderProps) {
  const [reports, setReports] = useState<Report[] | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
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

  const getReportById = async (reportId: string): Promise<Report | null> => {
    try {
      return await getReportByIdService(reportId);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  const createReport = async (report: Report): Promise<Report | null> => {
    try {
      setIsLoading(true);
      return await createReportService(report);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  const editReport = async (
    reportId?: string,
    report?: Report,
  ): Promise<Report | null> => {
    try {
      setIsLoading(true);
      if (reportId && report) {
        return await editReportService(reportId, report);
      } else {
        setError(REPORT_ID_OR_REPORTS_MISSING_TEXT);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  const deleteReport = async (reportId?: string): Promise<Report | null> => {
    try {
      setIsLoading(true);
      if (reportId) {
        return await deleteReportService(reportId);
      } else {
        setError(REPORT_ID_MISSING_TEXT);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  useEffect(() => {
    getReports();
  }, []);

  useEffect(() => {
    setSelectedReport(selectedReport);
  }, [selectedReport]);

  const value = useMemo(
    () => ({
      reports,
      selectedReport,
      setSelectedReport,
      getReports,
      getReportById,
      createReport,
      editReport,
      deleteReport,
      isLoading,
      error,
    }),
    [
      reports,
      selectedReport,
      setSelectedReport,
      getReports,
      getReportById,
      createReport,
      editReport,
      deleteReport,
      isLoading,
      error,
    ],
  );

  return (
    <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>
  );
}

export {ReportsContext, ReportsProvider};
