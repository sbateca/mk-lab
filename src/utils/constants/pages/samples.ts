import ITypographyProps from "../../../components/atoms/Typography/Types";
import {getSharedPageTitleConfig} from "./shared";

export const SAMPLES_PAGE_NAME = "Samples";
export const SAMPLES_TITLE_CONFIG: ITypographyProps =
  getSharedPageTitleConfig(SAMPLES_PAGE_NAME);
export const SAMPLES_TABLE_HEADER_LABELS = [
  "Actions",
  "Sample Code",
  "Client",
  "Get Date",
  "Reception Date",
  "Analysis Date",
  "Location",
  "Responsable",
];
export const SAMPLES_PAGE_DIALOG_TITLE = "Create sample form";
