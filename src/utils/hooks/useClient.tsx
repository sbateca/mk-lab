import {useContext} from "react";
import {ClientContext} from "../../context/Services/ClientContext";

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("client should be used inside the MenuSample provider.");
  }
  return context;
};
