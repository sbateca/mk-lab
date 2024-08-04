import {createContext, useState, useMemo} from "react";

import {ChildrenProps, MenuContextType} from "./Types";
import {SharedMenuItems} from "../../utils/enums";

export const MenuContext = createContext<MenuContextType>({
  menuOpen: false,
  selectedMenuItem: SharedMenuItems.SAMPLES,
  setSelectedMenuItem: () => {},
  toggleMenu: () => {},
});

export function MenuProvider({children}: ChildrenProps): React.ReactElement {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    SharedMenuItems.SAMPLES,
  );

  const toggleMenu = useMemo(() => {
    return () => {
      setMenuOpen((prev) => !prev);
    };
  }, [setMenuOpen]);

  const contextValue = useMemo(
    () => ({
      menuOpen,
      toggleMenu,
      selectedMenuItem,
      setSelectedMenuItem,
    }),
    [menuOpen, toggleMenu, selectedMenuItem, setSelectedMenuItem],
  );

  return (
    <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
  );
}
