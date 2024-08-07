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
import {ReportDetailStyles} from "./ReportsDetailStyles";
import Typography from "../../atoms/Typography/Typography";
import {
  BoxContainerProps,
  ReportDetailProps,
  StackContainerProps,
  StackFieldProps,
  StackRowDirectionSpacingPropsProps,
} from "./Types";
import {
  ReportFormFields,
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
import {SAMPLE_SUCCESSFULLY_UPDATED_TEXT} from "../../../utils/constants/pages/samples";
import {
  REPORT_SAMPLE_LABEL_TEXT,
  REPORT_ANALYTE_LABEL_TEXT,
  REPORT_ANALYSIS_METHOD_LABEL_TEXT,
  REPORT_CRITERIA_LABEL_TEXT,
  REPORT_DATE_LABEL_TEXT,
  REPORT_RESULT_LABEL_TEXT,
} from "../../../utils/constants/form/formLabel";
import {SampleFormStyles} from "../SampleForm/SampleFormStyles";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {
  DATEPICKER_FORMAT,
  DATEPICKER_VIEWS,
} from "../../../utils/constants/pages/shared";
import {useForm} from "../../../utils/hooks/useForm";
import {useSnackBar} from "../../../utils/hooks/useSnackBar";
import Button from "../../atoms/Button/Button";
import {
  isEmpty,
  isNotValidDate,
} from "../../../utils/constants/form/validations";
import {FormProps} from "../../../utils/constants/form/formType";
import ReportSideSectionButtons from "./ReportsSideSectionActions";
import {useSideSection} from "../../../utils/hooks/useSideSection";
import {SxProps} from "@mui/system";
import {useReports} from "../../../utils/hooks/useReports";
import {
  reportFormToReport,
  reportToReportForm,
} from "../../../adapters/reports";
import {REPORT_SUCCESSFULLY_CREATED_TEXT} from "../../../utils/constants/pages/reports";
import {useSample} from "../../../utils/hooks/useSample";
import AutoComplete from "../../molecules/AutoComplete/AutoComplete";
import {AutoCompleteOption} from "../../molecules/AutoComplete/types";
import {useSampleType} from "../../../utils/hooks/useSampleType";
import {useAnalysisMethod} from "../../../utils/hooks/useAnalysisMethod";
import {useAnalyte} from "../../../utils/hooks/useAnalyte";
import {useCriteria} from "../../../utils/hooks/useCriteria";
import {
  findModelById,
  getAutoCompleteOptionsFromModel,
} from "../../../utils/model";

function ReportDetail({
  isReadOnlyMode,
  setIsReadOnlyMode,
}: ReportDetailProps): React.ReactElement {
  const today = dayjs();
  const theme = useTheme<Theme>();
  const isLessThanMediumScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    getReports,
    createReport,
    editReport,
    selectedReport,
    isLoading,
    error,
  } = useReports();
  const {samples} = useSample();
  const {sampleTypes} = useSampleType();
  const {analysisMethods} = useAnalysisMethod();
  const {analytes} = useAnalyte();
  const {criterias} = useCriteria();
  const {setIsSideSectionOpen, sideSectionTitle} = useSideSection();
  const {showSnackBarMessage} = useSnackBar();

  const defaultFormValue: FormProps = {
    reportDate: today.format(DATEPICKER_FORMAT),
    sampleId: selectedReport?.sampleId ?? "",
    analyte: "",
    analysisMethod: "",
    criteria: "",
    result: "",
  };
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

  const handleCloseSideSection = () => {
    if (setIsSideSectionOpen) {
      setIsSideSectionOpen(false);
      setIsReadOnlyMode(true);
    }
  };

  const handleCreateReport = async () => {
    const newReport = await createReport(reportFormToReport(form, ""));
    if (newReport !== null) {
      showSnackBarMessage(
        REPORT_SUCCESSFULLY_CREATED_TEXT,
        SnackBarSeverity.SUCCESS,
        getReports,
      );
      handleCloseSideSection();
    }
  };

  const handleEdit = async () => {
    const parsedReport = reportFormToReport(form, selectedReport?.id ?? "");
    const updatedReport = await editReport(selectedReport?.id, parsedReport);
    if (updatedReport !== null) {
      handleCloseSideSection();
      showSnackBarMessage(
        SAMPLE_SUCCESSFULLY_UPDATED_TEXT,
        SnackBarSeverity.SUCCESS,
        getReports,
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
    if (selectedReport) {
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

  const getSampleTypeAutoCompleteOptionsFromSamples =
    (): AutoCompleteOption[] => {
      return (
        samples?.map((sample) => {
          const sampleTypeFound = sampleTypes?.find(
            (sampleType) => sampleType.id === sample.sampleTypeId,
          );
          return {
            id: sample.id,
            optionLabel:
              `${sample.sampleCode} - ${sampleTypeFound?.name}` ?? "",
          };
        }) ?? []
      );
    };

  useEffect(() => {
    setFormFieldsValidationFunctions({
      reportDate: [isEmpty, isNotValidDate],
      sampleId: [isEmpty],
      analyte: [isEmpty],
      analysisMethod: [isEmpty],
      criteria: [isEmpty],
      result: [isEmpty],
    });
    cleanForm(defaultFormValue);
  }, []);

  useEffect(() => {
    if (selectedReport) {
      setForm(reportToReportForm(selectedReport));
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
          sx={ReportDetailStyles.closeButton}
        />
      </Stack>
      <Divider />
      <Stack {...getStackContainerProps(isLessThanMediumScreen)}>
        <Stack {...getStackRowProps(isLessThanMediumScreen)}>
          <Stack {...getStackFieldProps()}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={SampleFormStyles.datePicker}
                disableFuture
                defaultValue={today}
                views={DATEPICKER_VIEWS}
                label={REPORT_DATE_LABEL_TEXT}
                name={ReportFormFields.REPORT_DATE}
                onChange={(value) =>
                  handleDateChange(value, ReportFormFields.REPORT_DATE)
                }
                slotProps={{
                  textField: {
                    error: !!formFieldsErrors[ReportFormFields.REPORT_DATE],
                    helperText: getTextFieldHelperText(
                      ReportFormFields.REPORT_DATE,
                    ),
                    variant: SharedTextFieldVariants.STANDARD,
                  },
                }}
                value={dayjs(form.reportDate) ?? null}
                readOnly={isReadOnlyMode}
              />
            </LocalizationProvider>
          </Stack>
          <Stack {...getStackFieldProps()}>
            <AutoComplete
              options={getSampleTypeAutoCompleteOptionsFromSamples()}
              label={REPORT_SAMPLE_LABEL_TEXT}
              value={form.sampleId}
              variant={SelectVariants.STANDARD}
              onChange={handleAutoCompleteChange}
              name={ReportFormFields.SAMPLE_ID}
              readOnly={isReadOnlyMode}
            />
          </Stack>
        </Stack>
        <Stack {...getStackRowProps(isLessThanMediumScreen)}>
          <Stack {...getStackFieldProps()}>
            <AutoComplete
              options={getAutoCompleteOptionsFromModel(analytes)}
              label={REPORT_ANALYTE_LABEL_TEXT}
              value={form.analyte}
              variant={SelectVariants.STANDARD}
              onChange={handleAutoCompleteChange}
              name={ReportFormFields.ANALYTE}
              readOnly={isReadOnlyMode}
            />
          </Stack>
          <Stack {...getStackFieldProps()}>
            <AutoComplete
              options={getAutoCompleteOptionsFromModel(analysisMethods)}
              label={REPORT_ANALYSIS_METHOD_LABEL_TEXT}
              value={form.analysisMethod}
              variant={SelectVariants.STANDARD}
              onChange={handleAutoCompleteChange}
              name={ReportFormFields.ANALYSIS_METHOD}
              readOnly={isReadOnlyMode}
            />
          </Stack>
        </Stack>
        <Stack {...getStackRowProps(isLessThanMediumScreen)}>
          <Stack {...getStackFieldProps()}>
            <AutoComplete
              options={getAutoCompleteOptionsFromModel(criterias)}
              label={REPORT_CRITERIA_LABEL_TEXT}
              value={form.criteria}
              variant={SelectVariants.STANDARD}
              onChange={handleAutoCompleteChange}
              name={ReportFormFields.CRITERIA}
              readOnly={isReadOnlyMode}
            />
          </Stack>
          <Stack {...getStackFieldProps()}>
            <TextField
              required
              error={!!formFieldsErrors[ReportFormFields.RESULT]}
              label={REPORT_RESULT_LABEL_TEXT}
              type="string"
              color={SharedButtonColors.PRIMARY}
              size={SharedButtonSizes.SMALL}
              onChange={handleChange}
              name={ReportFormFields.RESULT}
              helperText={getTextFieldHelperText(ReportFormFields.RESULT)}
              value={form.result ?? ""}
              variant={SharedTextFieldVariants.STANDARD}
              fullWidth={true}
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
        <ReportSideSectionButtons
          isNotValidForm={isNotValidForm}
          report={selectedReport}
          isReadOnlyMode={isReadOnlyMode}
          setIsReadOnlyMode={setIsReadOnlyMode}
          handleCreateReport={handleCreateReport}
          handleEdit={handleEdit}
        />
      </Box>
    </Box>
  );
}

export default ReportDetail;
