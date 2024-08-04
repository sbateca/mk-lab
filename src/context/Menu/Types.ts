import {SharedMenuItems} from "../../utils/enums";

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface MenuContextType {
  menuOpen: boolean;
  selectedMenuItem: SharedMenuItems;
  setSelectedMenuItem: (item: SharedMenuItems) => void;
  toggleMenu: () => void;
}
