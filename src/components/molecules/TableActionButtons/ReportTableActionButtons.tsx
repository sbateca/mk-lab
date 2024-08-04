import {useEffect} from "react";
import {Box} from "@mui/material";
import Swal from "sweetalert2";
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
import {ReportTableActionButtonsProps} from "./Types";
import {SAMPLE_SUCCESSFULLY_DELETED_TEXT} from "../../../utils/constants/pages/samples";
import {useSideSection} from "../../../utils/hooks/useSideSection";
import {useReports} from "../../../utils/hooks/useReports";
import {
  REPORT_DELETE_CONFIRMATION_SUBTITLE,
  REPORT_DELETE_CONFIRMATION_TITLE,
  REPORT_DETAILS_TITLE_TEXT,
  REPORT_DELETE_CONFIRMATION_TEXT,
} from "../../../utils/constants/pages/reports";

function ReportTableActionButtons({
  reportId,
}: ReportTableActionButtonsProps): React.ReactElement {
  const {
    isLoading,
    error,
    deleteReport,
    getReportById,
    getReports,
    setSelectedReport,
  } = useReports();
  const {showSnackBarMessage} = useSnackBar();
  const {setIsSideSectionOpen, setSideSectionTitle} = useSideSection();

  const handleOpenSideSection = async (reportId: string) => {
    const report = await getReportById(reportId);
    if (report) {
      setSelectedReport(report);
      setSideSectionTitle(REPORT_DETAILS_TITLE_TEXT);
      setIsSideSectionOpen(true);
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: REPORT_DELETE_CONFIRMATION_TITLE,
      text: REPORT_DELETE_CONFIRMATION_SUBTITLE,
      icon: SweetAlertIcon.WARNING,
      showCancelButton: true,
      confirmButtonColor: "#1976d2",
      cancelButtonColor: "#d33",
      confirmButtonText: REPORT_DELETE_CONFIRMATION_TEXT,
    }).then((result) => {
      if (result.isConfirmed) {
        const result = deleteReport(reportId);
        if (result !== null) {
          showSnackBarMessage(
            SAMPLE_SUCCESSFULLY_DELETED_TEXT,
            SnackBarSeverity.SUCCESS,
            getReports,
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
            onClick={() => handleOpenSideSection(reportId)}
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

export default ReportTableActionButtons;
