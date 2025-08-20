// src/types/context.ts - 다크모드를 ThemeSettings에 포함

export type AppColorSchemes = "blueGrey" | "blue" | "green" | "deepPurple";

export interface ThemeSettings {
  darkMode: boolean; // 다크모드를 사용자 설정에 포함
  fontSize: "small" | "medium" | "large";
  fontFamily: "default" | "serif" | "monospace";
  colorScheme: AppColorSchemes;
  compactMode: boolean;
  language: "ko" | "en" | "ja";
}
