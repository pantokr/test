// src/types/sidenav.ts

import { RouteItem } from "@/routes/types";
import { AppColorSchemes } from "@/types";

/**
 * 사이드바 브랜드 정보
 */
export interface SidenavBrand {
  name: string;
  logo?: string;
  href?: string;
}

/**
 * 사이드바 컬랩스 아이템 Props (내부용)
 */
export interface SidenavItemInternalProps {
  route: RouteItem;
  color: AppColorSchemes;
  darkMode: boolean;
}

/**
 * 사이드바 루트 Props
 */
export interface SidenavRootProps {
  color: AppColorSchemes;
  brand: SidenavBrand;
  routes: RouteItem[];
  open?: boolean;
  onClose?: () => void;
}

/**
 * 사이드바 메인 컴포넌트 Props
 */
export interface SidenavProps {
  color?: AppColorSchemes;
  brand?: string;
  brandName?: string;
  routes: RouteItem[];
  isOpen?: boolean;
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
    open: boolean;
    darkMode: boolean;
  };
}
