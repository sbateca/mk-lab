import {useContext} from "react";
import {SideSectionContext} from "../../context/SideSection/SideSectionContext";

export const useSideSection = () => {
  const context = useContext(SideSectionContext);
  if (!context) {
    throw new Error(
      "useSideSection should be used inside the SideSectionContext provider.",
    );
  }
  return context;
};
