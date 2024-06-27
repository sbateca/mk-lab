import dayjs from "dayjs";

export const REQUIRED_FIELD_ERROR_TEXT = "This field is required.";
const FIELD_SHOULD_BE_NUMBER_TEXT = "This field should be a number.";
const INVALID_EMAIL_FORMAT_ERROR_TEXT = "Invalid email format.";
const INVALID_DATE_FORMAT_ERROR_TEXT = "Invalid date format.";

export const isEmpty = (fieldValue?: string): string => {
  return fieldValue === "" ? REQUIRED_FIELD_ERROR_TEXT : "";
};

export const isNotNumber = (fieldValue: string): string => {
  return fieldValue !== "" && isNaN(Number(fieldValue))
    ? FIELD_SHOULD_BE_NUMBER_TEXT
    : "";
};

export const isNotValidEmailFormat = (fieldValue?: string): string => {
  if (!fieldValue || fieldValue === "") {
    return INVALID_EMAIL_FORMAT_ERROR_TEXT;
  }
  return !/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(fieldValue)
    ? INVALID_EMAIL_FORMAT_ERROR_TEXT
    : "";
};

export const isNotValidDate = (fieldValue?: string): string => {
  return !dayjs(fieldValue).isValid() ? INVALID_DATE_FORMAT_ERROR_TEXT : "";
};
