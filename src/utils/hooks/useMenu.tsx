import {useContext} from "react";
import {MenuContext} from "../../Context/Menu/MenuContext";

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu should be used inside MenuContext provider");
  }
  return context;
};
