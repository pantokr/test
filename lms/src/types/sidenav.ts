// src/types/sidenav.ts

import type { ReactNode } from "react";

/**
 * 사이드바 색상 옵션
 */
export type SidenavColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "light"
  | "dark";

/**
 * 사이드바 브랜드 정보
 */
export interface SidenavBrand {
  name: string;
  logo?: string;
  href?: string;
}

/**
 * 사이드바 라우트 아이템
 */
export interface SidenavRoute {
  key: string;
  name?: string;
  icon?: ReactNode | string;
  route?: string;
  component?: ReactNode;
  collapse?: SidenavRoute[];
  noCollapse?: boolean;
  href?: string;
  target?: "_blank" | "_self";
  badge?: {
    color: string;
    content: string | number;
  };
  divider?: boolean; // 구분선
  title?: string; // 섹션 제목
}

/**
 * 사이드바 컬랩스 아이템 Props (내부용)
 */
export interface SidenavItemInternalProps {
  route: SidenavRoute;
  color: SidenavColor;
  darkMode: boolean;
}

/**
 * 사이드바 루트 Props
 */
export interface SidenavRootProps {
  color: SidenavColor;
  brand: SidenavBrand;
  routes: SidenavRoute[];
  open?: boolean;
  onClose?: () => void;
}

/**
 * 사이드바 메인 컴포넌트 Props
 */
export interface SidenavProps {
  color?: SidenavColor;
  brand?: string;
  brandName?: string;
  routes: SidenavRoute[];
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

/**
 * 사이드바 스타일 Props
 */
export interface SidenavStyleProps {
  theme: any;
  ownerState: {
    darkMode: boolean;
    miniSidenav?: boolean;
  };
}

/**
 * 사이드바 컬랩스 스타일 Props
 */
export interface SidenavItemStyleProps {
  theme: any;
  ownerState: {
    active: boolean;
    noCollapse: boolean;
    open: boolean;
    darkMode: boolean;
  };
}
