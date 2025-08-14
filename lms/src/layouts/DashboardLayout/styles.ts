// src/layouts/DashboardLayout/styles.ts

import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { SIDENAV_WIDTH } from "@/constants";

/**
 * 메인 레이아웃 컨테이너 - 좌우 분할만 담당
 */
export const LayoutContainer = styled(Box)({
  display: "flex",
  height: "100vh",
  width: "100vw",
});

export const SidenavArea = styled(Box, {
  shouldForwardProp: (prop) => prop !== "show",
})<{ show: boolean }>(({ show }) => ({
  width: show ? SIDENAV_WIDTH : 0,
  transition: "width 0.3s ease",
  overflow: "hidden",
  flexShrink: 0, // 사이드바가 줄어들지 않게 고정
}));

export const MainArea = styled(Box)({
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 0,
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  alignItems: "center",
  justifyContent: "flex-start", // 맨 위에서부터 쌓이도록
  maxWidth: "100%",
  margin: "0 auto",
});
