export interface ChildrenProps {
  children: React.ReactNode;
}

export interface MenuContextType {
  menuOpen: boolean;
  selectedMenuItem: string;
  setSelectedMenuItem: (item: string) => void;
  toggleMenu: () => void;
}
