import React, {createContext, useState, useEffect, useMemo} from "react";

import {Sample} from "../../model/Sample";
import {
  createSampleService,
  editSampleService,
  getSampleByIdService,
  getSamplesService,
} from "../../services/sampleService";

const SampleContext = createContext<{
  samples: Sample[] | null;
  getSamples: () => Promise<void>;
  getSampleById: (sampleId: string) => Promise<Sample | null>;
  createSample: (sample: Sample) => Promise<Sample | null>;
  editSample: (sampleId?: string, sample?: Sample) => Promise<Sample | null>;
  isLoading: boolean;
  error: string | null;
}>({
  samples: [],
  getSamples: async () => {},
  getSampleById: async () => ({}) as Sample,
  createSample: async () => ({}) as Sample,
  editSample: async () => ({}) as Sample,
  isLoading: true,
  error: null,
});

interface IProviderProps {
  children: React.ReactNode;
}

function SampleProvider({children}: IProviderProps) {
  const [samples, setSamples] = useState<Sample[] | null>(null);
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

  const getSampleById = async (sampleId: string) => {
    try {
      return await getSampleByIdService(sampleId);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  const createSample = async (sample: Sample) => {
    try {
      return await createSampleService(sample);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  const editSample = async (sampleId?: string, sample?: Sample) => {
    try {
      if (sampleId && sample) {
        return await editSampleService(sampleId, sample);
      } else {
        setError("SampleId or Sample is missing");
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

  const value = useMemo(
    () => ({
      samples,
      getSamples,
      getSampleById,
      createSample,
      editSample,
      isLoading,
      error,
    }),
    [samples, isLoading, error],
  );

  return (
    <SampleContext.Provider value={value}>{children}</SampleContext.Provider>
  );
}

export {SampleContext, SampleProvider};
