import {ChangeEvent} from "react";
import {FormProps} from "../../../utils/constants/form/formType";
import {Dayjs} from "dayjs";

export interface SampleFormProps {
  form: FormProps;
  formFieldsErrors: FormError;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (value: Dayjs | null, fieldName: string) => void;
  getTextFieldHelperText: (fieldName: string) => string;
}

export interface FormError {
  [key: string]: string[];
}

export interface FieldValidations {
  [key: string]: Array<(fieldValue?: string) => string>;
}
