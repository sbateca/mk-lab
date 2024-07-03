import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import dayjs from "dayjs";
import {
  SAMPLE_SUCCESSFULLY_CREATED_TEXT,
  SAMPLES_CREATE_BUTTON_LABEL,
  SAMPLES_PAGE_DIALOG_TITLE,
  SAMPLES_TABLE_HEADER_LABELS,
  SAMPLES_TITLE_CONFIG,
} from "../../../utils/constants/pages/samples";
import {samplesToTableRows} from "../../../adapters/tableRow";
import {TableRowProps} from "../../molecules/TableRow/Types";
import {useSample} from "../../../utils/hooks/useSample";
import Typography from "../../atoms/Typography/Typography";
import Spinner from "../../atoms/Spinner/Spinner";
import Table from "../Table/Table";
import Button from "../../atoms/Button/Button";
import {ButtonConfig} from "../../atoms/Button/Types";
import Dialog from "../../molecules/Dialog/Dialog";
import {
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonIcons,
  SharedButtonSizes,
  SharedButtonVariants,
  SnackBarSeverity,
} from "../../../utils/enums";
import {useModal} from "../../../utils/hooks/useModal";
import SampleForm from "../SampleForm/SampleForm";
import {useForm} from "../../../utils/hooks/useForm";
import {
  isEmpty,
  isNotValidDate,
} from "../../../utils/constants/form/validations";
import {sampleFormToSample} from "../../../adapters/samples";
import Snackbar from "../../molecules/SnackBar/SnackBar";
import {FormProps} from "../../../utils/constants/form/formType";
import {DATEPICKER_FORMAT} from "../../../utils/constants/pages/shared";
import {FormError} from "../SampleForm/Types";
import {SampleContentStyles} from "./SamplesContentStyles";
import {useSnackBar} from "../../../utils/hooks/useSnackBar";

interface SamplesContentProps {
  form: FormProps;
  isNotValidForm: boolean;
  formFieldsErrors: FormError;
  defaultFormValue: FormProps;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (value: dayjs.Dayjs | null, fieldName: string) => void;
  getTextFieldHelperText: (fieldName: string) => string;
  cleanForm: (form: FormProps) => void;
}

function SamplesContent({
  form,
  defaultFormValue,
  isNotValidForm,
  formFieldsErrors,
  handleChange,
  handleDateChange,
  getTextFieldHelperText,
  cleanForm,
}: SamplesContentProps): React.ReactElement {
  const [rows, setRows] = useState<TableRowProps[]>([]);
  const {samples, getSamples, createSample, isLoading, error} = useSample();
  const {isSnackBarOpen, snackBarText, snackBarSeverity, showSnackBarMessage} =
    useSnackBar();
  const {isOpen, openModal, closeModal} = useModal();

  useEffect(() => {
    if (samples) {
      setRows(samplesToTableRows(samples));
    }
  }, [samples]);

  useEffect(() => {
    if (error) {
      showSnackBarMessage(error, SnackBarSeverity.Error);
    }
  }, [error]);

  const handleCreateReport = () => {
    createSample(sampleFormToSample(form)).then((newSample) => {
      if (newSample) {
        showSnackBarMessage(
          SAMPLE_SUCCESSFULLY_CREATED_TEXT,
          SnackBarSeverity.Success,
          getSamples,
        );
        handleCloseModal();
      }
    });
  };

  const handleCloseModal = () => {
    closeModal();
    cleanForm(defaultFormValue);
  };

  const buttonPageConfig: ButtonConfig = {
    label: SAMPLES_CREATE_BUTTON_LABEL,
    variant: SharedButtonVariants.Outlined,
    size: SharedButtonSizes.Small,
    color: SharedButtonColors.Primary,
    icon: SharedButtonIcons.Create,
    onClick: openModal,
  };

  const dialogActions = (
    <Box>
      <Button
        label={SharedButtonCommonLabels.Cancel}
        variant={SharedButtonVariants.Outlined}
        size={SharedButtonSizes.Small}
        color={SharedButtonColors.Error}
        onClick={handleCloseModal}
      />
      <Button
        label={SharedButtonCommonLabels.Save}
        disabled={isNotValidForm}
        variant={SharedButtonVariants.Outlined}
        size={SharedButtonSizes.Small}
        color={SharedButtonColors.Primary}
        onClick={handleCreateReport}
      />
    </Box>
  );

  return isLoading ? (
    <Spinner />
  ) : (
    <Box>
      <Box sx={SampleContentStyles.titleContentContainer}>
        <Typography {...SAMPLES_TITLE_CONFIG} />
        <Box sx={SampleContentStyles.titleContentActions}>
          <Button {...buttonPageConfig} />
        </Box>
      </Box>
      <Table headerLabels={SAMPLES_TABLE_HEADER_LABELS} rows={rows} />
      <Dialog
        isOpen={isOpen}
        dialogTitle={SAMPLES_PAGE_DIALOG_TITLE}
        onClose={handleCloseModal}
        dialogActions={dialogActions}
      >
        <Box>
          <SampleForm
            form={form}
            formFieldsErrors={formFieldsErrors}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            getTextFieldHelperText={getTextFieldHelperText}
          />
        </Box>
      </Dialog>
      <Snackbar
        isOpen={isSnackBarOpen}
        snackBarText={snackBarText}
        severity={snackBarSeverity}
      />
    </Box>
  );
}

export const SamplesContentContainer = (): React.ReactElement => {
  const {
    isNotValidForm,
    form,
    formFieldsErrors,
    handleChange,
    handleDateChange,
    getTextFieldHelperText,
    setFormFieldsValidationFunctions,
    cleanForm,
  } = useForm();
  const today = dayjs().format(DATEPICKER_FORMAT);
  const defaultFormValue: FormProps = {
    sampleCode: "",
    client: "",
    getSampleDate: today,
    receptionDate: today,
    analysisDate: today,
    sampleLocation: "",
    responsable: "",
  };

  useEffect(() => {
    setFormFieldsValidationFunctions({
      sampleCode: [isEmpty],
      client: [isEmpty],
      getSampleDate: [isEmpty, isNotValidDate],
      receptionDate: [isEmpty, isNotValidDate],
      analysisDate: [isEmpty, isNotValidDate],
      sampleLocation: [isEmpty],
      responsable: [isEmpty],
    });
    cleanForm(defaultFormValue);
  }, []);

  return (
    <SamplesContent
      form={form}
      defaultFormValue={defaultFormValue}
      isNotValidForm={isNotValidForm}
      formFieldsErrors={formFieldsErrors}
      handleChange={handleChange}
      handleDateChange={handleDateChange}
      getTextFieldHelperText={getTextFieldHelperText}
      cleanForm={cleanForm}
    />
  );
};

export default SamplesContentContainer;
