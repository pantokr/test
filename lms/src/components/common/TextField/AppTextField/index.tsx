import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

type AppTextFieldProps = TextFieldProps & {
  // 필요한 경우 추가 커스텀 props를 여기에 정의
};

export const AppTextField: React.FC<AppTextFieldProps> = ({
  variant = "outlined",
  size = "small",
  fullWidth = false,
  ...props
}) => {
  return (
    <TextField variant={variant} size={size} fullWidth={fullWidth} {...props} />
  );
};

export default AppTextField;
