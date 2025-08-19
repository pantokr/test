import { styled } from "@mui/material/styles";
import { IconButton as MuiIconButton } from "@mui/material";
import { AppIconButtonProps } from "../types";

export const StyledAppIconButton = styled(MuiIconButton)<AppIconButtonProps>(
  ({ size = "medium" }) => ({
    // 포커스 및 클릭 시 테두리 제거
    "&:focus": {
      outline: "none",
    },
    "&:focus-visible": {
      outline: "none",
    },

    // 크기별 스타일
    ...(size === "small" && {
      width: 32,
      height: 32,
      padding: 4,
      "& svg": {
        fontSize: "1.125rem",
      },
    }),
    ...(size === "medium" && {
      width: 40,
      height: 40,
      padding: 8,
      "& svg": {
        fontSize: "1.25rem",
      },
    }),
    ...(size === "large" && {
      width: 48,
      height: 48,
      padding: 12,
      "& svg": {
        fontSize: "1.5rem",
      },
    }),
  })
);
