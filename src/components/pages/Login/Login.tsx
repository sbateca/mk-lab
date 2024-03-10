
import { useEffect, useState } from "react"
import { Navigate } from "react-router"

import { checkFieldInCookies } from "../../../utils/cookieData"
import { useCookies } from "../../../utils/hooks/useCookies"
import LoginTemplate from "../../templates/loginTemplate/LoginTemplate"

function LoginPage(){
    const cookies = useCookies();
    const [redirect, setRedirect] = useState(false);
    
    useEffect(() => {
        const userData = checkFieldInCookies(cookies, "userData");
        if (userData) {
            setRedirect(true);
        }
    }, []);

    return (
        redirect ? (
            <Navigate to="/admin" />
        ) :
        <LoginTemplate />
    )
}

export default LoginPage;
