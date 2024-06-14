import {AxiosResponse} from "axios";
import {Sample} from "../model/Sample";
import {
  RESPONSE_DATA_NOT_ARRAY_ERROR,
  getInvalidDataErrorMessage,
} from "../utils/constants/adapters";

export const axiosResponseToSamples = (
  response: AxiosResponse<unknown>,
): Sample[] => {
  if (Array.isArray(response.data)) {
    return response.data
      .map((sample: unknown) => {
        if (isValidSample(sample)) {
          return sample as Sample;
        } else {
          throw new Error(getInvalidDataErrorMessage("sample"));
        }
      })
      .filter((report): report is Sample => report !== null);
  } else {
    throw new Error(RESPONSE_DATA_NOT_ARRAY_ERROR);
  }
};

const isValidSample = (sample: unknown): sample is Sample => {
  if (typeof sample === "object" && sample !== null) {
    const sampleObj = sample as Record<string, unknown>;
    return (
      typeof sampleObj.id === "string" &&
      typeof sampleObj.sampleCode === "string" &&
      typeof sampleObj.client === "string" &&
      typeof sampleObj.getSampleDate === "string" &&
      typeof sampleObj.receptionDate === "string" &&
      typeof sampleObj.analysisDate === "string" &&
      typeof sampleObj.sampleLocation === "string" &&
      typeof sampleObj.responsable === "string"
    );
  }
  return false;
};
