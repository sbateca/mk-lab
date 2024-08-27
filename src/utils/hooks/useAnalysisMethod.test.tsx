import {renderHook} from "@testing-library/react";
import {AnalysisMethodContext} from "../../context/Services/AnalysisMethodContext";
import {useAnalysisMethod} from "./useAnalysisMethod";

const mockData = {
  analysisMethods: [
    {
      id: "1",
      name: "analysis method 1",
    },
    {
      id: "2",
      name: "analysis method 2",
    },
  ],
  selectedAnalysisMethod: {
    id: "1",
    name: "analysis method 1",
  },
  setSelectedAnalysisMethod: jest.fn(),
  getAnalysisMethods: jest.fn(),
  getAnalysisMethodById: jest.fn(),
  isLoading: false,
  error: null,
};

jest.mock("../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

describe("useAnalysisMethod", () => {
  it("should return the context value when used inside AnalysisMethodContext provider", () => {
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AnalysisMethodContext.Provider value={mockData}>
        {children}
      </AnalysisMethodContext.Provider>
    );

    const {result} = renderHook(() => useAnalysisMethod(), {wrapper});

    expect(result.current).toEqual(mockData);
  });
});
