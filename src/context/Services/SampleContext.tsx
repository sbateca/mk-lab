import React, {createContext, useState, useEffect} from "react";

import {Sample} from "../../Model/Sample";
import {getSamplesService} from "../../Services/sampleService";

const SampleContext = createContext<{
  samples: Sample[] | null;
  isLoading: boolean;
  error: string | null;
}>({
  samples: [],
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

  useEffect(() => {
    getSamples();
  }, []);

  return (
    <SampleContext.Provider
      value={{
        samples,
        isLoading,
        error,
      }}
    >
      {children}
    </SampleContext.Provider>
  );
}

export {SampleContext, SampleProvider};
