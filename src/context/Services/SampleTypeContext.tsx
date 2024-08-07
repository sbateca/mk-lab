import React, {createContext, useState, useEffect, useMemo} from "react";

import {SampleType} from "../../model/SampleType";
import {
  getSampleTypeByIdService,
  getSampleTypesService,
} from "../../services/sampleTypeService";

const SampleTypeContext = createContext<{
  sampleTypes: SampleType[] | null;
  selectedSampleType: SampleType | null;
  setSelectedSampleType: React.Dispatch<
    React.SetStateAction<SampleType | null>
  >;
  getSampleTypes: () => Promise<void>;
  getSampleTypeById: (sampleId: string) => Promise<SampleType | null>;
  isLoading: boolean;
  error: string | null;
}>({
  sampleTypes: [],
  selectedSampleType: null,
  setSelectedSampleType: () => {},
  getSampleTypes: async () => {},
  getSampleTypeById: async () => ({}) as SampleType,
  isLoading: true,
  error: null,
});

interface IProviderProps {
  children: React.ReactNode;
}

function SampleTypeProvider({children}: IProviderProps) {
  const [sampleTypes, setSampleTypes] = useState<SampleType[] | null>(null);
  const [selectedSampleType, setSelectedSampleType] =
    useState<SampleType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getSampleTypes = async () => {
    try {
      setIsLoading(true);
      const sampleTypes = await getSampleTypesService();
      if (sampleTypes !== null) {
        setSampleTypes(sampleTypes);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const getSampleTypeById = async (
    sampleTypeId: string,
  ): Promise<SampleType | null> => {
    try {
      return await getSampleTypeByIdService(sampleTypeId);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  useEffect(() => {
    getSampleTypes();
  }, []);

  useEffect(() => {
    setSelectedSampleType(selectedSampleType);
  }, [selectedSampleType]);

  const value = useMemo(
    () => ({
      sampleTypes,
      selectedSampleType,
      setSelectedSampleType,
      getSampleTypes,
      getSampleTypeById,
      isLoading,
      error,
    }),
    [sampleTypes, selectedSampleType, isLoading, error],
  );

  return (
    <SampleTypeContext.Provider value={value}>
      {children}
    </SampleTypeContext.Provider>
  );
}

export {SampleTypeContext, SampleTypeProvider};
