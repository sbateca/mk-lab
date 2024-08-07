import React, {createContext, useState, useEffect, useMemo} from "react";

import {
  getCriteriaByIdService,
  getCriteriasService,
} from "../../services/criteriaService";
import {Criteria} from "../../model/Criteria";

const CriteriaContext = createContext<{
  criterias: Criteria[] | null;
  selectedCriteria: Criteria | null;
  setSelectedCriteria: React.Dispatch<React.SetStateAction<Criteria | null>>;
  getCriterias: () => Promise<void>;
  getCriteriaById: (clientId: string) => Promise<Criteria | null>;
  isLoading: boolean;
  error: string | null;
}>({
  criterias: [],
  selectedCriteria: null,
  setSelectedCriteria: () => {},
  getCriterias: async () => {},
  getCriteriaById: async () => ({}) as Criteria,
  isLoading: true,
  error: null,
});

interface IProviderProps {
  children: React.ReactNode;
}

function CriteriaProvider({children}: IProviderProps) {
  const [criterias, setCriterias] = useState<Criteria[] | null>(null);
  const [selectedCriteria, setSelectedCriteria] = useState<Criteria | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getCriterias = async () => {
    try {
      setIsLoading(true);
      const client = await getCriteriasService();
      if (client !== null) {
        setCriterias(client);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const getCriteriaById = async (id: string): Promise<Criteria | null> => {
    try {
      return await getCriteriaByIdService(id);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  useEffect(() => {
    getCriterias();
  }, []);

  useEffect(() => {
    setSelectedCriteria(selectedCriteria);
  }, [selectedCriteria]);

  const value = useMemo(
    () => ({
      criterias,
      selectedCriteria,
      setSelectedCriteria,
      getCriterias,
      getCriteriaById,
      isLoading,
      error,
    }),
    [criterias, selectedCriteria, isLoading, error],
  );

  return (
    <CriteriaContext.Provider value={value}>
      {children}
    </CriteriaContext.Provider>
  );
}

export {CriteriaContext, CriteriaProvider};
