import {useEffect, useState} from "react";

import {Card, CardContent, Grid, Typography} from "@mui/material";

import {Client, Sample, SampleType} from "../../../model";

interface SampleReportDetailsProps {
  sample: Sample | null;
  sampleTypes: SampleType[];
  clients: Client[];
}

interface SampleCardDetails {
  sampleCode: string;
  sampleType: string;
  client: string;
  getSampleDate: string;
  receptionDate: string;
  analysisDate: string;
  sampleLocation: string;
  responsable: string;
}

export const SampleReportDetails = ({
  sample,
  sampleTypes,
  clients,
}: SampleReportDetailsProps) => {
  const [sampleCardDetails, setSampleCardDetails] =
    useState<SampleCardDetails>();

  const getSampleTypeFromSample = () => {
    if (sample) {
      return sampleTypes.find(
        (sampleType) => sampleType.id === sample.sampleTypeId,
      );
    }
    return null;
  };

  const getClientFromSample = () => {
    if (sample) {
      return clients.find((client) => client.id === sample.clientId);
    }
    return null;
  };

  const getSampleCardDetails = (): SampleCardDetails => {
    return {
      sampleCode: sample ? sample.sampleCode : "",
      sampleType: getSampleTypeFromSample()?.name || "",
      client: getClientFromSample()?.name || "",
      getSampleDate: sample ? sample.getSampleDate : "",
      receptionDate: sample ? sample.receptionDate : "",
      analysisDate: sample ? sample.analysisDate : "",
      sampleLocation: sample ? sample.sampleLocation : "",
      responsable: sample ? sample.responsable : "",
    };
  };

  useEffect(() => {
    const sampleCardDetails = getSampleCardDetails();
    setSampleCardDetails(sampleCardDetails);
  }, [sample]);

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          Sample information
        </Typography>
        {sample ? (
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Sample Code:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {sampleCardDetails?.sampleCode}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Sample Type:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {sampleCardDetails?.sampleType}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Client:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {sampleCardDetails?.client}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Get Sample Date:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {sampleCardDetails?.getSampleDate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Reception Date:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {sampleCardDetails?.receptionDate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Analysis Date:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {sampleCardDetails?.analysisDate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Sample Location:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {sampleCardDetails?.sampleLocation}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Responsable:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {sampleCardDetails?.responsable}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No sample content
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
