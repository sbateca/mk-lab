import React, {createContext, useState, useEffect, useMemo} from "react";

import {
  getClientByIdService,
  getClientsService,
} from "../../services/clientService";
import {Client} from "../../model/Client";

const ClientContext = createContext<{
  clients: Client[] | null;
  selectedClient: Client | null;
  setSelectedClient: React.Dispatch<React.SetStateAction<Client | null>>;
  getClients: () => Promise<void>;
  getClientById: (clientId: string) => Promise<Client | null>;
  isLoading: boolean;
  error: string | null;
}>({
  clients: [],
  selectedClient: null,
  setSelectedClient: () => {},
  getClients: async () => {},
  getClientById: async () => ({}) as Client,
  isLoading: true,
  error: null,
});

interface IProviderProps {
  children: React.ReactNode;
}

function ClientProvider({children}: IProviderProps) {
  const [clients, setClients] = useState<Client[] | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getClients = async () => {
    try {
      setIsLoading(true);
      const client = await getClientsService();
      if (client !== null) {
        setClients(client);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const getClientById = async (clientId: string): Promise<Client | null> => {
    try {
      return await getClientByIdService(clientId);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    setSelectedClient(selectedClient);
  }, [selectedClient]);

  const value = useMemo(
    () => ({
      clients,
      selectedClient,
      setSelectedClient,
      getClients,
      getClientById,
      isLoading,
      error,
    }),
    [clients, selectedClient, isLoading, error],
  );

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
}

export {ClientContext, ClientProvider};
