// src/context/theme/ThemeProvider.tsx
import React, { useReducer, useMemo, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { createAppTheme } from "@/assets/theme";
import type { SidenavColor, UserSettings } from "@/types/context";
import {
  ThemeContext,
  themeReducer,
  getInitialState,
  defaultUserSettings,
} from "./ThemeContext";
import type { ThemeContextType } from "./ThemeContext";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // 초기 상태를 함수로 호출하여 로컬 스토리지 값이 포함된 상태로 시작
  const [controller, dispatch] = useReducer(themeReducer, getInitialState());

  // 초기화 완료 추적을 위한 ref
  const isInitialized = useRef(false);

  // 초기화 완료 표시
  useEffect(() => {
    isInitialized.current = true;
  }, []);

  // 설정 변경 시에만 로컬 스토리지에 저장 (초기 마운트 시에는 저장하지 않음)
  useEffect(() => {
    // 초기화가 완료된 후에만 저장
    if (isInitialized.current) {
      localStorage.setItem(
        "userSettings",
        JSON.stringify(controller.userSettings)
      );
    }
  }, [controller.userSettings]);

  // 편의 함수들
  const setSidenavColor = (color: SidenavColor) => {
    dispatch({ type: "SIDENAV_COLOR", value: color });
  };

  const updateUserSettings = (settings: Partial<UserSettings>) => {
    dispatch({ type: "UPDATE_USER_SETTINGS", value: settings });
  };

  const resetUserSettings = () => {
    dispatch({ type: "RESET_USER_SETTINGS" });
  };

  const toggleSidenav = () => {
    dispatch({ type: "TOGGLE_SIDENAV" });
  };

  const closeSidenav = () => {
    dispatch({ type: "CLOSE_SIDENAV" });
  };

  const openSidenav = () => {
    dispatch({ type: "OPEN_SIDENAV" });
  };

  // 다크모드 편의 함수
  const toggleDarkMode = () => {
    updateUserSettings({ darkMode: !controller.userSettings.darkMode });
  };

  // 테마 메모이제이션
  const theme = useMemo(() => {
    return createAppTheme(
      controller.userSettings.darkMode ? "dark" : "light",
      controller.userSettings
    );
  }, [controller.userSettings]);

  // 글로벌 스타일
  const globalStyles = useMemo(
    () => ({
      "*::-webkit-scrollbar": {
        width: 8,
        height: 8,
      },
      "*::-webkit-scrollbar-track": {
        backgroundColor: controller.userSettings.darkMode
          ? "#2e2e2e"
          : "#f1f1f1",
        borderRadius: 4,
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: controller.userSettings.darkMode ? "#555" : "#c1c1c1",
        borderRadius: 4,
        "&:hover": {
          backgroundColor: controller.userSettings.darkMode
            ? "#777"
            : "#a8a8a8",
        },
      },
      "::selection": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      },
      html: {
        scrollBehavior: "smooth",
      },
    }),
    [controller.userSettings.darkMode, theme.palette.primary]
  );

  const contextValue: ThemeContextType = useMemo(
    () => ({
      controller,
      dispatch,
      setSidenavColor,
      updateUserSettings,
      resetUserSettings,
      toggleSidenav,
      closeSidenav,
      openSidenav,
      toggleDarkMode,
    }),
    [controller]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyles} />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
