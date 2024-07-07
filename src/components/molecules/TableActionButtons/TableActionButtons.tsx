import {Box} from "@mui/material";
import Swal from "sweetalert2";
import Button from "../../atoms/Button/Button";
import {ButtonConfig} from "../../atoms/Button/Types";
import {useModal} from "../../../utils/hooks/useModal";
import {
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
  SnackBarSeverity,
} from "../../../utils/enums";
import {
  DELETE_BUTTON_TEXT,
  DETAIL_BUTTON_TEXT,
  EDIT_BUTTON_TEXT,
} from "../../../utils/constants/pages/shared";
import {TableActionButtonsProps} from "./Types";
import {useForm} from "../../../utils/hooks/useForm";
import Dialog from "../Dialog/Dialog";
import SampleForm from "../../organisms/SampleForm/SampleForm";
import {
  SAMPLE_SUCCESSFULLY_DELETED_TEXT,
  SAMPLE_SUCCESSFULLY_UPDATED_TEXT,
  SAMPLES_PAGE_DIALOG_EDIT_TITLE,
} from "../../../utils/constants/pages/samples";
import {
  isEmpty,
  isNotValidDate,
} from "../../../utils/constants/form/validations";
import {useEffect, useState} from "react";
import {useSample} from "../../../utils/hooks/useSample";
import {
  sampleToSampleForm,
  sampleFormToSample,
} from "../../../adapters/samples";
import Snackbar from "../SnackBar/SnackBar";
import Spinner from "../../atoms/Spinner/Spinner";
import {useSnackBar} from "../../../utils/hooks/useSnackBar";
import Detail from "../../organisms/Detail/Detail";
import SampleDetail from "../../organisms/SampleDetail/SampleDetail";
import {Sample} from "../../../model/Sample";

function TableActionButtons({id}: TableActionButtonsProps): React.ReactElement {
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [selectedSample, setSelectedSample] = useState<Sample>({
    id: "",
    sampleCode: "",
    client: "",
    getSampleDate: "",
    receptionDate: "",
    analysisDate: "",
    sampleLocation: "",
    responsable: "",
  });

  const {
    getSamples,
    getSampleById,
    editSample,
    deleteSample,
    isLoading,
    error,
  } = useSample();
  const {isOpen, openModal, closeModal} = useModal();
  const {isSnackBarOpen, snackBarText, snackBarSeverity, showSnackBarMessage} =
    useSnackBar();
  const {
    isNotValidForm,
    form,
    setForm,
    formFieldsErrors,
    handleChange,
    handleDateChange,
    getTextFieldHelperText,
    setFormFieldsValidationFunctions,
    cleanForm,
  } = useForm();

  const handleDetail = async () => {
    const sample = await getSampleById(id);
    if (sample) {
      setSelectedSample(sample);
    }
    setIsDetailOpen(true);
  };

  const handleOpenEdit = async () => {
    const sample = await getSampleById(id);
    if (sample) {
      setForm(sampleToSampleForm(sample));
    }
    openModal();
  };

  const handleEdit = async () => {
    const sample = sampleFormToSample(form);
    const updatedSample = await editSample(id, sample);
    if (updatedSample !== null) {
      handleCloseModal();
      showSnackBarMessage(
        SAMPLE_SUCCESSFULLY_UPDATED_TEXT,
        SnackBarSeverity.SUCCESS,
        getSamples,
      );
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "You want to delete this sample?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1976d2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const result = deleteSample(id);
        if (result !== null) {
          showSnackBarMessage(
            SAMPLE_SUCCESSFULLY_DELETED_TEXT,
            SnackBarSeverity.SUCCESS,
            getSamples,
          );
        }
      }
    });
  };

  const handleCloseModal = () => {
    closeModal();
    cleanForm(form);
  };

  const setFormValidationFunctions = () => {
    setFormFieldsValidationFunctions({
      sampleCode: [isEmpty],
      client: [isEmpty],
      getSampleDate: [isEmpty, isNotValidDate],
      receptionDate: [isEmpty, isNotValidDate],
      analysisDate: [isEmpty, isNotValidDate],
      sampleLocation: [isEmpty],
      responsable: [isEmpty],
    });
  };

  useEffect(() => {
    setFormValidationFunctions();
  }, []);

  useEffect(() => {
    if (error) {
      showSnackBarMessage(`Error: ${error}`, SnackBarSeverity.ERROR);
    }
  }, [error]);

  const detailButtonConfig: ButtonConfig = {
    label: DETAIL_BUTTON_TEXT,
    variant: SharedButtonVariants.OUTLINED,
    size: SharedButtonSizes.SMALL,
    color: SharedButtonColors.PRIMARY,
    onClick: handleDetail,
  };
  const editButtonConfig: ButtonConfig = {
    label: EDIT_BUTTON_TEXT,
    variant: SharedButtonVariants.OUTLINED,
    size: SharedButtonSizes.SMALL,
    color: SharedButtonColors.PRIMARY,
    onClick: handleOpenEdit,
  };
  const deleteButtonConfig: ButtonConfig = {
    label: DELETE_BUTTON_TEXT,
    variant: SharedButtonVariants.OUTLINED,
    size: SharedButtonSizes.SMALL,
    color: SharedButtonColors.ERROR,
    onClick: handleDelete,
  };

  const dialogActions = (
    <Box>
      <Button
        label={SharedButtonCommonLabels.CANCEL}
        variant={SharedButtonVariants.OUTLINED}
        size={SharedButtonSizes.SMALL}
        color={SharedButtonColors.ERROR}
        onClick={handleCloseModal}
      />
      <Button
        label={SharedButtonCommonLabels.EDIT}
        disabled={isNotValidForm}
        variant={SharedButtonVariants.OUTLINED}
        size={SharedButtonSizes.SMALL}
        color={SharedButtonColors.PRIMARY}
        onClick={handleEdit}
      />
    </Box>
  );

  return (
    <>
      <Box>
        <Button {...detailButtonConfig} />
        <Button {...editButtonConfig} />
        <Button {...deleteButtonConfig} />
      </Box>
      <Dialog
        isOpen={isOpen}
        dialogTitle={SAMPLES_PAGE_DIALOG_EDIT_TITLE}
        onClose={handleCloseModal}
        dialogActions={dialogActions}
      >
        <Box>
          {isLoading ? (
            <Spinner />
          ) : (
            <SampleForm
              form={form}
              formFieldsErrors={formFieldsErrors}
              handleChange={handleChange}
              handleDateChange={handleDateChange}
              getTextFieldHelperText={getTextFieldHelperText}
            />
          )}
        </Box>
      </Dialog>
      <Detail isOpen={isDetailOpen} setIsOpen={setIsDetailOpen}>
        <SampleDetail sample={selectedSample} />
      </Detail>
      <Snackbar
        isOpen={isSnackBarOpen}
        snackBarText={snackBarText}
        severity={snackBarSeverity}
      />
    </>
  );
}

export default TableActionButtons;
