import axios from "axios";

import {ISample} from "../Model/Sample";
import EnvManager from "../Config/envManager";

export const getSamplesService = async () => {
  try {
    const response = await axios.get<ISample[]>(
      `${EnvManager.BACKEND_URL}/samples`,
    );
    return response.data;
  } catch (error) {
    throw new Error("Error getting samples");
  }
};
