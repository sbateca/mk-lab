import axios from "axios";

import EnvManager from "../Config/envManager";
import {IReport} from "../Model/Report";

export const getReportsService = async () => {
  try {
    const response = await axios.get<IReport[]>(
      `${EnvManager.BACKEND_URL}/reports`,
    );
    return response.data;
  } catch (error) {
    throw new Error("Error getting reports");
  }
};
