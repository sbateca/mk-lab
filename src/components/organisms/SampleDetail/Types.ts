import {Sample} from "../../../model/Sample";

export interface SampleDetailProps {
  sample: Sample;
}

export interface CommonTextFieldProps {
  variant: "standard" | "outlined" | "filled";
  fullWidth: boolean;
  InputProps: {
    readOnly: boolean;
  };
}
