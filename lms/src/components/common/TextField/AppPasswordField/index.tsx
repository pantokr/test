// src/components/common/TextField/AppPasswordField.tsx
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment, TextFieldProps } from "@mui/material";
import React, { useState } from "react";
import { AppIconButton } from "../../Button";
import AppTextField from "../AppTextField";

type AppPasswordFieldProps = Omit<TextFieldProps, "type"> & {
  // 추가 커스텀 props가 필요하면 여기에
  showPasswordIcon?: boolean; // 비밀번호 표시 아이콘 표시 여부
  showLockIcon?: boolean; // 자물쇠 아이콘 표시 여부
};

export const AppPasswordField: React.FC<AppPasswordFieldProps> = ({
  label = "비밀번호",
  placeholder = "비밀번호를 입력하세요",
  fullWidth = true,
  required = true,
  sx = { mb: 2 },
  showPasswordIcon = true,
  showLockIcon = true,
  slotProps,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AppTextField
      fullWidth={fullWidth}
      label={label}
      type={showPassword ? "text" : "password"}
      autoComplete="current-password"
      placeholder={placeholder}
      required={required}
      sx={sx}
      slotProps={{
        input: {
          startAdornment: showLockIcon ? (
            <InputAdornment position="start">
              <Lock color="action" />
            </InputAdornment>
          ) : undefined,
          endAdornment: showPasswordIcon ? (
            <InputAdornment position="end">
              <AppIconButton
                onClick={handleTogglePassword}
                aria-label="toggle password visibility"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </AppIconButton>
            </InputAdornment>
          ) : undefined,
          ...slotProps?.input, // 추가 input props 병합
        },
        ...slotProps, // 기타 slotProps 병합
      }}
      {...props}
    />
  );
};

export default AppPasswordField;
