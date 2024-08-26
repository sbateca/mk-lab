import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import {useClient} from "../../utils/hooks";
import {ClientProvider} from "./ClientContext";
import * as ClientService from "../../services/clientService";

jest.mock("../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

jest.mock("../../services/clientService", () => ({
  getClientsService: jest.fn().mockResolvedValue([
    {id: "1", name: "Client 1"},
    {id: "2", name: "Client 2"},
    {id: "3", name: "Client 3"},
  ]),
  getClientByIdService: jest.fn().mockResolvedValue({
    id: "1",
    name: "Client 1",
  }),
}));

const TestComponent = () => {
  const {
    clients,
    selectedClient,
    setSelectedClient,
    getClients,
    getClientById,
    isLoading,
    error,
  } = useClient();
  return (
    <div>
      <span data-testid="clientsValue">{clients?.length}</span>
      <span data-testid="selectedClientValue">{selectedClient?.id}</span>
      <span data-testid="isLoadingValue">{isLoading.toString()}</span>
      <span data-testid="errorValue">{error}</span>
      <button onClick={getClients}>Get Clients</button>
      <button
        onClick={async () => {
          const client = await getClientById("1");
          setSelectedClient(client);
        }}
      >
        Get Client By Id
      </button>
      <button onClick={() => setSelectedClient(clients?.[0] || null)}>
        Set Selected Client
      </button>
    </div>
  );
};

describe("ClientProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component without crashing", () => {
    render(
      <ClientProvider>
        <TestComponent />
      </ClientProvider>,
    );
  });

  it("should get clients successfully", async () => {
    render(
      <ClientProvider>
        <TestComponent />
      </ClientProvider>,
    );

    const getClientsButton = screen.getByText("Get Clients");
    fireEvent.click(getClientsButton);

    const clientsValue = screen.getByTestId("clientsValue");
    await waitFor(() => expect(clientsValue).toHaveTextContent("3"));
  });

  it("should get client by id successfully", async () => {
    render(
      <ClientProvider>
        <TestComponent />
      </ClientProvider>,
    );

    const getClientByIdButton = screen.getByText("Get Client By Id");
    fireEvent.click(getClientByIdButton);

    const selectedClientValue = screen.getByTestId("selectedClientValue");
    await waitFor(() => expect(selectedClientValue).toHaveTextContent("1"));
  });

  it("should show loading state", async () => {
    jest.spyOn(ClientService, "getClientsService").mockImplementation(() => {
      return new Promise(() => {});
    });
    render(
      <ClientProvider>
        <TestComponent />
      </ClientProvider>,
    );

    const getClientsButton = screen.getByText("Get Clients");
    fireEvent.click(getClientsButton);

    const isLoadingValue = screen.getByTestId("isLoadingValue");
    await waitFor(() => expect(isLoadingValue).toHaveTextContent("true"));
  });
});
