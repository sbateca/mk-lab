import React, {createContext, useState, useEffect, useMemo} from "react";

import {
  createSampleService,
  deleteSampleService,
  editSampleService,
  getSampleByIdService,
  getSamplesService,
} from "../../services/sampleService";
import {Sample} from "../../model/Sample";
import {
  SAMPLE_ID_MISSING_TEXT,
  SAMPLE_ID_OR_SAMPLE_MISSING_TEXT,
} from "../../utils/constants";

const SampleContext = createContext<{
  samples: Sample[] | null;
  selectedSample: Sample | null;
  setSelectedSample: React.Dispatch<React.SetStateAction<Sample | null>>;
  getSamples: () => Promise<void>;
  getSampleById: (sampleId: string) => Promise<Sample | null>;
  createSample: (sample: Sample) => Promise<Sample | null>;
  editSample: (sampleId?: string, sample?: Sample) => Promise<Sample | null>;
  deleteSample: (sampleId?: string) => Promise<Sample | null>;
  isLoading: boolean;
  error: string | null;
}>({
  samples: [],
  selectedSample: null,
  setSelectedSample: () => {},
  getSamples: async () => {},
  getSampleById: async () => ({}) as Sample,
  createSample: async () => ({}) as Sample,
  editSample: async () => ({}) as Sample,
  deleteSample: async () => ({}) as Sample,
  isLoading: true,
  error: null,
});

interface IProviderProps {
  children: React.ReactNode;
}

function SampleProvider({children}: IProviderProps) {
  const [samples, setSamples] = useState<Sample[] | null>(null);
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getSamples = async () => {
    try {
      setIsLoading(true);
      const samples = await getSamplesService();
      if (samples !== null) {
        setSamples(samples);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const getSampleById = async (sampleId: string): Promise<Sample | null> => {
    try {
      setIsLoading(true);
      return await getSampleByIdService(sampleId);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  const createSample = async (sample: Sample): Promise<Sample | null> => {
    try {
      return await createSampleService(sample);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  const editSample = async (
    sampleId?: string,
    sample?: Sample,
  ): Promise<Sample | null> => {
    try {
      if (sampleId && sample) {
        return await editSampleService(sampleId, sample);
      } else {
        setError(SAMPLE_ID_OR_SAMPLE_MISSING_TEXT);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  const deleteSample = async (sampleId?: string): Promise<Sample | null> => {
    try {
      if (sampleId) {
        return await deleteSampleService(sampleId);
      } else {
        setError(SAMPLE_ID_MISSING_TEXT);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  useEffect(() => {
    getSamples();
  }, []);

  useEffect(() => {
    setSelectedSample(selectedSample);
  }, [selectedSample]);

  const value = useMemo(
    () => ({
      samples,
      selectedSample,
      setSelectedSample,
      getSamples,
      getSampleById,
      createSample,
      editSample,
      deleteSample,
      isLoading,
      error,
    }),
    [samples, selectedSample, isLoading, error],
  );

  return (
    <SampleContext.Provider value={value}>{children}</SampleContext.Provider>
  );
}

export {SampleContext, SampleProvider};
