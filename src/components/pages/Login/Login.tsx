import {useEffect, useState} from "react";
import {Navigate} from "react-router";

import {LoginTemplate} from "../../templates";

import {LOCAL_STORAGE_USER_KEY} from "../../../utils/constants";
import {localStorageContainsField} from "../../../utils/localStorage";

export const Login = (): React.ReactElement => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const hasUserData = localStorageContainsField(LOCAL_STORAGE_USER_KEY);
    if (hasUserData) {
      setRedirect(true);
    }
  }, []);

  return redirect ? <Navigate to="/admin" /> : <LoginTemplate />;
};
