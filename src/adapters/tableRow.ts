import {TableRowProps} from "../components/molecules/TableRow/Types";
import {Client, Sample, SampleType, Report} from "../model";

interface GenericModelWithId {
  id: string;
}

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

const findModelById = <T extends GenericModelWithId>(
  id: string | undefined,
  models: T[] | null,
) => {
  return models?.find((model) => model.id === id);
};

export const reportsToTableRows = (
  reports: Report[],
  samples: Sample[] | null,
  sampleTypes: SampleType[] | null,
): TableRowProps[] => {
  return reports.map((report) => {
    const reportCellContent = getSampleTypeCellContent(
      report.sampleId,
      samples,
      sampleTypes,
    );
    return {
      id: report.id,
      cells: [
        {children: report.reportDate, align: "left"},
        {
          children: reportCellContent,
          align: "left",
        },
        {children: report.analyte, align: "left"},
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
  return filteredSample ? `${sampleTypeName?.name}` : "N/A";
};
