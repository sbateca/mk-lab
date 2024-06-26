import {useEffect, useState} from "react";
import {Navigate} from "react-router";

import {LOCAL_STORAGE_USER_KEY} from "../../../utils/constants/pages/shared";
import {localStorageContainsField} from "../../../utils/localStorage";
import LoginTemplate from "../../templates/Login/Login";

function Login(): React.ReactElement {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const hasUserData = localStorageContainsField(LOCAL_STORAGE_USER_KEY);
    if (hasUserData) {
      setRedirect(true);
    }
  }, []);

  return redirect ? <Navigate to="/admin" /> : <LoginTemplate />;
}

export default Login;
