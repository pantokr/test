// AppButton.tsx
import { Button } from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";
import React from "react";
import { AppButtonProps } from "../types";

const StyledAppButton = styled(Button)<AppButtonProps>(
  ({ size = "medium" }) => ({
    // 기본 스타일
    textTransform: "none",
    fontWeight: 500,
    borderRadius: 8,
    border: "none",
    color: "#fff", // ✅ 기본 글자색 흰색

    // 크기별 스타일
    ...(size === "small" && {
      padding: "4px 8px",
      fontSize: "0.875rem",
      minHeight: 32,
    }),
    ...(size === "medium" && {
      padding: "6px 16px",
      fontSize: "1rem",
      minHeight: 36,
    }),
    ...(size === "large" && {
      padding: "8px 22px",
      fontSize: "1.125rem",
      minHeight: 42,
    }),
  })
);

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
