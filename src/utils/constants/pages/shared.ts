import {DateView} from "@mui/x-date-pickers";
import ITypographyProps from "../../../components/atoms/Typography/Types";

export const getSharedPageTitleConfig = (
  pageName: string,
): ITypographyProps => {
  return {
    text: pageName,
    size: "20px",
    variant: "h1",
    padding: "10px 0px",
  };
};

export const TABLE_ACTIONS_COLUMN_HEADER = "Actions";
export const LOCAL_STORAGE_USER_KEY = "userData";
export const NO_RECORDS_MESSAGE = "No records to display";

export const EDIT_BUTTON_TEXT = "Edit";
export const DELETE_BUTTON_TEXT = "Delete";
export const DETAIL_BUTTON_TEXT = "Detail";

export const MODAL_SAVE_BUTTON_TEXT = "Save";
export const MODAL_CANCEL_BUTTON_TEXT = "Cancel";

export const DATEPICKER_VIEWS: DateView[] = ["year", "month", "day"];
export const DATEPICKER_FORMAT = "YYYY-MM-DD";
