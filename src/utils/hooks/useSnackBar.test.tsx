import {renderHook} from "@testing-library/react";

import {SnackBarContext} from "../../context";
import {SnackBarSeverity} from "../enums";
import {useSnackBar} from "./useSnackBar";

jest.mock("../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

const mockData = {
  isSnackBarOpen: false,
  snackBarText: "",
  snackBarSeverity: SnackBarSeverity.SUCCESS,
  showSnackBarMessage: jest.fn(),
};

describe("useSnackBar", () => {
  it("should return the context value when used inside SnackBarContext provider", () => {
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <SnackBarContext.Provider value={mockData}>
        {children}
      </SnackBarContext.Provider>
    );

    const {result} = renderHook(() => useSnackBar(), {wrapper});

    expect(result.current).toEqual(mockData);
  });
});
