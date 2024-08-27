import {renderHook} from "@testing-library/react";
import {useClient} from "./useClient";
import {ClientContext} from "../../context";

const mockData = {
  clients: [],
  selectedClient: null,
  setSelectedClient: jest.fn(),
  getClients: jest.fn(),
  getClientById: jest.fn(),
  isLoading: true,
  error: null,
};
jest.mock("../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

describe("useClient", () => {
  it("should return the context value when used inside ClientContext provider", () => {
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <ClientContext.Provider value={mockData}>
        {children}
      </ClientContext.Provider>
    );

    const {result} = renderHook(() => useClient(), {wrapper});

    expect(result.current).toEqual(mockData);
  });
});
