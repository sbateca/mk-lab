import {useEffect, useState} from "react";
import {Navigate} from "react-router";

import {LOCAL_STORAGE_USER_KEY} from "../../../Utils/Constants/pages/shared";
import {checkFieldInLocalStorage} from "../../../Utils/localStorage";
import LoginTemplate from "../../Templates/Login/Login";

function Login(): React.ReactElement {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const userData = checkFieldInLocalStorage(LOCAL_STORAGE_USER_KEY);
    if (userData) {
      setRedirect(true);
    }
  }, []);

  return redirect ? <Navigate to="/admin" /> : <LoginTemplate />;
}

export default Login;
