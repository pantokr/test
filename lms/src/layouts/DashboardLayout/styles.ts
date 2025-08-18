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
  // Flex 관련 속성들
  flexGrow: 1, // 남은 공간을 모두 차지
  flexShrink: 1, // 공간이 부족하면 축소 가능
  flexBasis: 0, // 초기 크기를 0으로 설정

  // 레이아웃 설정
  display: "flex",
  flexDirection: "column", // 세로 방향으로 자식 요소 배치

  // 스크롤 및 크기 제한
  overflow: "hidden", // auto에서 hidden으로 변경
  maxWidth: "100%", // 최대 너비를 부모의 100%로 제한

  // 정렬 설정
  alignItems: "center", // 가로축 중앙 정렬 (자식 요소들)
  justifyContent: "flex-start", // 세로축 상단 정렬 (자식 요소들)

  // 마진 설정
  margin: "0 auto", // 좌우 중앙 정렬 (자기 자신)
});
