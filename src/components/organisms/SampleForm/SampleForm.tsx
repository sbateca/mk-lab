import {Box, FormControl, Grid, TextField} from "@mui/material";
import React, {ChangeEvent, useEffect, useState} from "react";
import {FormProps} from "../../../utils/constants/form/formType";
import {SampleFormStyles} from "./SampleFormStyles";
import {
  isEmpty,
  isNotValidEmailFormat,
} from "../../../utils/constants/form/validations";
import {FieldValidations, FormError, SampleFormProps} from "./Types";
import {SamplesFormFields} from "../../../utils/enums";
import {
  ANALYSIS_DATE_LABEL_TEXT,
  CLIENT_LABEL_TEXT,
  GET_SAMPLE_DATE_LABEL_TEXT,
  RECEPTION_DATE_LABEL_TEXT,
  RESPONSABLE_LABEL_TEXT,
  SAMPLE_CODE_LABEL_TEXT,
} from "../../../utils/constants/form/sample";

function SampleForm({
  sampleForm,
  setSampleForm,
  setIsNotValidForm,
}: SampleFormProps): React.ReactElement {
  const [formFieldsErrors, setFormFieldsErrors] = useState<FormError>({});

  const fieldsValidationFunctions: FieldValidations = {
    sampleCode: [isEmpty, isNotValidEmailFormat],
    client: [isEmpty],
    getSampleDate: [isEmpty],
    receptionDate: [isEmpty],
    analysisDate: [isEmpty],
    sampleLocation: [isEmpty],
    responsable: [isEmpty],
  };

  useEffect(() => {
    setIsNotValidForm(checkNotValidForm(formFieldsErrors));
  }, [formFieldsErrors, setIsNotValidForm]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setSampleForm((prevForm: FormProps) => {
      const updatedForm = {
        ...prevForm,
        [name]: value,
      };
      updateErrorsObject(name, value);
      return updatedForm;
    });
  };

  const updateErrorsObject = (
    fieldName: string,
    fieldValue: string | undefined,
  ) => {
    setFormFieldsErrors((prevErrors) => {
      const updatedErrors = {...prevErrors};
      const fieldValidationFunctions = fieldsValidationFunctions[fieldName];
      if (fieldValidationFunctions) {
        const fieldErrors = fieldValidationFunctions.map(
          (fieldValidationFunction) =>
            fieldValidationFunction(fieldName, fieldValue),
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
    const emptyFields = Object.keys(fieldsValidationFunctions).filter(
      (fieldName) => !sampleForm[fieldName],
    );
    return Object.keys(fieldErrors).length > 0 || emptyFields.length > 0;
  };

  const textFieldHelperText = (fieldName: string): string => {
    if (formFieldsErrors[fieldName]) {
      return formFieldsErrors[fieldName].join(" / ");
    }
    return "";
  };

  return (
    <Box component="form" autoComplete="off" sx={SampleFormStyles.mainBox}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl>
            <TextField
              required
              error={!!formFieldsErrors[SamplesFormFields.SampleCode]}
              label={SAMPLE_CODE_LABEL_TEXT}
              sx={SampleFormStyles.texfield}
              type="text"
              color="primary"
              size="small"
              name={SamplesFormFields.SampleCode}
              onChange={handleChange}
              helperText={textFieldHelperText(SamplesFormFields.SampleCode)}
              value={sampleForm?.sampleCode ?? ""}
            />
          </FormControl>
          <FormControl>
            <TextField
              required
              error={!!formFieldsErrors[SamplesFormFields.Client]}
              label={CLIENT_LABEL_TEXT}
              sx={SampleFormStyles.texfield}
              type="string"
              color="primary"
              size="small"
              onChange={handleChange}
              name={SamplesFormFields.Client}
              helperText={textFieldHelperText(SamplesFormFields.Client)}
              value={sampleForm.client ?? ""}
            />
          </FormControl>
          <FormControl>
            <TextField
              required
              error={!!formFieldsErrors[SamplesFormFields.GetSampleDate]}
              label={GET_SAMPLE_DATE_LABEL_TEXT}
              sx={SampleFormStyles.texfield}
              type="string"
              color="primary"
              size="small"
              name={SamplesFormFields.GetSampleDate}
              onChange={handleChange}
              helperText={textFieldHelperText(SamplesFormFields.GetSampleDate)}
              value={sampleForm.getSampleDate ?? ""}
            />
          </FormControl>
          <FormControl>
            <TextField
              required
              error={!!formFieldsErrors[SamplesFormFields.ReceptionDate]}
              label={RECEPTION_DATE_LABEL_TEXT}
              sx={SampleFormStyles.texfield}
              type="string"
              color="primary"
              size="small"
              name={SamplesFormFields.ReceptionDate}
              onChange={handleChange}
              helperText={textFieldHelperText(SamplesFormFields.ReceptionDate)}
              value={sampleForm.receptionDate ?? ""}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl>
            <TextField
              required
              error={!!formFieldsErrors[SamplesFormFields.AnalysisDate]}
              label={ANALYSIS_DATE_LABEL_TEXT}
              sx={SampleFormStyles.texfield}
              type="string"
              color="primary"
              size="small"
              name={SamplesFormFields.AnalysisDate}
              onChange={handleChange}
              helperText={textFieldHelperText(SamplesFormFields.AnalysisDate)}
              value={sampleForm.analysisDate ?? ""}
            />
          </FormControl>
          <FormControl>
            <TextField
              required
              error={!!formFieldsErrors[SamplesFormFields.SampleLocation]}
              label={ANALYSIS_DATE_LABEL_TEXT}
              sx={SampleFormStyles.texfield}
              type="string"
              color="primary"
              size="small"
              name={SamplesFormFields.SampleLocation}
              onChange={handleChange}
              helperText={textFieldHelperText(SamplesFormFields.SampleLocation)}
              value={sampleForm.sampleLocation ?? ""}
            />
          </FormControl>
          <FormControl>
            <TextField
              required
              error={!!formFieldsErrors[SamplesFormFields.Responsable]}
              label={RESPONSABLE_LABEL_TEXT}
              sx={SampleFormStyles.texfield}
              type="string"
              color="primary"
              size="small"
              name={SamplesFormFields.Responsable}
              onChange={handleChange}
              helperText={textFieldHelperText(SamplesFormFields.Responsable)}
              value={sampleForm.responsable ?? ""}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SampleForm;
