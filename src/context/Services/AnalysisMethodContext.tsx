import React, {createContext, useState, useEffect, useMemo} from "react";

import {
  getAnalysisMethodByIdService,
  getAnalysisMethodService,
} from "../../services";
import {AnalysisMethod} from "../../model/AnalysisMethod";

const AnalysisMethodContext = createContext<{
  analysisMethods: AnalysisMethod[] | null;
  selectedAnalysisMethod: AnalysisMethod | null;
  setSelectedAnalysisMethod: React.Dispatch<
    React.SetStateAction<AnalysisMethod | null>
  >;
  getAnalysisMethods: () => Promise<void>;
  getAnalysisMethodById: (clientId: string) => Promise<AnalysisMethod | null>;
  isLoading: boolean;
  error: string | null;
}>({
  analysisMethods: [],
  selectedAnalysisMethod: null,
  setSelectedAnalysisMethod: () => {},
  getAnalysisMethods: async () => {},
  getAnalysisMethodById: async () => ({}) as AnalysisMethod,
  isLoading: true,
  error: null,
});

interface IProviderProps {
  children: React.ReactNode;
}

function AnalysisMethodProvider({children}: IProviderProps) {
  const [analysisMethods, setAnalysisMethods] = useState<
    AnalysisMethod[] | null
  >(null);
  const [selectedAnalysisMethod, setSelectedAnalysisMethod] =
    useState<AnalysisMethod | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getAnalysisMethods = async () => {
    try {
      setIsLoading(true);
      const analysisMethods = await getAnalysisMethodService();
      if (analysisMethods !== null) {
        setAnalysisMethods(analysisMethods);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const getAnalysisMethodById = async (
    clientId: string,
  ): Promise<AnalysisMethod | null> => {
    try {
      return await getAnalysisMethodByIdService(clientId);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  useEffect(() => {
    getAnalysisMethods();
  }, []);

  useEffect(() => {
    setSelectedAnalysisMethod(selectedAnalysisMethod);
  }, [selectedAnalysisMethod]);

  const value = useMemo(
    () => ({
      analysisMethods,
      selectedAnalysisMethod,
      setSelectedAnalysisMethod,
      getAnalysisMethods,
      getAnalysisMethodById,
      isLoading,
      error,
    }),
    [analysisMethods, selectedAnalysisMethod, isLoading, error],
  );

  return (
    <AnalysisMethodContext.Provider value={value}>
      {children}
    </AnalysisMethodContext.Provider>
  );
}

export {AnalysisMethodContext, AnalysisMethodProvider};
