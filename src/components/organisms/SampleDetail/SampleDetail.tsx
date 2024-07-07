import {
  Box,
  Divider,
  Stack,
  TextField,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {SampleDetailStyles} from "./SampleDetailStyles";
import Typography from "../../atoms/Typography/Typography";
import {CommonTextFieldProps, SampleDetailProps} from "./Types";
import {
  SampleDetailsFields,
  SharedTypographyAlign,
  SharedTypographyColors,
  SharedTypographyVariants,
} from "../../../utils/enums";
import {SAMPLES_PAGE_DETAIL_TITLE} from "../../../utils/constants/pages/samples";

function SampleDetail({sample}: SampleDetailProps) {
  const commonTextFieldProps: CommonTextFieldProps = {
    variant: "standard",
    fullWidth: true,
    InputProps: {
      readOnly: true,
    },
  };
  const theme = useTheme<Theme>();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        ...SampleDetailStyles.container,
        width: isMediumScreen ? "80vw" : "50vw",
      }}
    >
      <Typography
        text={SAMPLES_PAGE_DETAIL_TITLE}
        variant={SharedTypographyVariants.H6}
        align={SharedTypographyAlign.LEFT}
        color={SharedTypographyColors.PRIMARY}
        padding="0 0 5px 0"
      />
      <Divider />
      <Stack
        {...SampleDetailStyles.stackContainer}
        padding={isMediumScreen ? "5px" : "20px"}
      >
        <Stack
          {...SampleDetailStyles.stackRow}
          direction={isMediumScreen ? "column" : "row"}
          spacing={isMediumScreen ? 2 : 0}
        >
          <TextField
            label={SampleDetailsFields.SAMPLE_CODE}
            value={sample?.sampleCode}
            {...commonTextFieldProps}
          />
          <TextField
            label={SampleDetailsFields.CLIENT}
            value={sample?.client}
            {...commonTextFieldProps}
          />
        </Stack>
        <Stack
          {...SampleDetailStyles.stackRow}
          direction={isMediumScreen ? "column" : "row"}
          spacing={isMediumScreen ? 2 : 0}
        >
          <TextField
            label={SampleDetailsFields.GET_SAMPLE_DATE}
            value={sample?.getSampleDate}
            {...commonTextFieldProps}
          />
          <TextField
            label={SampleDetailsFields.RECEPTION_DATE}
            value={sample?.receptionDate}
            {...commonTextFieldProps}
          />
        </Stack>
        <Stack
          {...SampleDetailStyles.stackRow}
          direction={isMediumScreen ? "column" : "row"}
          spacing={isMediumScreen ? 2 : 0}
        >
          <TextField
            label={SampleDetailsFields.ANALYSIS_DATE}
            value={sample?.analysisDate}
            {...commonTextFieldProps}
          />
          <TextField
            label={SampleDetailsFields.SAMPLE_LOCATION}
            value={sample?.sampleLocation}
            {...commonTextFieldProps}
          />
        </Stack>
        <Stack
          {...SampleDetailStyles.stackRow}
          direction={isMediumScreen ? "column" : "row"}
          spacing={isMediumScreen ? 2 : 0}
        >
          <TextField
            label={SampleDetailsFields.RESPONSABLE}
            value={sample?.responsable}
            {...commonTextFieldProps}
          />
        </Stack>
      </Stack>
    </Box>
  );
}

export default SampleDetail;
