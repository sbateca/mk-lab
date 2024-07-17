import {useContext} from "react";
import {SnackBarContext} from "../../context/SnackBar/SnackBarContext";

export const useSnackBar = () => {
  return useContext(SnackBarContext);
};
