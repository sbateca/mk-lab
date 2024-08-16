import React, {createContext, useState, useEffect, useMemo} from "react";

import {
  getAnalyteByIdService,
  getAnalytesService,
} from "../../services/analyteService";
import {Analyte} from "../../model/Analyte";

const AnalyteContext = createContext<{
  analytes: Analyte[] | null;
  selectedAnalyte: Analyte | null;
  setSelectedAnalyte: React.Dispatch<React.SetStateAction<Analyte | null>>;
  getAnalytes: () => Promise<void>;
  getAnalyteById: (clientId: string) => Promise<Analyte | null>;
  isLoading: boolean;
  error: string | null;
}>({
  analytes: [],
  selectedAnalyte: null,
  setSelectedAnalyte: () => {},
  getAnalytes: async () => {},
  getAnalyteById: async () => ({}) as Analyte,
  isLoading: true,
  error: null,
});

interface IProviderProps {
  children: React.ReactNode;
}

function AnalyteProvider({children}: IProviderProps) {
  const [analytes, setAnalytes] = useState<Analyte[] | null>(null);
  const [selectedAnalyte, setSelectedAnalyte] = useState<Analyte | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getAnalytes = async () => {
    try {
      setIsLoading(true);
      const client = await getAnalytesService();
      if (client !== null) {
        setAnalytes(client);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const getAnalyteById = async (clientId: string): Promise<Analyte | null> => {
    try {
      return await getAnalyteByIdService(clientId);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  useEffect(() => {
    getAnalytes();
  }, []);

  useEffect(() => {
    setSelectedAnalyte(selectedAnalyte);
  }, [selectedAnalyte]);

  const value = useMemo(
    () => ({
      analytes,
      selectedAnalyte,
      setSelectedAnalyte,
      getAnalytes,
      getAnalyteById,
      isLoading,
      error,
    }),
    [analytes, selectedAnalyte, isLoading, error],
  );

  return (
    <AnalyteContext.Provider value={value}>{children}</AnalyteContext.Provider>
  );
}

export {AnalyteContext, AnalyteProvider};
