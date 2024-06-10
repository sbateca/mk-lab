import React, {createContext, useState, useEffect, useCallback} from "react";

import {Sample} from "../../Model/Sample";
import {getSamplesService} from "../../Services/sampleService";

const SampleContext = createContext<{
  samples: Sample[] | null;
  loading: boolean;
  error: string | unknown;
  getSamples: () => void;
}>({
  samples: [],
  loading: true,
  error: null,
  getSamples: () => {},
});

interface IProviderProps {
  children: React.ReactNode;
}

function SampleProvider({children}: IProviderProps) {
  const [samples, setSamples] = useState<Sample[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | unknown>(null);

  const getSamples = useCallback(async () => {
    try {
      setLoading(true);
      const samples = await getSamplesService();
      if (samples !== null) {
        setSamples(samples);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getSamples();
  }, [getSamples]);

  return (
    <SampleContext.Provider
      value={{
        samples,
        loading,
        error,
        getSamples,
      }}
    >
      {children}
    </SampleContext.Provider>
  );
}

export {SampleContext, SampleProvider};
