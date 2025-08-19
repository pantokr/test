// styles.ts
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AppButtonProps } from "../types";

export const StyledAppButton = styled(Button)<AppButtonProps>(
  ({ size = "medium" }) => ({
    "&:focus": {
      outline: "none",
    },
    "&:focus-visible": {
      outline: "none",
    },

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
