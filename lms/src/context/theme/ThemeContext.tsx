// src/context/theme/ThemeContext.tsx
import { createContext } from "react";
import type {
  MaterialUIControllerState,
  MaterialUIControllerAction,
  SidenavColor,
  UserSettings,
} from "@/types/context";

// 기본 사용자 설정 (다크모드 포함)
export const defaultUserSettings: UserSettings = {
  darkMode: false, // 다크모드를 사용자 설정에 포함
  fontSize: "medium",
  fontFamily: "default",
  colorScheme: "blue",
  compactMode: false,
  language: "ko",
};

// 초기 상태를 함수로 변경 - 로컬 스토리지에서 바로 로드
export const getInitialState = (): MaterialUIControllerState => {
  let userSettings = defaultUserSettings;

  // 브라우저 환경에서만 localStorage 접근
  if (typeof window !== "undefined") {
    try {
      const savedSettings = localStorage.getItem("userSettings");
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        userSettings = { ...defaultUserSettings, ...parsedSettings };
      }
    } catch (error) {
      console.error("Failed to load user settings:", error);
    }
  }

  return {
    sidenavColor: "blueGrey",
    userSettings,
    sidenavOpen: false,
  };
};

// Reducer (LAYOUT 액션 제거)
export const themeReducer = (
  state: MaterialUIControllerState,
  action: MaterialUIControllerAction
): MaterialUIControllerState => {
  switch (action.type) {
    case "SIDENAV_COLOR":
      return { ...state, sidenavColor: action.value };
    case "UPDATE_USER_SETTINGS":
      return {
        ...state,
        userSettings: { ...state.userSettings, ...action.value },
      };
    case "RESET_USER_SETTINGS":
      return {
        ...state,
        userSettings: defaultUserSettings,
      };
    case "TOGGLE_SIDENAV":
      return { ...state, sidenavOpen: !state.sidenavOpen };
    case "CLOSE_SIDENAV":
      return { ...state, sidenavOpen: false };
    case "OPEN_SIDENAV":
      return { ...state, sidenavOpen: true };
    default:
      return state;
  }
};

// 테마 컨텍스트 타입
export interface ThemeContextType {
  controller: MaterialUIControllerState;
  dispatch: React.Dispatch<MaterialUIControllerAction>;
  setSidenavColor: (color: SidenavColor) => void;
  updateUserSettings: (settings: Partial<UserSettings>) => void;
  resetUserSettings: () => void;
  toggleSidenav: () => void;
  closeSidenav: () => void;
  openSidenav: () => void;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
