import ITypographyProps from "../../../components/atoms/Typography/Types";
import {getSharedPageTitleConfig} from "./shared";

export const REPORTS_PAGE_NAME = "Reports";
export const REPORTS_TITLE_CONFIG: ITypographyProps =
  getSharedPageTitleConfig(REPORTS_PAGE_NAME);
export const REPORTS_TABLE_HEADER_LABELS = [
  "Actions",
  "Report Date",
  "Sample",
  "Analyte",
  "Method",
  "Criteria",
  "Result",
];

export const REPORT_BUTTON_TEXTS = {
  create: "Create Report",
  edit: "Edit",
  delete: "Delete",
  detail: "Detail",
};
