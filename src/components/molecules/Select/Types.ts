import {SelectChangeEvent} from "@mui/material";

export interface MenuItem {
  value: string;
  name: string;
}

export interface SelectProps {
  readOnly: boolean;
  label: string;
  required: boolean;
  variant: "standard" | "outlined" | "filled";
  defaultValue: string;
  menuItems: MenuItem[];
  handleChange: (event: SelectChangeEvent<string>) => void;
}
