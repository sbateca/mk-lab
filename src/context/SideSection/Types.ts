export interface SideSectionContextType {
  isSideSectionOpen: boolean;
  setIsSideSectionOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ChildrenProps {
  children: React.ReactNode;
}
