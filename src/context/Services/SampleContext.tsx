import React, {createContext, useState, useEffect} from "react";

import {Sample} from "../../model/Sample";
import {
  createSampleService,
  getSamplesService,
} from "../../services/sampleService";

const SampleContext = createContext<{
  samples: Sample[] | null;
  getSamples: () => Promise<void>;
  createSample: (sample: Sample) => Promise<Sample | null>;
  isLoading: boolean;
  error: string | null;
}>({
  samples: [],
  getSamples: async () => {},
  createSample: async () => ({}) as Sample,
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

  useEffect(() => {
    getSamples();
  }, []);

  return (
    <SampleContext.Provider
      value={{
        samples,
        getSamples,
        createSample,
        isLoading,
        error,
      }}
    >
      {children}
    </SampleContext.Provider>
  );
}

export {SampleContext, SampleProvider};
