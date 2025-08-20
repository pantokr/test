// AppButton.tsx
import { alpha, useTheme } from "@mui/material/styles";
import React from "react";
import { AppButtonProps } from "../types";
import { StyledAppButton } from "./styles";

export const AppButton: React.FC<AppButtonProps> = ({
  size = "medium",
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
      onClick={onClick}
      sx={{
        boxShadow: theme.shadows[4],
        backgroundColor: baseColor,
        "&:hover": {
          backgroundColor: alpha(baseColor, 0.75),
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </StyledAppButton>
  );
};
