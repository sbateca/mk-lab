export interface ChildrenProps {
    children: React.ReactNode;
}

export interface MenuContextType {
    menuOpen: boolean;
    selectedItem: string;
    setSelectedItem: (item: string) => void;
    toggleMenu: () => void;
}
