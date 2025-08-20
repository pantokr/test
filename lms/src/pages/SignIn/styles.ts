import { AppPaper } from "@/components/common";
import { AppBox } from "@/components/common/Box";
import { alpha, styled } from "@mui/material";

export const StyledPaper = styled(AppPaper)(({ theme }) => ({
  backdropFilter: "blur(20px)",
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  borderRadius: theme.spacing(2),
  boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
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
