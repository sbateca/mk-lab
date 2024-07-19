import {useEffect} from "react";
import {Box} from "@mui/material";
import Swal from "sweetalert2";
import {useSample} from "../../../utils/hooks/useSample";
import Spinner from "../../atoms/Spinner/Spinner";
import {useSnackBar} from "../../../utils/hooks/useSnackBar";
import Button from "../../atoms/Button/Button";
import {
  IconNames,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
  SnackBarSeverity,
  SweetAlertIcon,
} from "../../../utils/enums";
import {TableActionButtonsProps} from "./Types";
import {
  SAMPLE_DELETE_CONFIRMATION_SUBTITLE,
  SAMPLE_DELETE_CONFIRMATION_TEXT,
  SAMPLE_SUCCESSFULLY_DELETED_TEXT,
  SAMPLE_DELETE_CONFIRMATION_TITLE,
  SAMPLE_DETAILS_TITLE_TEXT,
} from "../../../utils/constants/pages/samples";
import {useSideSection} from "../../../utils/hooks/useSideSection";

function TableActionButtons({
  sampleId,
}: TableActionButtonsProps): React.ReactElement {
  const {
    getSampleById,
    deleteSample,
    getSamples,
    setSelectedSample,
    isLoading,
    error,
  } = useSample();
  const {showSnackBarMessage} = useSnackBar();
  const {setIsSideSectionOpen, setSideSectionTitle} = useSideSection();

  const handleOpenSideSection = async (sampleId: string) => {
    const sample = await getSampleById(sampleId);
    if (sample) {
      setSelectedSample(sample);
      setSideSectionTitle(SAMPLE_DETAILS_TITLE_TEXT);
      setIsSideSectionOpen(true);
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: SAMPLE_DELETE_CONFIRMATION_TITLE,
      text: SAMPLE_DELETE_CONFIRMATION_SUBTITLE,
      icon: SweetAlertIcon.WARNING,
      showCancelButton: true,
      confirmButtonColor: "#1976d2",
      cancelButtonColor: "#d33",
      confirmButtonText: SAMPLE_DELETE_CONFIRMATION_TEXT,
    }).then((result) => {
      if (result.isConfirmed) {
        const result = deleteSample(sampleId);
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

  useEffect(() => {
    if (error) {
      showSnackBarMessage(error, SnackBarSeverity.ERROR);
    }
  }, [error]);

  return (
    <Box>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Button
            icon={IconNames.SEARCH}
            label={SharedButtonCommonLabels.VIEW}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.PRIMARY}
            onClick={() => handleOpenSideSection(sampleId)}
          />
          <Button
            icon={IconNames.DELETE}
            label={SharedButtonCommonLabels.DELETE}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.ERROR}
            onClick={handleDelete}
          />
        </>
      )}
    </Box>
  );
}

export default TableActionButtons;
