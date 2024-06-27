import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import dayjs from "dayjs";
import {
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
  SharedButtonIcons,
  SharedButtonSizes,
  SharedButtonVariants,
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

function SamplesContent(): React.ReactElement {
  const {samples, getSamples, createSample, isLoading, error} = useSample();
  const [rows, setRows] = useState<TableRowProps[]>([]);
  const {isOpen, openModal, closeModal} = useModal();
  const [isSnackBarOpen, setIsSnackBarOpen] = useState<boolean>(false);
  const [snackBarText, setSnackBarText] = useState<string>("");
  const [snackBarSeverity, setSnackBarSeverity] = useState<
    "error" | "success" | "info" | "warning"
  >("success");
  const today = dayjs().format("YYYY-MM-DD");
  const defaultFormValue: FormProps = {
    sampleCode: "",
    client: "",
    getSampleDate: today,
    receptionDate: today,
    analysisDate: today,
    sampleLocation: "",
    responsable: "",
  };

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

  useEffect(() => {
    if (samples) {
      setRows(samplesToTableRows(samples));
    }
  }, [samples]);

  useEffect(() => {
    if (error) {
      setSnackBarSeverity("error");
      setSnackBarText(`Error: ${error}`);
      setIsSnackBarOpen(true);
      return () => {
        setIsSnackBarOpen(false);
      };
    }
  }, [error]);

  const handleCreateReport = () => {
    createSample(sampleFormToSample(form)).then((newSample) => {
      if (newSample) {
        setIsSnackBarOpen(true);
        setSnackBarText(`Sample ${newSample?.sampleCode} created successfully`);
        handleCloseModal();
        getSamples();
      } else if (error) {
        setSnackBarSeverity("error");
        setIsSnackBarOpen(true);
        setSnackBarText(`Error: ${error}`);
      }
    });
  };

  const handleCloseModal = () => {
    closeModal();
    cleanForm(defaultFormValue);
  };

  if (isLoading) return <Spinner />;

  const buttonPageConfig: ButtonConfig = {
    label: "Create sample",
    variant: SharedButtonVariants.Outlined,
    size: SharedButtonSizes.Small,
    color: SharedButtonColors.Primary,
    icon: SharedButtonIcons.Create,
    onClick: openModal,
  };

  const dialogActions = (
    <Box>
      <Button
        label="Cancel"
        variant="outlined"
        size="small"
        color="error"
        onClick={handleCloseModal}
      />
      <Button
        label="Save"
        disabled={isNotValidForm}
        variant="contained"
        size="small"
        color="primary"
        onClick={handleCreateReport}
      />
    </Box>
  );

  return (
    <Box>
      <Box sx={{display: "flex", flexDirection: "row"}}>
        <Typography {...SAMPLES_TITLE_CONFIG} />
        <Box sx={{marginLeft: "auto"}}>
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

export default SamplesContent;
