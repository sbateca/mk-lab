import {renderHook} from "@testing-library/react";

import {SampleTypeContext} from "../../context";
import {useSampleType} from "./useSampleType";

const mockData = {
  sampleTypes: [],
  selectedSampleType: null,
  setSelectedSampleType: jest.fn(),
  getSampleTypes: jest.fn(),
  getSampleTypeById: jest.fn(),
  isLoading: true,
  error: null,
};
jest.mock("../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

describe("useSampleType", () => {
  it("should return the context value when used inside SampleTypeContext provider", () => {
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <SampleTypeContext.Provider value={mockData}>
        {children}
      </SampleTypeContext.Provider>
    );

    const {result} = renderHook(() => useSampleType(), {wrapper});

    expect(result.current).toEqual(mockData);
  });
});
