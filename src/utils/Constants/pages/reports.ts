import ITypographyProps from "../../../Components/Atoms/Typography/Types";
import {ButtonConfigs} from "../../../Components/Molecules/ActionButtons/Types";
import {getSharedPageTitleConfig} from "./shared";

export const REPORTS_PAGE_NAME = "Reports";
export const REPORTS_TITLE_CONFIG: ITypographyProps =
  getSharedPageTitleConfig(REPORTS_PAGE_NAME);
export const REPORTS_TABLE_HEADER_LABELS = [
  "Report Date",
  "Sample",
  "Analyte",
  "Method",
  "Criteria",
  "Result",
];
export const REPORTS_TABLE_BUTTON_CONFIGS: ButtonConfigs = {
  buttonConfigs: [
    {label: "Detail", color: "primary"},
    {label: "Edit", color: "primary"},
    {label: "Delete", color: "error"},
  ],
};
export const REPORTS_BUTTON_CONFIGS: ButtonConfigs = {
  buttonConfigs: [{label: "Create Report", color: "primary", icon: "create"}],
};
