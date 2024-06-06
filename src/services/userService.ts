import axios from "axios";

import EnvManager from "../config/envManager";
import {IUser} from "../model/user";

interface getUserProps {
  [key: string]: string;
}

export const getUserByUserNameAndPassword = async ({
  username,
  password,
}: getUserProps) => {
  try {
    const response = await axios.get<IUser[]>(
      `${EnvManager.BACKEND_URL}/users?username=${username}&password=${password}`,
    );
    return response.data;
  } catch (error) {
    throw new Error("Error getting user by username and password");
  }
};
