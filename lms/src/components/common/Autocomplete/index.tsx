// AppAutocomplete.tsx (예시)
import { Autocomplete, AutocompleteProps, TextField } from "@mui/material";
import React from "react";

export interface AppAutocompleteProps
  extends AutocompleteProps<string, false, false, false> {
  label: string;
  options: string[];
}

export const AppAutocomplete: React.FC<AppAutocompleteProps> = ({
  label,
  options,
  ...props
}) => {
  return (
    <Autocomplete
      options={options}
      {...props}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};
