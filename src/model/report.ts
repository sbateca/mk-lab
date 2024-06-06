import {ISample} from "./sample";

export interface IReport {
  id: string;
  reportDate: string;
  sample: ISample;
  analyte: string;
  analysisMethod: string;
  criteria: string;
  result: string;
}
