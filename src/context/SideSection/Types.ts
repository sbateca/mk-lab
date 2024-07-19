export interface SideSectionContextType {
  isSideSectionOpen: boolean;
  sideSectionTitle: string;
  setSideSectionTitle: React.Dispatch<React.SetStateAction<string>>;
  setIsSideSectionOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ChildrenProps {
  children: React.ReactNode;
}
