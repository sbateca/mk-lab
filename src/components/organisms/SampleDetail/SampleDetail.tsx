import React, {useEffect} from "react";
import {
  Box,
  Chip,
  Divider,
  Stack,
  TextField,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import {SampleDetailStyles} from "./SampleDetailStyles";
import Typography from "../../atoms/Typography/Typography";
import {
  BoxContainerProps,
  SampleDetailProps,
  StackContainerProps,
  StackFieldProps,
  StackRowDirectionSpacingPropsProps,
} from "./Types";
import {
  ReportFormFields,
  SamplesFormFields,
  SelectVariants,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
  SharedChipColors,
  SharedChipSizes,
  SharedTextFieldVariants,
  SharedTypographyAlign,
  SharedTypographyColors,
  SharedTypographyVariants,
  SnackBarSeverity,
} from "../../../utils/enums";
import {
  SAMPLE_SUCCESSFULLY_CREATED_TEXT,
  SAMPLE_SUCCESSFULLY_UPDATED_TEXT,
} from "../../../utils/constants/pages/samples";
import {
  SAMPLE_ANALYSIS_DATE_LABEL_TEXT,
  SAMPLE_CLIENT_LABEL_TEXT,
  SAMPLE_GET_SAMPLE_DATE_LABEL_TEXT,
  SAMPLE_RECEPTION_DATE_LABEL_TEXT,
  SAMPLE_RESPONSABLE_LABEL_TEXT,
  SAMPLE_CODE_LABEL_TEXT,
  SAMPLE_LOCATION_LABEL_TEXT,
  SAMPLE_TYPE_LABEL_TEXT,
} from "../../../utils/constants/form/formLabel";
import {SampleFormStyles} from "../SampleForm/SampleFormStyles";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {
  DATEPICKER_FORMAT,
  DATEPICKER_VIEWS,
} from "../../../utils/constants/pages/shared";
import {useSample} from "../../../utils/hooks/useSample";
import {useForm} from "../../../utils/hooks/useForm";
import {useSnackBar} from "../../../utils/hooks/useSnackBar";
import {
  sampleFormToSample,
  sampleToSampleForm,
} from "../../../adapters/samples";
import Button from "../../atoms/Button/Button";
import {
  isEmpty,
  isNotValidDate,
} from "../../../utils/constants/form/validations";
import {FormProps} from "../../../utils/constants/form/formType";
import SampleSideSectionButtons from "./SampleSideSectionActions";
import {useSideSection} from "../../../utils/hooks/useSideSection";
import {SxProps} from "@mui/system";
import AutoComplete from "../../molecules/AutoComplete/AutoComplete";
import {AutoCompleteOption} from "../../molecules/AutoComplete/types";
import {useSampleType} from "../../../utils/hooks/useSampleType";
import {useClient} from "../../../utils/hooks/useClient";

function SampleDetail({
  isReadOnlyMode,
  setIsReadOnlyMode,
}: SampleDetailProps): React.ReactElement {
  const today = dayjs();
  const theme = useTheme<Theme>();
  const isLessThanMediumScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const defaultFormValue: FormProps = {
    sampleCode: "",
    sampleType: "",
    client: "",
    getSampleDate: today.format(DATEPICKER_FORMAT),
    receptionDate: today.format(DATEPICKER_FORMAT),
    analysisDate: today.format(DATEPICKER_FORMAT),
    sampleLocation: "",
    responsable: "",
  };

  const {
    getSamples,
    createSample,
    editSample,
    selectedSample,
    isLoading,
    error,
  } = useSample();
  const {clients} = useClient();
  const {sampleTypes} = useSampleType();
  const {setIsSideSectionOpen, sideSectionTitle} = useSideSection();
  const {
    isNotValidForm,
    form,
    setForm,
    formFieldsErrors,
    handleChange,
    handleDateChange,
    handleAutoCompleteChange,
    getTextFieldHelperText,
    setFormFieldsValidationFunctions,
    cleanForm,
  } = useForm();
  const {showSnackBarMessage} = useSnackBar();

  const handleCloseSideSection = () => {
    if (setIsSideSectionOpen) {
      setIsSideSectionOpen(false);
      setIsReadOnlyMode(true);
    }
  };

  const handleCreateReport = async () => {
    const newSample = await createSample(
      sampleFormToSample(form, selectedSample?.id ?? ""),
    );
    if (newSample !== null) {
      showSnackBarMessage(
        SAMPLE_SUCCESSFULLY_CREATED_TEXT,
        SnackBarSeverity.SUCCESS,
        getSamples,
      );
      handleCloseSideSection();
    }
  };

  const handleEdit = async () => {
    const parsedSample = sampleFormToSample(form, selectedSample?.id ?? "");
    const updatedSample = await editSample(selectedSample?.id, parsedSample);
    if (updatedSample !== null) {
      handleCloseSideSection();
      showSnackBarMessage(
        SAMPLE_SUCCESSFULLY_UPDATED_TEXT,
        SnackBarSeverity.SUCCESS,
        getSamples,
      );
    }
  };

  const getBoxContainerProps = (
    isLessThanMediumScreen: boolean,
  ): BoxContainerProps => {
    return {
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      width: isLessThanMediumScreen ? "80vw" : "60vw",
      height: "100%",
    };
  };

  const getStackContainerProps = (
    isLessThanMediumScreen: boolean,
  ): StackContainerProps => {
    return {
      spacing: 2,
      marginTop: "20px",
      padding: isLessThanMediumScreen ? "5px" : "10px",
      height: "100%",
    };
  };

  const getStackRowProps = (
    isMediumScreen: boolean,
  ): StackRowDirectionSpacingPropsProps => {
    return {
      gap: isMediumScreen ? "5px" : "10px",
      direction: isMediumScreen ? "column" : "row",
      spacing: isMediumScreen ? 2 : 0,
    };
  };

  const getStackFieldProps = (): StackFieldProps => {
    return {
      width: "100%",
    };
  };

  const getEditModeChip = (): React.ReactNode => {
    if (selectedSample) {
      return (
        <Stack direction={"row"} spacing={1} sx={{marginLeft: "10px"}}>
          <Typography
            text={"Edit mode"}
            variant={SharedTypographyVariants.CAPTION}
            align={SharedTypographyAlign.LEFT}
            color={SharedTypographyColors.TEXT_SECONDARY}
            padding="0 0 5px 0"
            sx={{alignSelf: "center"}}
          />
          {isReadOnlyMode ? (
            <Chip
              label="OFF"
              size={SharedChipSizes.SMALL}
              color={SharedChipColors.DEFAULT}
            />
          ) : (
            <Chip
              label="ON"
              size={SharedChipSizes.SMALL}
              color={SharedChipColors.SUCCESS}
            />
          )}
        </Stack>
      );
    }
    return null;
  };

  const getAutoCompleteOptionsFromClients = (): AutoCompleteOption[] => {
    return (
      clients?.map((client) => ({
        id: client.id,
        optionLabel: client.name,
      })) ?? []
    );
  };

  const getAutoCompleteOptionsFromSampleTypes = (): AutoCompleteOption[] => {
    return (
      sampleTypes?.map((sampleType) => ({
        id: sampleType.id,
        optionLabel: sampleType.name,
      })) ?? []
    );
  };

  useEffect(() => {
    setFormFieldsValidationFunctions({
      sampleCode: [isEmpty],
      sampleType: [isEmpty],
      client: [isEmpty],
      getSampleDate: [isEmpty, isNotValidDate],
      receptionDate: [isEmpty, isNotValidDate],
      analysisDate: [isEmpty, isNotValidDate],
      sampleLocation: [isEmpty],
      responsable: [isEmpty],
    });
    cleanForm(defaultFormValue);
  }, []);

  useEffect(() => {
    if (selectedSample) {
      setForm(sampleToSampleForm(selectedSample));
    }
  }, []);

  useEffect(() => {
    if (error) {
      showSnackBarMessage(error, SnackBarSeverity.ERROR);
    }
  }, [error]);

  return (
    <Box sx={getBoxContainerProps(isLessThanMediumScreen) as SxProps}>
      <Stack direction="row">
        <Stack direction={"row"}>
          <Typography
            text={sideSectionTitle}
            variant={SharedTypographyVariants.H6}
            align={SharedTypographyAlign.LEFT}
            color={SharedTypographyColors.PRIMARY}
            padding="0 0 5px 0"
          />
          {getEditModeChip()}
        </Stack>
        <Button
          disabled={isLoading}
          label={SharedButtonCommonLabels.CLOSE}
          variant={SharedButtonVariants.OUTLINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.ERROR}
          icon="close"
          onClick={handleCloseSideSection}
          sx={SampleDetailStyles.closeButton}
        />
      </Stack>
      <Divider />
      <Stack {...getStackContainerProps(isLessThanMediumScreen)}>
        <Stack {...getStackRowProps(isLessThanMediumScreen)}>
          <Stack {...getStackFieldProps()}>
            <TextField
              required
              error={!!formFieldsErrors[SamplesFormFields.SAMPLE_CODE]}
              label={SAMPLE_CODE_LABEL_TEXT}
              color={SharedButtonColors.PRIMARY}
              size={SharedButtonSizes.SMALL}
              name={SamplesFormFields.SAMPLE_CODE}
              onChange={handleChange}
              helperText={getTextFieldHelperText(SamplesFormFields.SAMPLE_CODE)}
              value={form?.sampleCode ?? ""}
              variant={SharedTextFieldVariants.STANDARD}
              fullWidth={true}
              InputProps={{
                readOnly: isReadOnlyMode,
              }}
            />
          </Stack>
          <Stack {...getStackFieldProps()}>
            <AutoComplete
              options={getAutoCompleteOptionsFromSampleTypes()}
              label={SAMPLE_TYPE_LABEL_TEXT}
              value={form.sampleType}
              variant={SelectVariants.STANDARD}
              onChange={handleAutoCompleteChange}
              name={ReportFormFields.SAMPLE_TYPE}
              readOnly={isReadOnlyMode}
            />
          </Stack>
        </Stack>
        <Stack {...getStackRowProps(isLessThanMediumScreen)}>
          <Stack {...getStackFieldProps()}>
            <AutoComplete
              options={getAutoCompleteOptionsFromClients()}
              label={SAMPLE_CLIENT_LABEL_TEXT}
              value={form.client}
              variant={SelectVariants.STANDARD}
              onChange={handleAutoCompleteChange}
              name={SamplesFormFields.CLIENT}
              readOnly={isReadOnlyMode}
            />
          </Stack>
          <Stack {...getStackFieldProps()}>
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
                    variant: SharedTextFieldVariants.STANDARD,
                  },
                }}
                readOnly={isReadOnlyMode}
              />
            </LocalizationProvider>
          </Stack>
        </Stack>
        <Stack {...getStackRowProps(isLessThanMediumScreen)}>
          <Stack {...SampleDetailStyles.stackField}>
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
                    error: !!formFieldsErrors[SamplesFormFields.RECEPTION_DATE],
                    helperText: getTextFieldHelperText(
                      SamplesFormFields.RECEPTION_DATE,
                    ),
                    variant: SharedTextFieldVariants.STANDARD,
                  },
                }}
                value={dayjs(form.receptionDate) ?? null}
                readOnly={isReadOnlyMode}
              />
            </LocalizationProvider>
          </Stack>
          <Stack {...getStackFieldProps()}>
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
                    error: !!formFieldsErrors[SamplesFormFields.ANALYSIS_DATE],
                    helperText: getTextFieldHelperText(
                      SamplesFormFields.ANALYSIS_DATE,
                    ),
                    variant: SharedTextFieldVariants.STANDARD,
                  },
                }}
                readOnly={isReadOnlyMode}
              />
            </LocalizationProvider>
          </Stack>
        </Stack>
        <Stack {...getStackRowProps(isLessThanMediumScreen)}>
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
            variant={SharedTextFieldVariants.STANDARD}
            InputProps={{
              readOnly: isReadOnlyMode,
            }}
          />
          <Stack {...getStackFieldProps()}>
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
              variant={SharedTextFieldVariants.STANDARD}
              InputProps={{
                readOnly: isReadOnlyMode,
              }}
            />
          </Stack>
        </Stack>
      </Stack>
      <Box
        sx={{
          display: "flex",
          alignSelf: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <SampleSideSectionButtons
          isNotValidForm={isNotValidForm}
          sample={selectedSample}
          isReadOnlyMode={isReadOnlyMode}
          setIsReadOnlyMode={setIsReadOnlyMode}
          handleCreateReport={handleCreateReport}
          handleEdit={handleEdit}
        />
      </Box>
    </Box>
  );
}

export default SampleDetail;
