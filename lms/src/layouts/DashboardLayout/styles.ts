// src/layouts/DashboardLayout/styles.ts

import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { SIDENAV_WIDTH } from "@/constants";

/**
 * 메인 레이아웃 컨테이너 - 좌우 분할만 담당
 */
export const LayoutContainer = styled(Box)({
  display: "flex",
  minHeight: "100vh",
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

export const MainArea = styled("div")({
  flexGrow: 1, // 남은 공간 다 차지
  flexShrink: 1, // 필요시 줄어듦
  flexBasis: 0, // 초기 기준 0
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
});
