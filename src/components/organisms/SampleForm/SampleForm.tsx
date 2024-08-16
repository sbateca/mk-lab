import React from "react";

import {Box, FormControl, Grid, TextField} from "@mui/material";

import dayjs from "dayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";

import {
  SamplesFormFields,
  SharedButtonColors,
  SharedButtonSizes,
} from "../../../utils/enums";
import {
  SAMPLE_ANALYSIS_DATE_LABEL_TEXT,
  SAMPLE_CLIENT_LABEL_TEXT,
  SAMPLE_GET_SAMPLE_DATE_LABEL_TEXT,
  SAMPLE_RECEPTION_DATE_LABEL_TEXT,
  SAMPLE_RESPONSABLE_LABEL_TEXT,
  SAMPLE_CODE_LABEL_TEXT,
  SAMPLE_LOCATION_LABEL_TEXT,
  DATEPICKER_VIEWS,
} from "../../../utils/constants";
import {SampleFormProps} from "./Types";
import {SampleFormStyles} from "./SampleFormStyles";

export const SampleForm = ({
  form,
  formFieldsErrors,
  handleChange,
  handleDateChange,
  getTextFieldHelperText,
}: SampleFormProps): React.ReactElement => {
  const today = dayjs();
  return (
    <Box component="form" autoComplete="off" sx={SampleFormStyles.mainBox}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl>
            <TextField
              required
              error={!!formFieldsErrors[SamplesFormFields.SAMPLE_CODE]}
              label={SAMPLE_CODE_LABEL_TEXT}
              sx={SampleFormStyles.texfield}
              type="string"
              color={SharedButtonColors.PRIMARY}
              size={SharedButtonSizes.SMALL}
              name={SamplesFormFields.SAMPLE_CODE}
              onChange={handleChange}
              helperText={getTextFieldHelperText(SamplesFormFields.SAMPLE_CODE)}
              value={form?.sampleCode ?? ""}
            />
          </FormControl>
          <FormControl>
            <TextField
              required
              error={!!formFieldsErrors[SamplesFormFields.CLIENT]}
              label={SAMPLE_CLIENT_LABEL_TEXT}
              sx={SampleFormStyles.texfield}
              type="string"
              color={SharedButtonColors.PRIMARY}
              size={SharedButtonSizes.SMALL}
              onChange={handleChange}
              name={SamplesFormFields.CLIENT}
              helperText={getTextFieldHelperText(SamplesFormFields.CLIENT)}
              value={form.client ?? ""}
            />
          </FormControl>
          <FormControl>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={SampleFormStyles.datePicker}
                  disableFuture
                  defaultValue={today}
                  views={DATEPICKER_VIEWS}
                  label={SAMPLE_GET_SAMPLE_DATE_LABEL_TEXT}
                  name={SamplesFormFields.GET_SAMPLE_DATE}
                  onChange={(value) =>
                    handleDateChange(value, SamplesFormFields.GET_SAMPLE_DATE)
                  }
                  slotProps={{
                    textField: {
                      error:
                        !!formFieldsErrors[SamplesFormFields.GET_SAMPLE_DATE],
                      helperText: getTextFieldHelperText(
                        SamplesFormFields.GET_SAMPLE_DATE,
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
                  sx={SampleFormStyles.datePicker}
                  disableFuture
                  defaultValue={today}
                  views={DATEPICKER_VIEWS}
                  label={SAMPLE_RECEPTION_DATE_LABEL_TEXT}
                  name={SamplesFormFields.RECEPTION_DATE}
                  onChange={(value) =>
                    handleDateChange(value, SamplesFormFields.RECEPTION_DATE)
                  }
                  slotProps={{
                    textField: {
                      error:
                        !!formFieldsErrors[SamplesFormFields.RECEPTION_DATE],
                      helperText: getTextFieldHelperText(
                        SamplesFormFields.RECEPTION_DATE,
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
                  sx={SampleFormStyles.datePicker}
                  disableFuture
                  defaultValue={today}
                  views={DATEPICKER_VIEWS}
                  label={SAMPLE_ANALYSIS_DATE_LABEL_TEXT}
                  name={SamplesFormFields.ANALYSIS_DATE}
                  onChange={(value) =>
                    handleDateChange(value, SamplesFormFields.ANALYSIS_DATE)
                  }
                  slotProps={{
                    textField: {
                      error:
                        !!formFieldsErrors[SamplesFormFields.ANALYSIS_DATE],
                      helperText: getTextFieldHelperText(
                        SamplesFormFields.ANALYSIS_DATE,
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
              error={!!formFieldsErrors[SamplesFormFields.SAMPLE_LOCATION]}
              label={SAMPLE_LOCATION_LABEL_TEXT}
              sx={SampleFormStyles.texfield}
              type="string"
              color={SharedButtonColors.PRIMARY}
              size={SharedButtonSizes.SMALL}
              name={SamplesFormFields.SAMPLE_LOCATION}
              onChange={handleChange}
              helperText={getTextFieldHelperText(
                SamplesFormFields.SAMPLE_LOCATION,
              )}
              value={form.sampleLocation ?? ""}
            />
          </FormControl>
          <FormControl>
            <TextField
              required
              error={!!formFieldsErrors[SamplesFormFields.RESPONSABLE]}
              label={SAMPLE_RESPONSABLE_LABEL_TEXT}
              sx={SampleFormStyles.texfield}
              type="string"
              color={SharedButtonColors.PRIMARY}
              size={SharedButtonSizes.SMALL}
              name={SamplesFormFields.RESPONSABLE}
              onChange={handleChange}
              helperText={getTextFieldHelperText(SamplesFormFields.RESPONSABLE)}
              value={form.responsable ?? ""}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};
