import {createContext, useState} from "react";

import {ChildrenProps, MenuContextType} from "./Types";

export const MenuContext = createContext<MenuContextType>({
  menuOpen: false,
  selectedMenuItem: "",
  setSelectedMenuItem: () => {},
  toggleMenu: () => {},
});

export function MenuProvider({children}: ChildrenProps): React.ReactElement {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("");

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <MenuContext.Provider
      value={{
        menuOpen,
        toggleMenu,
        selectedMenuItem: selectedMenuItem,
        setSelectedMenuItem: setSelectedMenuItem,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}
