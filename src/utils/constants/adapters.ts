export const RESPONSE_DATA_NOT_VALID_ERROR = "Response data is not valid.";
export const getInvalidDataErrorMessage = (dataTypeName: string): string => {
  return `Invalid ${dataTypeName} data structure in response.`;
};
