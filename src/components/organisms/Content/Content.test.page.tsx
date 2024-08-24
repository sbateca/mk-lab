import {render, screen} from "@testing-library/react";

import {MenuProvider} from "../../../context";
import {Content} from "./Content";
import * as useMenuModule from "../../../utils/hooks/useMenu";
import {SharedMenuItems} from "../../../utils/enums";

jest.mock("../../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://example.com/api",
  },
}));
jest.mock("../../organisms/SamplesContent/SamplesContent", () => ({
  SamplesContent: () => <div data-testid="samples-content" />,
}));
jest.mock("../../organisms/ReportsContent/ReportsContent", () => ({
  ReportsContent: () => <div data-testid="reports-content" />,
}));
export const updateUseMenu = (selectedMenuItem: string) => {
  jest.spyOn(useMenuModule, "useMenu").mockReturnValue({
    menuOpen: true,
    selectedMenuItem: selectedMenuItem as SharedMenuItems,
    setSelectedMenuItem: jest.fn(),
    toggleMenu: jest.fn(),
  });
};

export const renderContent = async () => {
  render(
    <MenuProvider>
      <Content />
    </MenuProvider>,
  );
  return {
    screen,
  };
};
