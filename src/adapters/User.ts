import {User} from "../Model/User";

export const localStorageToUser = (userData: string | null): User | null => {
  if (userData !== null) {
    const user: User = JSON.parse(userData);
    return user;
  }
  return null;
};
