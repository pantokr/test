// src/types/context.ts - 다크모드를 UserSettings에 포함

export type SidenavColor = "blue" | "green" | "deepPurple" | "blueGrey";

export interface UserSettings {
  darkMode: boolean; // 다크모드를 사용자 설정에 포함
  fontSize: "small" | "medium" | "large";
  fontFamily: "default" | "serif" | "monospace";
  colorScheme: "blue" | "green" | "deepPurple" | "blueGrey";
  compactMode: boolean;
  language: "ko" | "en" | "ja";
}

export interface MaterialUIControllerState {
  // darkMode 제거 - 이제 userSettings.darkMode 사용
  sidenavColor: SidenavColor;
  userSettings: UserSettings;
  sidenavOpen: boolean;
}

export type MaterialUIControllerAction =
  // DARK_MODE 액션 제거 - UPDATE_USER_SETTINGS로 처리
  | { type: "SIDENAV_COLOR"; value: SidenavColor }
  | { type: "UPDATE_USER_SETTINGS"; value: Partial<UserSettings> }
  | { type: "RESET_USER_SETTINGS" }
  | { type: "TOGGLE_SIDENAV" }
  | { type: "CLOSE_SIDENAV" }
  | { type: "OPEN_SIDENAV" };
