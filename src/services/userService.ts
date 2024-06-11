import axios from "axios";

import EnvManager from "../Config/envManager";
import {User} from "../Model/User";

interface getUserProps {
  [key: string]: string;
}

export const getUserByUserName = async ({
  username,
}: getUserProps): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(
      `${EnvManager.BACKEND_URL}/users?username=${username}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error retrieving user by username ${username}.`);
  }
};
