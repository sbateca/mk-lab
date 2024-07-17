import {createContext, useEffect, useState, useMemo} from "react";
import {ChildrenProps, SideSectionContextType} from "./Types";

export const SideSectionContext = createContext<SideSectionContextType>({
  isSideSectionOpen: false,
  setIsSideSectionOpen: () => {},
});

export function SideSectionProvider({
  children,
}: ChildrenProps): React.ReactElement {
  const [isSideSectionOpen, setIsSideSectionOpen] = useState(false);

  useEffect(() => {
    setIsSideSectionOpen(isSideSectionOpen);
  }, [isSideSectionOpen]);

  const contextValue = useMemo(
    () => ({isSideSectionOpen, setIsSideSectionOpen}),
    [isSideSectionOpen, setIsSideSectionOpen],
  );

  return (
    <SideSectionContext.Provider value={contextValue}>
      {children}
    </SideSectionContext.Provider>
  );
}
