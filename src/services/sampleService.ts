import axios from "axios";

import {Sample} from "../model/Sample";
import EnvManager from "../config/EnvManager";
import {axiosResponseToSamples} from "../adapters/samples";

export const getSamplesService = async (): Promise<Sample[]> => {
  try {
    const response = await axios.get<Sample[]>(
      `${EnvManager.BACKEND_URL}/samples`,
    );
    return axiosResponseToSamples(response);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving samples: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred retrieving samples.");
    }
  }
};
