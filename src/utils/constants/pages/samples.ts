import ITypographyProps from "../../../components/atoms/Typography/Types";
import {ButtonConfigs} from "../../../components/molecules/ActionButtons/Types";
import {getSharedPageTitleConfig} from "./shared";

export const SAMPLES_PAGE_NAME = "Samples";
export const SAMPLES_TITLE_CONFIG: ITypographyProps =
  getSharedPageTitleConfig(SAMPLES_PAGE_NAME);
export const SAMPLES_TABLE_HEADER_LABELS = [
  "Sample Code",
  "Client",
  "Get Date",
  "Reception Date",
  "Analysis Date",
  "Location",
  "Responsable",
];

export const SAMPLES_TABLE_BUTTON_CONFIGS: ButtonConfigs = {
  buttonConfigs: [
    {label: "Detail", color: "primary"},
    {label: "Edit", color: "primary"},
    {label: "Delete", color: "error"},
  ],
};
export const SAMPLES_BUTTON_CONFIGS: ButtonConfigs = {
  buttonConfigs: [{label: "Create Sample", color: "primary", icon: "create"}],
};
