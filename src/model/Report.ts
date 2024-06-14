import {Sample} from "./Sample";

export interface Report {
  id: string;
  reportDate: string;
  sample: Sample;
  analyte: string;
  analysisMethod: string;
  criteria: string;
  result: string;
}
