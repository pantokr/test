// src/components/common/AppTextButton/index.tsx
import { Button, ButtonProps } from "@mui/material";
import React from "react";

export interface AppTextButtonProps extends Omit<ButtonProps, "variant"> {
  underline?: boolean;
}

const AppTextButton: React.FC<AppTextButtonProps> = ({
  underline = true,
  sx,
  ...props
}) => {
  return (
    <Button
      variant="text"
      sx={{
        p: 0,
        minWidth: "auto",
        textTransform: "none",
        textDecoration: underline ? "underline" : "none",
        textDecorationColor: underline ? "currentColor" : "transparent",
        "&:hover": {
          backgroundColor: "transparent",
          textDecoration: underline ? "underline" : "none",
        },
        "&:focus": {
          backgroundColor: "transparent",
        },
        ...sx,
      }}
      {...props}
    />
  );
};

export default AppTextButton;
