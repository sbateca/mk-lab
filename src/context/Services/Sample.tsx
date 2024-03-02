import React, { createContext, useState, useEffect } from "react"

import { ISample } from "../../model/sample"
import { getSamplesService } from '../../services/sampleService'

const SampleContext = createContext<{
    samples: ISample[] | null;
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

function SampleProvider({ children }: IProviderProps) {
    const [samples, setSamples] = useState<ISample[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | unknown>(null);

    const getSamples = async () => {
        try {
            const samples = await getSamplesService();
            if(samples !== null){
                setSamples(samples);
            }
        } catch (error) {
            setError(error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getSamples();
    }, []);

    return <SampleContext.Provider
        value={{
            samples,
            loading,
            error,
            getSamples
        }}>
        {children}
    </SampleContext.Provider>;
};

export { SampleContext, SampleProvider };
