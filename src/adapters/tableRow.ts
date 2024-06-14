import {TableRowProps} from "../components/molecules/TableRow/Types";
import {Report} from "../model/Report";
import {Sample} from "../model/Sample";

export const samplesToTableRows = (samples: Sample[]): TableRowProps[] => {
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

export const reportsToTableRows = (reports: Report[]): TableRowProps[] => {
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
