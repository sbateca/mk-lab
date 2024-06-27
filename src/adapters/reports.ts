import {AxiosResponse} from "axios";
import {Report} from "../model/Report";
import {
  RESPONSE_DATA_NOT_VALID_ERROR,
  getInvalidDataErrorMessage,
} from "../utils/constants/adapters";

export const axiosResponseToReports = (
  response: AxiosResponse<unknown>,
): Report[] => {
  if (Array.isArray(response.data)) {
    return response.data
      .map((report: unknown) => {
        if (isValidReport(report)) {
          return report as Report;
        } else {
          throw new Error(getInvalidDataErrorMessage("report"));
        }
      })
      .filter((report): report is Report => report !== null);
  } else {
    throw new Error(RESPONSE_DATA_NOT_VALID_ERROR);
  }
};

const isValidReport = (report: unknown): report is Report => {
  if (typeof report === "object" && report !== null) {
    const reportObj = report as Record<string, unknown>;
    return (
      typeof reportObj.id === "string" &&
      typeof reportObj.reportDate === "string" &&
      typeof reportObj.sample === "object" &&
      typeof reportObj.analyte === "string" &&
      typeof reportObj.analysisMethod === "string" &&
      typeof reportObj.criteria === "string" &&
      typeof reportObj.result === "string"
    );
  }
  return false;
};
