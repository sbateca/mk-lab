import {useContext} from "react";

import {SampleContext} from "../../context/Services/SampleContext";

export const useSample = () => {
  const context = useContext(SampleContext);
  if (!context) {
    throw new Error("useSample should be used inside the MenuSample provider.");
  }
  return context;
};
