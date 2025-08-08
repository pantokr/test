// src/context/theme/index.tsx

import React, { createContext, useContext, useReducer, useMemo } from "react";
import type { ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { createAppTheme } from "@/assets/theme";
import type {
  MaterialUIControllerState,
  MaterialUIControllerAction,
  SidenavColor,
  LayoutType,
} from "@/types/context";

// 통합된 테마 컨텍스트
interface ThemeContextType {
  controller: MaterialUIControllerState;
  dispatch: React.Dispatch<MaterialUIControllerAction>;
  // 편의 함수들
  toggleDarkMode: () => void;
  setSidenavColor: (color: SidenavColor) => void;
  setLayout: (layout: LayoutType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 초기 상태
const initialState: MaterialUIControllerState = {
  darkMode: false,
  sidenavColor: "info",
  layout: "dashboard",
  openConfigurator: false,
};

// Reducer
const themeReducer = (
  state: MaterialUIControllerState,
  action: MaterialUIControllerAction
): MaterialUIControllerState => {
  switch (action.type) {
    case "DARK_MODE":
      return { ...state, darkMode: action.value };
    case "SIDENAV_COLOR":
      return { ...state, sidenavColor: action.value };
    case "LAYOUT":
      return { ...state, layout: action.value };
    case "OPEN_CONFIGURATOR":
      return { ...state, openConfigurator: action.value };
    default:
      return state;
  }
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [controller, dispatch] = useReducer(themeReducer, initialState);

  // 편의 함수들
  const toggleDarkMode = () => {
    dispatch({ type: "DARK_MODE", value: !controller.darkMode });
  };

  const setSidenavColor = (color: SidenavColor) => {
    dispatch({ type: "SIDENAV_COLOR", value: color });
  };

  const setLayout = (layout: LayoutType) => {
    dispatch({ type: "LAYOUT", value: layout });
  };

  // 테마 메모이제이션
  const theme = useMemo(() => {
    return createAppTheme(controller.darkMode ? "dark" : "light");
  }, [controller.darkMode]);

  // 글로벌 스타일
  const globalStyles = useMemo(
    () => ({
      "*::-webkit-scrollbar": {
        width: 8,
        height: 8,
      },
      "*::-webkit-scrollbar-track": {
        backgroundColor: controller.darkMode ? "#2e2e2e" : "#f1f1f1",
        borderRadius: 4,
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: controller.darkMode ? "#555" : "#c1c1c1",
        borderRadius: 4,
        "&:hover": {
          backgroundColor: controller.darkMode ? "#777" : "#a8a8a8",
        },
      },
      "@media print": {
        "*": {
          colorAdjust: "exact",
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
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
    [theme, controller.darkMode]
  );

  const contextValue = useMemo(
    () => ({
      controller,
      dispatch,
      toggleDarkMode,
      setSidenavColor,
      setLayout,
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

// 기존 호환성을 위한 훅들
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

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// 기존 호환성을 위한 액션 크리에이터들
export const setDarkMode = (
  dispatch: React.Dispatch<MaterialUIControllerAction>,
  value: boolean
): void => {
  dispatch({ type: "DARK_MODE", value });
};

export const setSidenavColor = (
  dispatch: React.Dispatch<MaterialUIControllerAction>,
  value: SidenavColor
): void => {
  dispatch({ type: "SIDENAV_COLOR", value });
};

export const setLayout = (
  dispatch: React.Dispatch<MaterialUIControllerAction>,
  value: LayoutType
): void => {
  dispatch({ type: "LAYOUT", value });
};
