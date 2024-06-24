const FIELD_SHOULD_BE_NUMBER_TEXT = "This field should be a number.";
const INVALID_EMAIL_FORMAT_ERROR_TEXT = "Invalid email format.";

export const getRequiredFieldText = (field: string) => {
  return `${field} is required.`;
};

export const isEmpty = (fieldName: string = "", fieldValue?: string) => {
  return fieldValue === "" ? getRequiredFieldText(fieldName) : "";
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const isNotNumber = (fieldValue: string) => {
  return fieldValue !== "" && isNaN(Number(fieldValue))
    ? FIELD_SHOULD_BE_NUMBER_TEXT
    : "";
};

export const isNotValidEmailFormat = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fieldName: string = "",
  fieldValue?: string,
) => {
  if (!fieldValue || fieldValue === "") {
    return INVALID_EMAIL_FORMAT_ERROR_TEXT;
  }
  return !/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(fieldValue)
    ? INVALID_EMAIL_FORMAT_ERROR_TEXT
    : "";
};
