import {ChangeEvent, useEffect, useState} from "react";
import {
  FieldValidations,
  FormError,
} from "../../components/organisms/SampleForm/Types";
import {FormProps} from "../constants/form/formType";
import {Dayjs} from "dayjs";
import {DATEPICKER_FORMAT} from "../constants/pages/shared";

export const useForm = () => {
  const [formFieldsErrors, setFormFieldsErrors] = useState<FormError>({});
  const [form, setForm] = useState<FormProps>({});
  const [isNotValidForm, setIsNotValidForm] = useState<boolean>(true);
  const [formFieldsValidationFunctions, setFormFieldsValidationFunctions] =
    useState<FieldValidations>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setForm((prevForm: FormProps) => {
      const updatedForm = {
        ...prevForm,
        [name]: value,
      };
      updateErrorsObject(name, value);
      checkNotValidForm(formFieldsErrors);
      return updatedForm;
    });
  };

  const handleDateChange = (value: Dayjs | null, fieldName: string) => {
    setForm((prevForm: FormProps) => {
      const updatedForm = {
        ...prevForm,
        [fieldName]: getDateValue(value),
      };
      updateErrorsObject(fieldName, getDateValue(value));
      checkNotValidForm(formFieldsErrors);
      return updatedForm;
    });
  };

  const getDateValue = (value: Dayjs | null): string => {
    if (value) {
      if (value?.isValid()) {
        return value.format(DATEPICKER_FORMAT);
      } else return value.toString();
    } else return "";
  };

  const updateErrorsObject = (fieldName: string, fieldValue: string) => {
    setFormFieldsErrors((prevErrors) => {
      const updatedErrors = {...prevErrors};
      const formFieldValidationFunctions =
        formFieldsValidationFunctions[fieldName];
      if (formFieldValidationFunctions) {
        const fieldErrors = formFieldValidationFunctions.map(
          (fieldValidationFunction) => fieldValidationFunction(fieldValue),
        );
        const filteredErrors = fieldErrors.filter((error) => error);
        if (filteredErrors.length > 0) {
          updatedErrors[fieldName] = filteredErrors;
        } else {
          delete updatedErrors[fieldName];
        }
      }
      return updatedErrors;
    });
  };

  const checkNotValidForm = (fieldErrors: FormError): boolean => {
    const emptyFields = Object.keys(formFieldsValidationFunctions).filter(
      (fieldName) => !form[fieldName],
    );
    return Object.keys(fieldErrors).length > 0 || emptyFields.length > 0;
  };

  const getTextFieldHelperText = (fieldName: string): string => {
    if (formFieldsErrors[fieldName]) {
      return formFieldsErrors[fieldName].join(" / ");
    }
    return "";
  };

  const cleanForm = (defaultFormVFieldValues: FormProps) => {
    setDefaultFormFieldsValues(defaultFormVFieldValues);
    setFormFieldsErrors({});
  };

  const setDefaultFormFieldsValues = (defaultValues: FormProps) => {
    Object.keys(defaultValues).forEach((value) => {
      setForm((prevForm: FormProps) => {
        const updatedForm = {
          ...prevForm,
          [value]: defaultValues[value],
        };
        checkNotValidForm(formFieldsErrors);
        return updatedForm;
      });
    });
  };

  useEffect(() => {
    setIsNotValidForm(checkNotValidForm(formFieldsErrors));
  }, [formFieldsErrors, formFieldsValidationFunctions]);

  return {
    form,
    setForm,
    cleanForm,
    formFieldsErrors,
    handleChange,
    handleDateChange,
    getTextFieldHelperText,
    setFormFieldsValidationFunctions,
    setDefaultFormFieldsValues,
    isNotValidForm,
  };
};
