// src/types/context.ts

import type { ReactNode } from "react";

/**
 * 사이드바 색상 타입
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
 * 레이아웃 타입
 */
export type LayoutType = "dashboard" | "page" | "vr";

/**
 * Material UI Controller 상태
 */
export interface MaterialUIControllerState {
  darkMode: boolean;
  sidenavColor: SidenavColor;
  layout: LayoutType;
  openConfigurator: boolean;
}

/**
 * Material UI Controller 액션 타입
 */
export type MaterialUIControllerAction =
  | { type: "DARK_MODE"; value: boolean }
  | { type: "SIDENAV_COLOR"; value: SidenavColor }
  | { type: "LAYOUT"; value: LayoutType }
  | { type: "OPEN_CONFIGURATOR"; value: boolean };

/**
 * Material UI Controller 컨텍스트 타입
 */
export interface MaterialUIControllerContextType {
  controller: MaterialUIControllerState;
  dispatch: React.Dispatch<MaterialUIControllerAction>;
}

/**
 * Provider Props
 */
export interface MaterialUIControllerProviderProps {
  children: ReactNode;
}
