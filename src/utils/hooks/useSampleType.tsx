import {useContext} from "react";
import {SampleTypeContext} from "../../context/Services/SampleTypeContext";

export const useSampleType = () => {
  const context = useContext(SampleTypeContext);
  if (!context) {
    throw new Error(
      "useSampleType should be used inside the MenuSample provider.",
    );
  }
  return context;
};
