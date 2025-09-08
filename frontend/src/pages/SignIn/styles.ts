import { AppPaper } from "@/components/common";
import { AppBox } from "@/components/common/Box";
import { alpha, styled } from "@mui/material";

export const StyledPaper = styled(AppPaper)(({ theme }) => ({
  backdropFilter: "blur(40px)",

  // ⚡ 보라색 투명 그라디언트 배경
  background: "rgba(54, 0, 0, 0.25)",
  // "linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1))",
  // backgroundColor: "transparent",
  color: "white",
  boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
  borderRadius: 0, // ⚡ 둥근 모서리 제거

  maxWidth: 400,
  width: "100%",

  [theme.breakpoints.down("sm")]: {
    margin: theme.spacing(2),
    maxWidth: "calc(100% - 32px)",
  },
}));

export const LogoBox = styled(AppBox)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(3),

  "& img": {
    height: 48,
    width: "auto",
  },
}));
