import {Box, FormControl, Grid, TextField} from "@mui/material";
import React from "react";

import dayjs from "dayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

import {SampleFormStyles} from "./SampleFormStyles";
import {
  SamplesFormFields,
  SharedButtonColors,
  SharedButtonSizes,
} from "../../../utils/enums";
import {
  ANALYSIS_DATE_LABEL_TEXT,
  CLIENT_LABEL_TEXT,
  GET_SAMPLE_DATE_LABEL_TEXT,
  RECEPTION_DATE_LABEL_TEXT,
  RESPONSABLE_LABEL_TEXT,
  SAMPLE_CODE_LABEL_TEXT,
  SAMPLE_LOCATION_LABEL_TEXT,
} from "../../../utils/constants/form/sample";
import {SampleFormProps} from "./Types";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {DATEPICKER_VIEWS} from "../../../utils/constants/pages/shared";

function SampleForm({
  form,
  formFieldsErrors,
  handleChange,
  handleDateChange,
  getTextFieldHelperText,
}: SampleFormProps): React.ReactElement {
  const today = dayjs();
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
              type="string"
              color={SharedButtonColors.Primary}
              size={SharedButtonSizes.Small}
              name={SamplesFormFields.SampleCode}
              onChange={handleChange}
              helperText={getTextFieldHelperText(SamplesFormFields.SampleCode)}
              value={form?.sampleCode ?? ""}
            />
          </FormControl>
          <FormControl>
            <TextField
              required
              error={!!formFieldsErrors[SamplesFormFields.Client]}
              label={CLIENT_LABEL_TEXT}
              sx={SampleFormStyles.texfield}
              type="string"
              color={SharedButtonColors.Primary}
              size={SharedButtonSizes.Small}
              onChange={handleChange}
              name={SamplesFormFields.Client}
              helperText={getTextFieldHelperText(SamplesFormFields.Client)}
              value={form.client ?? ""}
            />
          </FormControl>
          <FormControl>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disableFuture
                  defaultValue={today}
                  views={DATEPICKER_VIEWS}
                  label={GET_SAMPLE_DATE_LABEL_TEXT}
                  name={SamplesFormFields.GetSampleDate}
                  onChange={(value) =>
                    handleDateChange(value, SamplesFormFields.GetSampleDate)
                  }
                  slotProps={{
                    textField: {
                      error:
                        !!formFieldsErrors[SamplesFormFields.GetSampleDate],
                      helperText: getTextFieldHelperText(
                        SamplesFormFields.GetSampleDate,
                      ),
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>
          </FormControl>
          <FormControl>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disableFuture
                  defaultValue={today}
                  views={DATEPICKER_VIEWS}
                  label={RECEPTION_DATE_LABEL_TEXT}
                  name={SamplesFormFields.ReceptionDate}
                  onChange={(value) =>
                    handleDateChange(value, SamplesFormFields.ReceptionDate)
                  }
                  slotProps={{
                    textField: {
                      error:
                        !!formFieldsErrors[SamplesFormFields.ReceptionDate],
                      helperText: getTextFieldHelperText(
                        SamplesFormFields.ReceptionDate,
                      ),
                    },
                  }}
                  value={dayjs(form.receptionDate) ?? null}
                />
              </LocalizationProvider>
            </Box>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disableFuture
                  defaultValue={today}
                  views={DATEPICKER_VIEWS}
                  label={ANALYSIS_DATE_LABEL_TEXT}
                  name={SamplesFormFields.AnalysisDate}
                  onChange={(value) =>
                    handleDateChange(value, SamplesFormFields.AnalysisDate)
                  }
                  slotProps={{
                    textField: {
                      error: !!formFieldsErrors[SamplesFormFields.AnalysisDate],
                      helperText: getTextFieldHelperText(
                        SamplesFormFields.AnalysisDate,
                      ),
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>
          </FormControl>
          <FormControl>
            <TextField
              required
              error={!!formFieldsErrors[SamplesFormFields.SampleLocation]}
              label={SAMPLE_LOCATION_LABEL_TEXT}
              sx={SampleFormStyles.texfield}
              type="string"
              color={SharedButtonColors.Primary}
              size={SharedButtonSizes.Small}
              name={SamplesFormFields.SampleLocation}
              onChange={handleChange}
              helperText={getTextFieldHelperText(
                SamplesFormFields.SampleLocation,
              )}
              value={form.sampleLocation ?? ""}
            />
          </FormControl>
          <FormControl>
            <TextField
              required
              error={!!formFieldsErrors[SamplesFormFields.Responsable]}
              label={RESPONSABLE_LABEL_TEXT}
              sx={SampleFormStyles.texfield}
              type="string"
              color={SharedButtonColors.Primary}
              size={SharedButtonSizes.Small}
              name={SamplesFormFields.Responsable}
              onChange={handleChange}
              helperText={getTextFieldHelperText(SamplesFormFields.Responsable)}
              value={form.responsable ?? ""}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SampleForm;
