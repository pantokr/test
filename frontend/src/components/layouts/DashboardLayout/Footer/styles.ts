import { AppBox } from "@/components/common/Box";
import { styled } from "@mui/material";

// 스타일드 컴포넌트 내부 정의 - fixed 제거
export const FooterContainer = styled(AppBox)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  width: "100%",
  padding: theme.spacing(1),
  // fixed 제거하고 일반 블록 요소로 변경
}));

export const FooterContent = styled(AppBox)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "0 auto",
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 0,

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: theme.spacing(1),
    textAlign: "center",
  },
}));
