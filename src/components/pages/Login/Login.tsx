import {useEffect} from "react";
import {useNavigate} from "react-router";

import {LoginTemplate} from "../../templates";

import {LOCAL_STORAGE_USER_KEY} from "../../../utils/constants";
import {localStorageContainsField} from "../../../utils/localStorage";

export const Login = (): React.ReactElement => {
  const navigate = useNavigate();

  useEffect(() => {
    const hasUserData = localStorageContainsField(LOCAL_STORAGE_USER_KEY);
    if (hasUserData) {
      navigate("/admin");
    }
  }, []);

  return <LoginTemplate />;
};
