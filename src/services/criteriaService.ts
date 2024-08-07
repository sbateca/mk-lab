import axios from "axios";

import EnvManager from "../config/EnvManager";
import {axiosResponseToCriteria} from "../adapters/criteria";
import {Criteria, Sample} from "../model";

export const getCriteriasService = async (): Promise<Criteria[]> => {
  try {
    const response = await axios.get<Criteria[]>(
      `${EnvManager.BACKEND_URL}/criterias`,
    );
    return axiosResponseToCriteria(response);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving criterias: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred retrieving criterias.");
    }
  }
};

export const getCriteriaByIdService = async (id: string): Promise<Criteria> => {
  try {
    const response = await axios.get<Sample>(
      `${EnvManager.BACKEND_URL}/criterias/${id}`,
    );
    return axiosResponseToCriteria(response)[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving criteria by id: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred retrieving criterias.");
    }
  }
};
