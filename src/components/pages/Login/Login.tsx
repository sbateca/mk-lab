import {useEffect, useState} from "react";
import {Navigate} from "react-router";

import {LOCAL_STORAGE_USER_KEY} from "../../../Utils/Constants/pages/shared";
import {localStorageContainsField} from "../../../Utils/localStorage";
import LoginTemplate from "../../Templates/Login/Login";

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
