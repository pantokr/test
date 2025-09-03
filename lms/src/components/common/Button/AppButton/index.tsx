// AppButton.tsx
import { Button } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import React from "react";
import { AppButtonProps } from "../types";

interface AppButtonPropsExtended extends AppButtonProps {
  variantType?: "outline" | "filled" | "transparent";
}

export const AppButton: React.FC<AppButtonPropsExtended> = ({
  size = "medium",
  variantType = "filled",
  children,
  onClick,
  sx,
  ...props
}) => {
  const theme = useTheme();
  const baseColor = theme.palette.primary.main;
  const textColor =
    variantType === "filled"
      ? theme.palette.primary.contrastText
      : theme.palette.text.primary;

  // 크기별 스타일
  const sizeStyles = {
    small: { padding: "2px 8px", fontSize: "0.6rem", minHeight: 24 },
    medium: { padding: "3px 12px", fontSize: "1rem", minHeight: 32 },
    large: { padding: "4px 16px", fontSize: "1.6rem", minHeight: 40 },
  };

  // variant별 스타일
  const variantStyles = {
    outline: {
      backgroundColor: "transparent",
      color: textColor,
      border: `1px solid ${baseColor}`,
      boxShadow: "none",
      "&:hover": { backgroundColor: alpha(textColor, 0.05) },
    },
    filled: {
      backgroundColor: baseColor,
      color: textColor,
      boxShadow: theme.shadows[4],
      "&:hover": { backgroundColor: alpha(baseColor, 0.85) },
    },
    transparent: {
      backgroundColor: "transparent",
      color: textColor,
      boxShadow: "none",
      "&:hover": { backgroundColor: alpha(textColor, 0.05) },
    },
  };

  return (
    <Button
      onClick={onClick}
      size={size}
      sx={{
        textTransform: "none",
        fontWeight: 500,
        borderRadius: 8,
        ...sizeStyles[size],
        ...variantStyles[variantType],
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
