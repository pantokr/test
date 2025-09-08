// src/layouts/DashboardLayout/styles.ts

import { AppBox } from "@/components/common/Box";
import { styled } from "@mui/material/styles";

/**
 * 메인 레이아웃 컨테이너
 */
export const LayoutContainer = styled(AppBox)({
  display: "flex",
  width: "100vw",
  height: "100vh",
  overflow: "hidden", // 전체 레이아웃에서 스크롤 없음
});

/**
 * 사이드바 영역
 */
export const SidenavArea = styled(AppBox)(({ width }: { width: number }) => ({
  width: width,
  flexShrink: 0,
  transition: "width 0.3s ease",
  overflow: "hidden",
}));

/**
 * 메인 콘텐츠 영역
 */
export const MainArea = styled(AppBox)<{ mode: "full" | "scroll" }>(
  ({ mode }) => ({
    flex: 1, // ⚡ Sidenav를 제외한 나머지 영역 차지
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    width: "100%", // flex:1과 함께 안전하게 전체 폭 차지
    ...(mode === "scroll" && {
      overflowY: "auto", // 내부 스크롤
    }),
  })
);
