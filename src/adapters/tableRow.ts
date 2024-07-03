import {TableRowProps} from "../components/molecules/TableRow/Types";
import {Report} from "../model/Report";
import {Sample} from "../model/Sample";

export const samplesToTableRows = (samples: Sample[]): TableRowProps[] => {
  return samples.map((sample) => {
    return {
      id: sample.id,
      cells: [
        {children: sample.sampleCode, align: "left"},
        {children: sample.client, align: "left"},
        {children: sample.getSampleDate, align: "left"},
        {children: sample.receptionDate, align: "left"},
        {children: sample.analysisDate, align: "left"},
        {children: sample.sampleLocation, align: "left"},
        {children: sample.responsable, align: "left"},
      ],
    };
  });
};

export const reportsToTableRows = (reports: Report[]): TableRowProps[] => {
  return reports.map((report) => {
    return {
      id: report.id,
      cells: [
        {children: report.reportDate, align: "left"},
        {
          children: `${report.sample.sampleCode} - ${report.sample.client}`,
          align: "left",
        },
        {children: report.analyte, align: "left"},
        {children: report.analysisMethod, align: "left"},
        {children: report.criteria, align: "left"},
        {children: report.result, align: "left"},
      ],
    };
  });
};
