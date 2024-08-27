import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {useAnalysisMethod} from "../../utils/hooks";
import {AnalysisMethodProvider} from "./AnalysisMethodContext";

jest.mock("../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

jest.mock("../../services/analysisMethodService", () => ({
  getAnalysisMethodByIdService: jest.fn().mockResolvedValue({
    id: "1",
    name: "Analysis Method 1",
  }),
  getAnalysisMethodService: jest.fn().mockResolvedValue([
    {id: "1", name: "Analysis Method 1"},
    {id: "2", name: "Analysis Method 2"},
    {id: "3", name: "Analysis Method 3"},
  ]),
}));

const TestComponent = () => {
  const {
    analysisMethods,
    selectedAnalysisMethod,
    setSelectedAnalysisMethod,
    getAnalysisMethods,
    getAnalysisMethodById,
    isLoading,
    error,
  } = useAnalysisMethod();
  return (
    <div>
      <span data-testid="analysisMethodsValue">{analysisMethods?.length}</span>
      <span data-testid="selectedAnalysisMethodValue">
        {selectedAnalysisMethod?.id}
      </span>
      <span data-testid="isLoadingValue">{isLoading.toString()}</span>
      <span data-testid="errorValue">{error}</span>
      <button onClick={getAnalysisMethods}>Get Analysis Methods</button>
      <button
        onClick={async () => {
          const analysisMethod = await getAnalysisMethodById("1");
          setSelectedAnalysisMethod(analysisMethod);
        }}
      >
        Get Analysis Method By Id
      </button>
      <button
        onClick={() => setSelectedAnalysisMethod(analysisMethods?.[0] || null)}
      >
        Set Selected Analysis Method
      </button>
    </div>
  );
};

describe("AnalysisMethodProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render children", async () => {
    render(
      <AnalysisMethodProvider>
        <TestComponent />
      </AnalysisMethodProvider>,
    );

    const childComponent = screen.getByText("Get Analysis Methods");
    expect(childComponent).toBeInTheDocument();
  });

  it("should get analysis methods when getAnalysisMethods is called", async () => {
    render(
      <AnalysisMethodProvider>
        <TestComponent />
      </AnalysisMethodProvider>,
    );

    const getAnalysisMethodsButton = screen.getByText("Get Analysis Methods");
    const analysisMethodsValue = screen.getByTestId("analysisMethodsValue");

    expect(analysisMethodsValue).toHaveTextContent("");
    fireEvent.click(getAnalysisMethodsButton);
    await waitFor(() => {
      expect(analysisMethodsValue).toHaveTextContent("3");
    });
  });

  it("should get analysis method by id when getAnalysisMethodById is called", async () => {
    render(
      <AnalysisMethodProvider>
        <TestComponent />
      </AnalysisMethodProvider>,
    );

    const getAnalysisMethodByIdButton = screen.getByText(
      "Get Analysis Method By Id",
    );
    let selectedAnalysisMethodValue = screen.getByTestId(
      "selectedAnalysisMethodValue",
    );

    expect(selectedAnalysisMethodValue).toHaveTextContent("");
    fireEvent.click(getAnalysisMethodByIdButton);
    selectedAnalysisMethodValue = screen.getByTestId(
      "selectedAnalysisMethodValue",
    );
    await waitFor(() => {
      expect(selectedAnalysisMethodValue).toHaveTextContent("1");
    });
  });

  it("should set selected analysis method when setSelectedAnalysisMethod is called", async () => {
    render(
      <AnalysisMethodProvider>
        <TestComponent />
      </AnalysisMethodProvider>,
    );

    const getAnalysisMethodsButton = screen.getByText("Get Analysis Methods");
    const setSelectedAnalysisMethodButton = screen.getByText(
      "Set Selected Analysis Method",
    );
    const selectedAnalysisMethodValue = screen.getByTestId(
      "selectedAnalysisMethodValue",
    );

    fireEvent.click(getAnalysisMethodsButton);
    await waitFor(() => {
      expect(screen.getByTestId("analysisMethodsValue")).toHaveTextContent("3");
    });

    expect(selectedAnalysisMethodValue).toHaveTextContent("");
    fireEvent.click(setSelectedAnalysisMethodButton);
    await waitFor(() => {
      expect(selectedAnalysisMethodValue).toHaveTextContent("1");
    });
  });

  it("should update isLoading state when getAnalysisMethods is called", async () => {
    render(
      <AnalysisMethodProvider>
        <TestComponent />
      </AnalysisMethodProvider>,
    );

    const getAnalysisMethodsButton = screen.getByText("Get Analysis Methods");
    const isLoadingValue = screen.getByTestId("isLoadingValue");

    expect(isLoadingValue).toHaveTextContent("true");
    fireEvent.click(getAnalysisMethodsButton);
    await waitFor(() => {
      expect(isLoadingValue).toHaveTextContent("false");
    });
  });
});
