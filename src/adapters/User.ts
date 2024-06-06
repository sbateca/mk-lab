import {Cookie} from "universal-cookie";

import {IUser} from "../Model/User";

export const cookieToUser = (cookies: Cookie): IUser | null => {
  const cookieData = cookies.get("userData");
  let user = null;
  if (cookieData) {
    user = cookieData[0];
    return user;
  }
  return user;
};
