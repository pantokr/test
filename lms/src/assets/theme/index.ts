// src/assets/theme/index.ts - 현대적 테마 구조

import { createTheme } from "@mui/material/styles";
import type { Theme, ThemeOptions } from "@mui/material/styles";

// 공통 테마 설정
const baseTheme: ThemeOptions = {
  typography: {
    fontFamily: ['"Roboto"', '"Helvetica"', '"Arial"', "sans-serif"].join(","),
    h1: { fontSize: "2.5rem", fontWeight: 600, lineHeight: 1.2 },
    h2: { fontSize: "2rem", fontWeight: 600, lineHeight: 1.2 },
    h3: { fontSize: "1.75rem", fontWeight: 600, lineHeight: 1.2 },
    h4: { fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.2 },
    h5: { fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.2 },
    h6: { fontSize: "1rem", fontWeight: 600, lineHeight: 1.2 },
    button: {
      fontSize: "0.875rem",
      fontWeight: 600,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
};

// 라이트 테마
const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#dc004e",
      light: "#ff5983",
      dark: "#9a0036",
    },
    info: {
      main: "#0288d1",
      light: "#03dac6",
      dark: "#018786",
    },
    success: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
    },
    warning: {
      main: "#ed6c02",
      light: "#ff9800",
      dark: "#e65100",
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
    },
  },
  components: {
    ...baseTheme.components,
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

// 다크 테마
const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
      light: "#bbdefb",
      dark: "#1976d2",
    },
    secondary: {
      main: "#f48fb1",
      light: "#f8bbd9",
      dark: "#ad1457",
    },
    info: {
      main: "#4fc3f7",
      light: "#81d4fa",
      dark: "#0277bd",
    },
    success: {
      main: "#81c784",
      light: "#a5d6a7",
      dark: "#388e3c",
    },
    warning: {
      main: "#ffb74d",
      light: "#ffcc02",
      dark: "#f57c00",
    },
    error: {
      main: "#e57373",
      light: "#ef9a9a",
      dark: "#d32f2f",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "rgba(255, 255, 255, 0.87)",
      secondary: "rgba(255, 255, 255, 0.6)",
    },
  },
  components: {
    ...baseTheme.components,
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: "#1e1e1e",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1e1e1e",
        },
      },
    },
  },
});

// 테마 생성 함수 (더 유연한 방식)
export const createAppTheme = (mode: "light" | "dark"): Theme => {
  return mode === "dark" ? darkTheme : lightTheme;
};

// 기본 익스포트 (호환성)
export default lightTheme;
export { darkTheme };
