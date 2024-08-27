import {renderHook} from "@testing-library/react";
import {SharedMenuItems} from "../enums";
import {useMenu} from "./useMenu";
import {MenuContext} from "../../context";

const mockData = {
  menuOpen: false,
  selectedMenuItem: SharedMenuItems.SAMPLES,
  setSelectedMenuItem: jest.fn(),
  toggleMenu: jest.fn(),
};

jest.mock("../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

describe("useMenu", () => {
  it("should return the context value when used inside MenuContext provider", () => {
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <MenuContext.Provider value={mockData}>{children}</MenuContext.Provider>
    );

    const {result} = renderHook(() => useMenu(), {wrapper});

    expect(result.current).toEqual(mockData);
  });
});
