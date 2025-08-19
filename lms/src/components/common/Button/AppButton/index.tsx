// AppButton.tsx
import { alpha, useTheme } from "@mui/material/styles";
import React from "react";
import { AppButtonProps } from "../types";
import { StyledAppButton } from "./styles";

export const AppButton: React.FC<AppButtonProps> = ({
  size = "medium",
  buttonStyle = "text",
  children,
  onClick,
  sx,
  ...props
}) => {
  const theme = useTheme();
  const baseColor = theme.palette.primary.main;

  return (
    <StyledAppButton
      size={size}
      variant={buttonStyle}
      onClick={onClick}
      sx={{
        backgroundColor: baseColor, // ✅ 연한 primary 색
        "&:hover": {
          backgroundColor: alpha(baseColor, 0.3), // ✅ hover 시 살짝 진하게
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </StyledAppButton>
  );
};
