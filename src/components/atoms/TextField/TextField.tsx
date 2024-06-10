import {TextField as MuiTextField} from "@mui/material";

import {TexFieldProps} from "./Types";

function TextField({
  name,
  label,
  variant,
  type,
  value,
  onChange,
  onBlur,
  required,
  error,
}: TexFieldProps): React.ReactElement {
  return (
    <MuiTextField
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

export default TextField;
