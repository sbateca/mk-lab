import axios from "axios";

import EnvManager from "../Config/envManager";
import {Report} from "../Model/Report";

export const getReportsService = async (): Promise<Report[]> => {
  try {
    const response = await axios.get<Report[]>(
      `${EnvManager.BACKEND_URL}/reports`,
    );
    return response.data;
  } catch (error) {
    throw new Error("Error retrieving reports.");
  }
};
