import {TableRowProps} from "../components/molecules/TableRow/Types";
import {IReport} from "../model/report";
import {ISample} from "../model/sample";

export const samplesToTableRowPropList = (
  samples: ISample[],
): TableRowProps[] => {
  return samples.map((sample) => {
    return {
      cells: [
        {text: sample.sampleCode, align: "left"},
        {text: sample.client, align: "left"},
        {text: sample.getSampleDate, align: "left"},
        {text: sample.receptionDate, align: "left"},
        {text: sample.analysisDate, align: "left"},
        {text: sample.sampleLocation, align: "left"},
        {text: sample.responsable, align: "left"},
      ],
    };
  });
};

export const reportsToTableRowPropList = (
  reports: IReport[],
): TableRowProps[] => {
  return reports.map((report) => {
    return {
      cells: [
        {text: report.reportDate, align: "left"},
        {
          text: `${report.sample.sampleCode} - ${report.sample.client}`,
          align: "left",
        },
        {text: report.analyte, align: "left"},
        {text: report.analysisMethod, align: "left"},
        {text: report.criteria, align: "left"},
        {text: report.result, align: "left"},
      ],
    };
  });
};
