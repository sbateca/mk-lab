import {useContext} from "react";
import {CriteriaContext} from "../../context/Services/CriteriaContext";

export const useCriteria = () => {
  const context = useContext(CriteriaContext);
  if (!context) {
    throw new Error("criteria should be used inside the MenuSample provider.");
  }
  return context;
};
