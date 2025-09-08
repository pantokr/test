// src/types/layout.ts

/**
 * 대시보드 레이아웃 Props
 */
export interface DashboardLayoutProps {
  title?: string;
  showPreferenceToggle?: boolean;
  mode?: "full" | "scroll"; // ✅ 레이아웃 모드
  children: React.ReactNode;
}

/**
 * 레이아웃 컨테이너 Props
 */
export interface LayoutContainerProps {
  hasSidenav: boolean;
  darkMode: boolean;
}

/**
 * 메인 컨텐츠 영역 Props
 */
export interface MainContentProps {
  hasSidenav: boolean;
  hasNavbar: boolean;
  hasFooter: boolean;
}

/**
 * 네비게이션 바 Props
 */
export interface NavbarProps {
  title?: string;
  transparent?: boolean;
  light?: boolean;
  absolute?: boolean;
  isMini?: boolean;
}

/**
 * 푸터 Props
 */
export interface FooterProps {
  company?: {
    href: string;
    name: string;
  };
  links?: Array<{
    href: string;
    name: string;
  }>;
}
