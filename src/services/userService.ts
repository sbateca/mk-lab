import axios from "axios";

import EnvManager from "../Config/envManager";
import {User} from "../Model/User";

interface getUserProps {
  [key: string]: string;
}

export const getUserByUserNameAndPassword = async ({
  username,
  password,
}: getUserProps): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(
      `${EnvManager.BACKEND_URL}/users?username=${username}&password=${password}`,
    );
    return response.data;
  } catch (error) {
    throw new Error("Error retrieving user by username and password.");
  }
};
