import { Typography as MuiTypography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AppTypographyProps } from "./types";

export const StyledAppTypography = styled(MuiTypography)<AppTypographyProps>(
  () => ({
    // 기본 스타일
    margin: 0,
    lineHeight: 1.5,
  })
);
