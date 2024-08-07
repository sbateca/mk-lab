import {SyntheticEvent, useEffect, useState} from "react";
import {Autocomplete as MuiAutoComplete, TextField} from "@mui/material";
import {AutoCompleteOption} from "./types";

interface AutoCompleteProps {
  value: string;
  options: AutoCompleteOption[];
  label: string;
  variant: "standard" | "outlined" | "filled";
  onChange: (
    event: SyntheticEvent,
    value: AutoCompleteOption | null,
    name: string,
  ) => void;
  name: string;
  readOnly: boolean;
  required: boolean;
  error: boolean;
  helperText: string;
}

function AutoComplete({
  options,
  label,
  value,
  variant,
  onChange,
  name,
  readOnly,
  required,
  error,
  helperText,
}: AutoCompleteProps) {
  const [selectedOption, setSelectedOption] =
    useState<AutoCompleteOption | null>(
      options.find((option) => option.id === value) || null,
    );

  useEffect(() => {
    const selected = options.find((option) => option.id === value) || null;
    setSelectedOption(selected);
  }, [options]);

  const handleChange = (
    event: SyntheticEvent,
    newValue: AutoCompleteOption | null,
  ) => {
    onChange(event, newValue, name);
  };

  return (
    <MuiAutoComplete
      clearOnEscape
      options={options}
      getOptionLabel={(option: AutoCompleteOption) => option.optionLabel}
      value={selectedOption}
      onChange={handleChange}
      includeInputInList
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant={variant}
          required={required}
          error={error}
          helperText={helperText}
        />
      )}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      readOnly={readOnly}
    />
  );
}

export default AutoComplete;
