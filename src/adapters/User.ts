import {Cookie} from "universal-cookie";

import {User} from "../Model/User";

export const cookiesToUser = (cookies: Cookie): User | null => {
  const cookieData = cookies.get("userData");
  let user = null;
  if (cookieData) {
    user = cookieData[0];
    return user;
  }
  return user;
};
