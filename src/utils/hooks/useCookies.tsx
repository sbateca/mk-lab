import {useContext} from "react";

import {CookiesContext} from "../../Context/Cookie/CookieContext";

export const useCookies = () => {
  const context = useContext(CookiesContext);
  if (!context) {
    throw new Error(
      "useCookies should be used inside the CookiesContext provider.",
    );
  }
  return context;
};
