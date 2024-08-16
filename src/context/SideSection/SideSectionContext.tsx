import {createContext, useEffect, useState, useMemo} from "react";

import {ChildrenProps, SideSectionContextType} from "./Types";

export const SideSectionContext = createContext<SideSectionContextType>({
  isSideSectionOpen: false,
  sideSectionTitle: "",
  setSideSectionTitle: () => {},
  setIsSideSectionOpen: () => {},
});

export function SideSectionProvider({
  children,
}: ChildrenProps): React.ReactElement {
  const [isSideSectionOpen, setIsSideSectionOpen] = useState(false);
  const [sideSectionTitle, setSideSectionTitle] = useState("");

  useEffect(() => {
    setIsSideSectionOpen(isSideSectionOpen);
  }, [isSideSectionOpen]);

  const contextValue = useMemo(
    () => ({
      isSideSectionOpen,
      sideSectionTitle,
      setSideSectionTitle,
      setIsSideSectionOpen,
    }),
    [
      isSideSectionOpen,
      setIsSideSectionOpen,
      sideSectionTitle,
      setSideSectionTitle,
    ],
  );

  return (
    <SideSectionContext.Provider value={contextValue}>
      {children}
    </SideSectionContext.Provider>
  );
}
