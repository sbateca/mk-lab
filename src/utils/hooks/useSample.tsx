import {useContext} from "react";

import {SampleContext} from "../../context/Services/SampleContext";

export const useSample = () => {
  const context = useContext(SampleContext);
  if (!context) {
    throw new Error("useMenu should be used inside the MenuContext provider.");
  }
  return context;
};
