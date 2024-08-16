import {
  Select as MuiSelect,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material/";

import {SelectProps} from "./Types";

export const Select = ({
  required,
  label,
  readOnly,
  variant,
  defaultValue,
  menuItems,
  handleChange,
}: SelectProps) => {
  return (
    <FormControl required={required} variant="standard">
      <InputLabel variant={variant}>{label}</InputLabel>
      <MuiSelect
        value={defaultValue}
        onChange={handleChange}
        inputProps={{readOnly: readOnly}}
      >
        {menuItems.map((menuItem) => (
          <MenuItem key={`item_${menuItem.value}`} value={menuItem.value}>
            {menuItem.name}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};
