// src/components/common/TextField/TextField.tsx
import { TextField, TextFieldProps } from "@mui/material";
import React, { useState } from "react";

interface AppTextFieldProps extends Omit<TextFieldProps, "value" | "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
}

export const AppTextField: React.FC<AppTextFieldProps> = ({
  label,
  value,
  onChange,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(value || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <TextField
      label={label}
      value={onChange ? value || "" : internalValue}
      onChange={handleChange}
      variant="outlined"
      size="small"
      {...props}
    />
  );
};
