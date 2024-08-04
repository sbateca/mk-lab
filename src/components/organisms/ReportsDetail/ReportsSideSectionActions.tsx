import {Box} from "@mui/material";
import {
  IconNames,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../utils/enums";
import Button from "../../atoms/Button/Button";
import {EDIT_SAMPLE_BUTTON_LABEL} from "../../../utils/constants/pages/samples";
import {ReportSideSectionActionsProps} from "./Types";

function ReportSideSectionButtons({
  isNotValidForm,
  report,
  isReadOnlyMode,
  setIsReadOnlyMode,
  handleCreateReport,
  handleEdit,
}: ReportSideSectionActionsProps): React.ReactElement {
  const handleSwitchReadOnlyMode = () => {
    setIsReadOnlyMode(!isReadOnlyMode);
  };

  return (
    <Box>
      {isReadOnlyMode && report ? (
        <Button
          icon={IconNames.EDIT}
          label={EDIT_SAMPLE_BUTTON_LABEL}
          disabled={isNotValidForm}
          variant={SharedButtonVariants.OUTLINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.PRIMARY}
          onClick={handleSwitchReadOnlyMode}
        />
      ) : null}
      {!isReadOnlyMode && report ? (
        <>
          <Button
            icon={IconNames.SAVE}
            label={SharedButtonCommonLabels.SAVE}
            disabled={isNotValidForm}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.SUCCESS}
            onClick={handleEdit}
          />
          <Button
            label={SharedButtonCommonLabels.CANCEL}
            icon={IconNames.CLOSE}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.ERROR}
            onClick={handleSwitchReadOnlyMode}
          />
        </>
      ) : null}
      {!isReadOnlyMode && !report ? (
        <Button
          icon={IconNames.SAVE}
          label={SharedButtonCommonLabels.SAVE}
          disabled={isNotValidForm}
          variant={SharedButtonVariants.OUTLINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.SUCCESS}
          onClick={handleCreateReport}
        />
      ) : null}
    </Box>
  );
}

export default ReportSideSectionButtons;
