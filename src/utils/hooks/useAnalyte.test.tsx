import {renderHook} from "@testing-library/react";
import {AnalyteContext} from "../../context";
import {useAnalyte} from "./useAnalyte";

const mockData = {
  analytes: [],
  selectedAnalyte: null,
  setSelectedAnalyte: jest.fn(),
  getAnalytes: jest.fn(),
  getAnalyteById: jest.fn(),
  isLoading: false,
  error: null,
};
jest.mock("../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

describe("useAnalyte", () => {
  it("should return the context value when used inside AnalyteContext provider", () => {
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AnalyteContext.Provider value={mockData}>
        {children}
      </AnalyteContext.Provider>
    );

    const {result} = renderHook(() => useAnalyte(), {wrapper});

    expect(result.current).toEqual(mockData);
  });
});
