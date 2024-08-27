import {renderHook} from "@testing-library/react";

import {SideSectionContext} from "../../context";
import {useSideSection} from "./useSideSection";

const mockData = {
  isSideSectionOpen: false,
  sideSectionTitle: "",
  setSideSectionTitle: () => {},
  setIsSideSectionOpen: () => {},
};

jest.mock("../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

describe("useSideSection", () => {
  it("should return the context value when used inside SideSectionContext provider", () => {
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <SideSectionContext.Provider value={mockData}>
        {children}
      </SideSectionContext.Provider>
    );

    const {result} = renderHook(() => useSideSection(), {wrapper});

    expect(result.current).toEqual(mockData);
  });
});
