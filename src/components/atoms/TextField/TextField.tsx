import {TextField} from "@mui/material";

import {TexFieldProps} from "./Types";

function TextFieldComponent({
  name,
  label,
  variant,
  type,
  value,
  onChange,
  onBlur,
  required,
  error,
}: TexFieldProps) {
  return (
    <TextField
      name={name}
      label={label}
      variant={variant}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      required={required}
    />
  );
}

export default TextFieldComponent;
