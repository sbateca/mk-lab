import { createContext, useState } from "react"

import { ChildrenProps, MenuContextType } from "./Types"

export const MenuContext = createContext<MenuContextType>({
  menuOpen: false,
  selectedItem: "",
  setSelectedItem: () => {},
  toggleMenu: () => {},
});

export function MenuProvider({ children }: ChildrenProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <MenuContext.Provider value={{
      menuOpen,
      toggleMenu,
      selectedItem,
      setSelectedItem
    }}>
      {children}
    </MenuContext.Provider>
  );
}
