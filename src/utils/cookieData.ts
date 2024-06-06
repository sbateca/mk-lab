import Cookies from "universal-cookie";

export const checkFieldInCookies = (
  cookies: Cookies,
  fieldName: string,
): boolean => {
  const userData = cookies.get(fieldName);
  return userData === undefined ? false : true;
};
