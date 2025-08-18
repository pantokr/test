// src/context/theme/actions.ts - layout 관련 제거

import type {
  MaterialUIControllerAction,
  SidenavColor,
  UserSettings,
} from "@/types/context";

// 기존 호환성을 위한 액션 크리에이터들
export const setSidenavColor = (
  dispatch: React.Dispatch<MaterialUIControllerAction>,
  value: SidenavColor
): void => {
  dispatch({ type: "SIDENAV_COLOR", value });
};

// 사용자 설정 액션 크리에이터들
export const updateUserSettings = (
  dispatch: React.Dispatch<MaterialUIControllerAction>,
  value: Partial<UserSettings>
): void => {
  dispatch({ type: "UPDATE_USER_SETTINGS", value });
};

export const resetUserSettings = (
  dispatch: React.Dispatch<MaterialUIControllerAction>
): void => {
  dispatch({ type: "RESET_USER_SETTINGS" });
};

// 다크모드 액션 크리에이터 (toggleDarkMode만 유지)
export const toggleDarkMode = (
  dispatch: React.Dispatch<MaterialUIControllerAction>,
  currentDarkMode: boolean
): void => {
  dispatch({
    type: "UPDATE_USER_SETTINGS",
    value: { darkMode: !currentDarkMode },
  });
};

// 사이드바 액션 크리에이터들
export const toggleSidenav = (
  dispatch: React.Dispatch<MaterialUIControllerAction>
): void => {
  dispatch({ type: "TOGGLE_SIDENAV" });
};

export const closeSidenav = (
  dispatch: React.Dispatch<MaterialUIControllerAction>
): void => {
  dispatch({ type: "CLOSE_SIDENAV" });
};

export const openSidenav = (
  dispatch: React.Dispatch<MaterialUIControllerAction>
): void => {
  dispatch({ type: "OPEN_SIDENAV" });
};
