// src/context/theme/hooks.ts - 다크모드 통합 버전

import type {
  MaterialUIControllerAction,
  MaterialUIControllerState,
} from "@/components/layouts/DashboardLayout/context";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

// 기존 호환성을 위한 메인 훅
export const useMaterialUIController = (): [
  MaterialUIControllerState,
  React.Dispatch<MaterialUIControllerAction>
] => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useMaterialUIController must be used within a ThemeProvider"
    );
  }
  return [context.controller, context.dispatch];
};

// 전체 테마 컨텍스트 접근
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// 사용자 설정 전용 훅 (setDarkMode 제거)
export const useUserSettings = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useUserSettings must be used within a ThemeProvider");
  }
  return {
    userSettings: context.controller.userSettings,
    updateUserSettings: context.updateUserSettings,
    resetUserSettings: context.resetUserSettings,
    // 다크모드 편의 함수 (toggleDarkMode만 유지)
    toggleDarkMode: context.toggleDarkMode,
    isDark: context.controller.userSettings.darkMode,
  };
};

// 다크모드 전용 훅 (setDark 제거)
export const useDarkMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a ThemeProvider");
  }
  return {
    isDark: context.controller.userSettings.darkMode,
    toggle: context.toggleDarkMode,
  };
};

export const useSidenav = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useSidenav must be used within a ThemeProvider");
  }
  return {
    sidenavColor: context.controller.sidenavColor,
    isSidenavOpen: context.controller.isSidenavOpen,
    toggleSidenav: context.toggleSidenav,
    closeSidenav: context.closeSidenav,
  };
};
