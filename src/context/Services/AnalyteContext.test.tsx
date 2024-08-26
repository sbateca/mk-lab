import {fireEvent, render, waitFor, screen} from "@testing-library/react";
import {useAnalyte} from "../../utils/hooks";
import {AnalyteProvider} from "./AnalyteContext";

jest.mock("../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

jest.mock("../../services/analyteService", () => ({
  getAnalyteByIdService: jest.fn().mockResolvedValue({
    id: "1",
    name: "Analyte 1",
  }),
  getAnalytesService: jest.fn().mockResolvedValue([
    {id: "1", name: "Analyte 1"},
    {id: "2", name: "Analyte 2"},
    {id: "3", name: "Analyte 3"},
  ]),
}));

const TestComponent = () => {
  const {
    analytes,
    selectedAnalyte,
    setSelectedAnalyte,
    getAnalytes,
    getAnalyteById,
    isLoading,
    error,
  } = useAnalyte();
  return (
    <div>
      <span data-testid="analytesValue">{analytes?.length}</span>
      <span data-testid="selectedAnalyteValue">{selectedAnalyte?.id}</span>
      <span data-testid="isLoadingValue">{isLoading.toString()}</span>
      <span data-testid="errorValue">{error}</span>
      <button onClick={getAnalytes}>Get Analytes</button>
      <button
        onClick={async () => {
          const analyte = await getAnalyteById("1");
          setSelectedAnalyte(analyte);
        }}
      >
        Get Analyte By Id
      </button>
      <button onClick={() => setSelectedAnalyte(analytes?.[0] || null)}>
        Set Selected Analyte
      </button>
    </div>
  );
};

describe("AnalyteProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component without crashing", () => {
    render(
      <AnalyteProvider>
        <TestComponent />
      </AnalyteProvider>,
    );
  });

  it("should get all analytes successfully", async () => {
    render(
      <AnalyteProvider>
        <TestComponent />
      </AnalyteProvider>,
    );
    const getAnalytesButton = screen.getByText("Get Analytes");

    fireEvent.click(getAnalytesButton);
    const analytesValue = screen.getByTestId("analytesValue");

    await waitFor(() => expect(analytesValue).toHaveTextContent("3"));
  });

  it("should get an analyte by id successfully", async () => {
    const {getByTestId} = render(
      <AnalyteProvider>
        <TestComponent />
      </AnalyteProvider>,
    );
    const getAnalyteByIdButton = screen.getByText("Get Analyte By Id");

    fireEvent.click(getAnalyteByIdButton);

    await waitFor(() =>
      expect(getByTestId("selectedAnalyteValue")).toHaveTextContent("1"),
    );
  });

  it("should show loading state when fetching analytes", async () => {
    render(
      <AnalyteProvider>
        <TestComponent />
      </AnalyteProvider>,
    );
    const getAnalytesButton = screen.getByText("Get Analytes");

    fireEvent.click(getAnalytesButton);
    const isLoadingValue = screen.getByTestId("isLoadingValue");

    expect(isLoadingValue).toHaveTextContent("true");
  });
});
