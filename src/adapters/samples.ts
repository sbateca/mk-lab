import {AxiosResponse} from "axios";
import {v4 as uuidv4} from "uuid";
import {Sample} from "../model/Sample";
import {
  RESPONSE_DATA_NOT_VALID_ERROR,
  getInvalidDataErrorMessage,
} from "../utils/constants/adapters";

export const axiosResponseToSamples = (
  response: AxiosResponse<unknown>,
): Sample[] => {
  return getSamplesArrayFromData(response.data);
};

const getSamplesArrayFromData = (data: unknown): Sample[] => {
  if (data instanceof Array) {
    return data
      .map((sample: unknown) => {
        if (isValidSample(sample)) {
          return sample as Sample;
        } else {
          throw new Error(getInvalidDataErrorMessage("sample"));
        }
      })
      .filter((sample): sample is Sample => sample !== null);
  } else if (data instanceof Object) {
    return [data as Sample];
  } else {
    throw new Error(RESPONSE_DATA_NOT_VALID_ERROR);
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

export const sampleFormToSample = (form: Record<string, unknown>): Sample => {
  return {
    id: uuidv4() as string,
    sampleCode: form.sampleCode as string,
    client: form.client as string,
    getSampleDate: form.getSampleDate as string,
    receptionDate: form.receptionDate as string,
    analysisDate: form.analysisDate as string,
    sampleLocation: form.sampleLocation as string,
    responsable: form.responsable as string,
  };
};
