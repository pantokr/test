import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useState } from "react";

interface AppPasswordFieldProps
  extends Omit<TextFieldProps, "value" | "onChange" | "type"> {
  value?: string;
  onChange?: (value: string) => void;
}

export const AppPasswordField: React.FC<AppPasswordFieldProps> = ({
  label,
  value,
  onChange,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState(value || "");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <TextField
      label={label}
      type={showPassword ? "text" : "password"}
      value={onChange ? value || "" : internalValue}
      onChange={handleChange}
      variant="outlined"
      size="small"
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="small"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
};
