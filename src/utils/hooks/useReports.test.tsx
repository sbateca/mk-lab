import {renderHook} from "@testing-library/react";

import {ReportsContext} from "../../context";
import {useReports} from "./useReports";

const mockData = {
  reports: [],
  selectedReport: null,
  setSelectedReport: jest.fn(),
  getReports: jest.fn(),
  getReportById: jest.fn(),
  createReport: jest.fn(),
  editReport: jest.fn(),
  deleteReport: jest.fn(),
  isLoading: true,
  error: null,
};
jest.mock("../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

describe("useReports", () => {
  it("should return the context value when used inside ReportsContext provider", () => {
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <ReportsContext.Provider value={mockData}>
        {children}
      </ReportsContext.Provider>
    );

    const {result} = renderHook(() => useReports(), {wrapper});

    expect(result.current).toEqual(mockData);
  });
});
