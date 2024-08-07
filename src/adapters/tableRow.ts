import {TableRowProps} from "../components/molecules/TableRow/Types";
import {Client, Sample, SampleType, Report, Analyte} from "../model";
import {findModelById} from "../utils/model";

export const samplesToTableRows = (
  samples: Sample[],
  sampleTypes: SampleType[] | null,
  clients: Client[] | null,
): TableRowProps[] => {
  return samples.map((sample) => {
    const sampleType = findModelById(sample.sampleTypeId, sampleTypes);
    const client = findModelById(sample.clientId, clients);
    return {
      id: sample.id,
      cells: [
        {children: sampleType ? sampleType.name : "N/A", align: "left"},
        {children: client ? client.name : "N/A", align: "left"},
        {children: sample.getSampleDate, align: "left"},
        {children: sample.receptionDate, align: "left"},
      ],
    };
  });
};

export const reportsToTableRows = (
  reports: Report[],
  samples: Sample[] | null,
  sampleTypes: SampleType[] | null,
  analytes: Analyte[] | null,
): TableRowProps[] => {
  return reports.map((report) => {
    const sampleTypeCellContent = getSampleTypeCellContent(
      report.sampleId,
      samples,
      sampleTypes,
    );
    const analyteCellContent =
      analytes?.find((analyte) => analyte.id === report.analyte)?.name ?? "N/A";
    return {
      id: report.id,
      cells: [
        {children: report.reportDate, align: "left"},
        {
          children: sampleTypeCellContent,
          align: "left",
        },
        {children: analyteCellContent, align: "left"},
        {children: report.result, align: "left"},
      ],
    };
  });
};

const getSampleTypeCellContent = (
  sampleId: string,
  samples: Sample[] | null,
  sampleTypes: SampleType[] | null,
): string => {
  const filteredSample = samples?.filter((sample) => sample.id === sampleId)[0];
  const sampleTypeName = findModelById(
    filteredSample?.sampleTypeId,
    sampleTypes || [],
  );
  return filteredSample
    ? `${filteredSample.sampleCode} - ${sampleTypeName?.name}`
    : "N/A";
};
