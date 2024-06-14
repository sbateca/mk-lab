import axios from "axios";

import EnvManager from "../config/EnvManager";
import {Report} from "../model/Report";
import {axiosResponseToReports} from "../adapters/reports";

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
