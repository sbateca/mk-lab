import {FormProps} from "../../../utils/constants/form/formType";

export interface SampleFormProps {
  sampleForm: FormProps;
  setSampleForm: React.Dispatch<React.SetStateAction<FormProps>>;
  setIsNotValidForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FormError {
  [key: string]: string[];
}

export interface FieldValidations {
  [key: string]: Array<(fieldName?: string, fieldValue?: string) => string>;
}
