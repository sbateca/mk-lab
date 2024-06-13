import axios from "axios";

import EnvManager from "../Config/envManager";
import {Report} from "../Model/Report";
import {axiosResponseToReports} from "../Adapters/reports";

export const getReportsService = async (): Promise<Report[]> => {
  try {
    const response = await axios.get<Report[]>(
      `${EnvManager.BACKEND_URL}/reports`,
    );
    return axiosResponseToReports(response);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving reports: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred retrieving reports.");
    }
  }
};
