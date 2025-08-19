// src/components/common/ComboBox/ComboBox.tsx
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

interface Option {
  label: string;
  value: string;
}

interface ComboBoxProps {
  label?: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
}

export const AppComboBox: React.FC<ComboBoxProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <FormControl fullWidth size="small">
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        value={value || ""}
        label={label}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
