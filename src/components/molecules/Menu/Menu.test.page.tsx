import {render, screen} from "@testing-library/react";

import {MenuProvider} from "../../../context";
import {Menu} from "../Menu/Menu";
import {SharedMenuItems} from "../../../utils/enums";
import {MenuProps} from "../Menu/Types";
import * as useMenuModule from "../../../utils/hooks/useMenu";

export const mockMenuItems: MenuProps = {
  menuItems: [
    {
      label: SharedMenuItems.REPORTS,
    },
    {
      label: SharedMenuItems.SAMPLES,
    },
  ],
};
jest.mock("../../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://example.com/api",
  },
}));
export const updateUseMenu = (menuOpen: boolean) => {
  jest.spyOn(useMenuModule, "useMenu").mockReturnValue({
    menuOpen,
    selectedMenuItem: SharedMenuItems.REPORTS,
    setSelectedMenuItem: jest.fn(),
    toggleMenu: jest.fn(),
  });
};

export const renderMenu = async () => {
  render(
    <MenuProvider>
      <Menu {...mockMenuItems} />
    </MenuProvider>,
  );
  return {
    mainMenu: await screen.queryByText("Reports"),
    screen,
  };
};
