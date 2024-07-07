import ITypographyProps from "../../../components/atoms/Typography/Types";
import {getSharedPageTitleConfig} from "./shared";

export const SAMPLES_PAGE_NAME = "Samples";
export const SAMPLES_TITLE_CONFIG: ITypographyProps =
  getSharedPageTitleConfig(SAMPLES_PAGE_NAME);
export const SAMPLES_TABLE_HEADER_LABELS = [
  "Sample Code",
  "Client",
  "Get Date",
  "Reception Date",
  "Actions",
];
export const SAMPLES_PAGE_DIALOG_TITLE = "Create sample";
export const SAMPLES_PAGE_DIALOG_EDIT_TITLE = "Edit sample";
export const SAMPLES_CREATE_BUTTON_LABEL = "Create sample";
export const SAMPLE_SUCCESSFULLY_CREATED_TEXT = "Sample created successfully";
export const SAMPLE_SUCCESSFULLY_UPDATED_TEXT =
  "The sample was updated successfully";
export const SAMPLE_SUCCESSFULLY_DELETED_TEXT =
  "The sample was deleted successfully";
export const SAMPLE_ID_OR_SAMPLE_MISSING_TEXT =
  "Sample Id or Sample is missing";
export const SAMPLE_ID_MISSING_TEXT = "Sample Id is missing";
export const SAMPLES_PAGE_DETAIL_TITLE = "Sample details";
