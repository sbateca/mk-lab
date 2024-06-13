import axios from "axios";

import {Sample} from "../Model/Sample";
import EnvManager from "../Config/envManager";
import {axiosResponseToSamples} from "../Adapters/samples";

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
