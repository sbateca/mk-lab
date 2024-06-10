import {useContext} from "react";

import {SampleContext} from "../../Context/Services/SampleContext";

export const useSample = () => {
  const context = useContext(SampleContext);
  if (!context) {
    throw new Error("useMenu should be used inside the MenuContext provider.");
  }
  return context;
};
