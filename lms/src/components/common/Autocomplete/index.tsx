// AppAutocomplete.tsx (예시)
import { Autocomplete, AutocompleteProps } from "@mui/material";
import React from "react";
import { AppTextField } from "../TextField";

interface AppAutocompleteProps
  extends AutocompleteProps<any, boolean, boolean, boolean> {
  label: string;
  options: any[];
  required?: boolean;
}

export const AppAutocomplete: React.FC<AppAutocompleteProps> = ({
  label,
  options,
  required = true,
  ...props
}) => {
  return (
    <Autocomplete
      options={options}
      {...props}
      renderInput={(params) => (
        <AppTextField {...params} label={label} required={required} />
      )}
    />
  );
};
