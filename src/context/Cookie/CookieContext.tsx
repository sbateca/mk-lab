import React, {createContext, useState} from "react";
import Cookies from "universal-cookie";

import {CookiesProviderProps} from "./Types";

const CookiesContext = createContext<Cookies | null>(null);

function CookiesProvider({children}: CookiesProviderProps): React.ReactElement {
  const [cookies] = useState<Cookies | null>(new Cookies());
  return (
    <CookiesContext.Provider value={cookies}>
      {children}
    </CookiesContext.Provider>
  );
}

export {CookiesContext, CookiesProvider};
