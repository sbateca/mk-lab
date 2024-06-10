import axios from "axios";

import {Sample} from "../Model/Sample";
import EnvManager from "../Config/envManager";

export const getSamplesService = async (): Promise<Sample[]> => {
  try {
    const response = await axios.get<Sample[]>(
      `${EnvManager.BACKEND_URL}/samples`,
    );
    return response.data;
  } catch (error) {
    throw new Error("Error retrieving samples.");
  }
};
