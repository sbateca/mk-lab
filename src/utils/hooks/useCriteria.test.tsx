import {renderHook} from "@testing-library/react";
import {CriteriaContext} from "../../context";
import {useCriteria} from "./useCriteria";

const mockData = {
  criterias: [],
  selectedCriteria: null,
  setSelectedCriteria: jest.fn(),
  getCriterias: jest.fn(),
  getCriteriaById: jest.fn(),
  isLoading: true,
  error: null,
};
jest.mock("../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

describe("useCriteria", () => {
  it("should return the context value when used inside CriteriaContext provider", () => {
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <CriteriaContext.Provider value={mockData}>
        {children}
      </CriteriaContext.Provider>
    );

    const {result} = renderHook(() => useCriteria(), {wrapper});

    expect(result.current).toEqual(mockData);
  });
});
