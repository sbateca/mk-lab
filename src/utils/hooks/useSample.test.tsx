import {renderHook} from "@testing-library/react";

import {useSample} from "./useSample";
import {SampleContext} from "../../context";

const mockData = {
  samples: [],
  selectedSample: null,
  setSelectedSample: jest.fn(),
  getSamples: jest.fn(),
  getSampleById: jest.fn(),
  createSample: jest.fn(),
  editSample: jest.fn(),
  deleteSample: jest.fn(),
  isLoading: true,
  error: null,
};
jest.mock("../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

describe("useSample", () => {
  it("should return the context value when used inside SampleContext provider", () => {
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <SampleContext.Provider value={mockData}>
        {children}
      </SampleContext.Provider>
    );

    const {result} = renderHook(() => useSample(), {wrapper});

    expect(result.current).toEqual(mockData);
  });
});
