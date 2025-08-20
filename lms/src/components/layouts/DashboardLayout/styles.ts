// src/layouts/DashboardLayout/styles.ts

import { AppBox } from "@/components/common/Box";
import { styled } from "@mui/material/styles";

/**
 * 메인 레이아웃 컨테이너 - 좌우 분할만 담당
 */
export const LayoutContainer = styled(AppBox)({
  display: "flex",
  height: "100vh",
  width: "100vw",
  // ✅ 전체 패딩 제거
});

export const SidenavArea = styled(AppBox)(({ width }: { width: number }) => ({
  width: width,
  transition: "width 0.3s ease",
  overflow: "hidden",
  flexShrink: 0, // 사이드바가 줄어들지 않게 고정
  // ✅ SidenavArea는 패딩 없음 (sidenav가 화면 끝까지)
}));

export const MainArea = styled(AppBox)(({ theme }) => ({
  // Flex 관련 속성들
  flexGrow: 1, // 남은 공간을 모두 차지
  flexShrink: 1, // 공간이 부족하면 축소 가능
  flexBasis: 0, // 초기 크기를 0으로 설정

  // 레이아웃 설정
  display: "flex",
  flexDirection: "column", // 세로 방향으로 자식 요소 배치

  // ✅ MainArea에만 패딩 적용
  padding: theme.spacing(2), // 16px 패딩

  // 스크롤 및 크기 제한
  overflow: "hidden",
  maxWidth: "100%", // 최대 너비를 부모의 100%로 제한

  // 정렬 설정
  alignItems: "center", // 가로축 중앙 정렬 (자식 요소들)
  justifyContent: "flex-start", // 세로축 상단 정렬 (자식 요소들)

  // 마진 설정
  margin: "0 auto", // 좌우 중앙 정렬 (자기 자신)

  // ✅ 박스 사이징으로 패딩이 width에 포함되도록
  boxSizing: "border-box",
}));
