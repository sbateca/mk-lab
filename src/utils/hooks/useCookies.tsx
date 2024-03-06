import { useContext } from "react"
import { CookiesContext } from "../../context/Cookie/CookieContext"

export const useCookies = () => {
    const context = useContext(CookiesContext);
    if (!context) {
        throw new Error("Cookies context should be used inside CookiesContext provider");
    }
    return context;
};
