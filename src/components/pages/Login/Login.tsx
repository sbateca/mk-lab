import {useEffect, useState} from "react";
import {Navigate} from "react-router";

import {checkFieldInCookies} from "../../../Utils/cookieData";
import {useCookies} from "../../../Utils/Hooks/useCookies";
import LoginTemplate from "../../Templates/LoginTemplate/LoginTemplate";

function LoginPage() {
  const cookies = useCookies();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const userData = checkFieldInCookies(cookies, "userData");
    if (userData) {
      setRedirect(true);
    }
  }, []);

  return redirect ? <Navigate to="/admin" /> : <LoginTemplate />;
}

export default LoginPage;
