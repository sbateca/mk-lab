import {Box} from "@mui/material";
import Button from "../../atoms/Button/Button";
import {ButtonConfig} from "../../atoms/Button/Types";
import {
  SharedButtonColors,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../utils/enums";
import {
  DELETE_BUTTON_TEXT,
  DETAIL_BUTTON_TEXT,
  EDIT_BUTTON_TEXT,
} from "../../../utils/constants/pages/shared";

function TableActionButtons(): React.ReactElement {
  const handleDetail = () => {
    // eslint-disable-next-line no-console
    console.log("Detail button clicked");
  };

  const handleEdit = () => {
    // eslint-disable-next-line no-console
    console.log("Edit button clicked");
  };

  const handleDelete = () => {
    // eslint-disable-next-line no-console
    console.log("Delete button clicked");
  };

  const detailButtonConfig: ButtonConfig = {
    label: DETAIL_BUTTON_TEXT,
    variant: SharedButtonVariants.Outlined,
    size: SharedButtonSizes.Small,
    color: SharedButtonColors.Primary,
    onClick: handleDetail,
  };
  const editButtonConfig: ButtonConfig = {
    label: EDIT_BUTTON_TEXT,
    variant: SharedButtonVariants.Outlined,
    size: SharedButtonSizes.Small,
    color: SharedButtonColors.Primary,
    onClick: handleEdit,
  };
  const deleteButtonConfig: ButtonConfig = {
    label: DELETE_BUTTON_TEXT,
    variant: SharedButtonVariants.Outlined,
    size: SharedButtonSizes.Small,
    color: SharedButtonColors.Error,
    onClick: handleDelete,
  };
  return (
    <Box>
      <Button {...detailButtonConfig} />
      <Button {...editButtonConfig} />
      <Button {...deleteButtonConfig} />
    </Box>
  );
}

export default TableActionButtons;
