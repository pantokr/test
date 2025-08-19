// src/assets/theme/index.ts - MUI 기본 색상 활용

import type {
  AppColorSchemes,
  UserSettings,
} from "@/components/layouts/DashboardLayout/context";
import {
  blue,
  blueGrey,
  cyan,
  deepPurple,
  green,
  orange,
  pink,
} from "@mui/material/colors";
import type { Theme } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { Color } from "node_modules/@mui/material";

interface ColorScheme {
  primary: Color;
  secondary: Color;
}

// MUI 기본 색상 팔레트 활용
const colorSchemes: Record<AppColorSchemes, ColorScheme> = {
  blue: {
    primary: blue,
    secondary: pink,
  },
  green: {
    primary: green,
    secondary: orange,
  },
  deepPurple: {
    primary: deepPurple,
    secondary: cyan,
  },
  blueGrey: {
    primary: blueGrey, // 약간 파란빛이 도는 검정
    secondary: cyan,
  },
};

// 폰트 크기 설정 (간소화)
const fontSizeMultipliers = {
  small: 0.85,
  medium: 1,
  large: 1.15,
};

// 폰트 패밀리 설정
const fontFamilies = {
  default: [
    '"Roboto"',
    '"Noto Sans KR"',
    '"Helvetica"',
    '"Arial"',
    "sans-serif",
  ].join(","),
  serif: ['"Noto Serif KR"', '"Times New Roman"', '"Times"', "serif"].join(","),
  monospace: [
    '"JetBrains Mono"',
    '"Fira Code"',
    '"Courier New"',
    '"Courier"',
    "monospace",
  ].join(","),
};

// 개선된 테마 생성 함수
export const createAppTheme = (
  mode: "light" | "dark",
  userSettings?: UserSettings
): Theme => {
  const settings = {
    fontSize: "medium",
    fontFamily: "default",
    colorScheme: "blue",
    compactMode: false,
    language: "ko",
    ...userSettings,
  } as UserSettings;

  const { fontSize, fontFamily, colorScheme, compactMode } = settings;
  const colors = colorSchemes[colorScheme];
  const fontMultiplier = fontSizeMultipliers[fontSize];
  const isDark = mode === "dark";

  // 기본 테마 생성 (MUI 기본값 활용)
  const baseTheme = createTheme({
    palette: {
      mode,
      primary: colors.primary,
      secondary: colors.secondary,
      // MUI가 자동으로 light/dark 모드에 맞게 색상 조정
    },
    typography: {
      fontFamily: fontFamilies[fontFamily],
      // MUI 기본 폰트 크기에 배율 적용
      fontSize: 14 * fontMultiplier,
      h1: {
        fontWeight: 600,
        lineHeight: 1.2,
        fontSize: `${2.5 * fontMultiplier}rem`,
      },
      h2: {
        fontWeight: 600,
        lineHeight: 1.2,
        fontSize: `${2 * fontMultiplier}rem`,
      },
      h3: {
        fontWeight: 600,
        lineHeight: 1.2,
        fontSize: `${1.75 * fontMultiplier}rem`,
      },
      h4: {
        fontWeight: 600,
        lineHeight: 1.2,
        fontSize: `${1.5 * fontMultiplier}rem`,
      },
      h5: {
        fontWeight: 600,
        lineHeight: 1.2,
        fontSize: `${1.25 * fontMultiplier}rem`,
      },
      h6: {
        fontWeight: 600,
        lineHeight: 1.2,
        fontSize: `${1 * fontMultiplier}rem`,
      },
      button: {
        fontWeight: 600,
        textTransform: "none",
        fontSize: `${0.875 * fontMultiplier}rem`,
      },
      body1: {
        fontSize: `${1 * fontMultiplier}rem`,
      },
      body2: {
        fontSize: `${0.875 * fontMultiplier}rem`,
      },
    },
    shape: {
      borderRadius: compactMode ? 6 : 8,
    },
    spacing: compactMode ? 6 : 8,
  });

  // 컴포넌트 커스터마이징
  return createTheme(baseTheme, {
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: compactMode ? 6 : 8,
            textTransform: "none",
            fontWeight: 600,
            padding: compactMode ? "6px 12px" : "8px 16px",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: compactMode ? 8 : 12,
            // MUI가 자동으로 mode에 따라 배경색과 그림자 조정
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: compactMode ? "8px 12px" : "12px 16px",
            fontSize: `${0.875 * fontMultiplier}rem`,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: compactMode ? 6 : 8,
              fontSize: `${1 * fontMultiplier}rem`,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: compactMode ? 8 : 12,
            // AG-Grid 스타일링
            "&.ag-theme-alpine": {
              fontSize: `${0.875 * fontMultiplier}rem`,
              "--ag-font-size": `${0.875 * fontMultiplier}rem`,
              "--ag-header-height": compactMode ? "32px" : "40px",
              "--ag-row-height": compactMode ? "28px" : "36px",
              "--ag-font-family": fontFamilies[fontFamily],
              // MUI 색상 자동 적용
              "--ag-header-background-color":
                baseTheme.palette.grey[isDark ? 800 : 50],
              "--ag-header-foreground-color": baseTheme.palette.text.primary,
              "--ag-border-color": baseTheme.palette.divider,
              "--ag-row-hover-color": baseTheme.palette.action.hover,
              "--ag-selected-row-background-color":
                baseTheme.palette.action.selected,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: compactMode ? 12 : 16,
            fontSize: `${0.75 * fontMultiplier}rem`,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: `${0.75 * fontMultiplier}rem`,
            borderRadius: compactMode ? 4 : 6,
          },
        },
      },
      // 사이드바 메뉴 아이템
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: compactMode ? 4 : 8,
            margin: compactMode ? "2px 4px" : "4px 8px",
            "&.Mui-selected": {
              backgroundColor: baseTheme.palette.primary.main + "1A", // 10% opacity
              color: baseTheme.palette.primary.main,
              "&:hover": {
                backgroundColor: baseTheme.palette.primary.main + "26", // 15% opacity
              },
            },
          },
        },
      },
    },
  });
};

// 기존 호환성을 위한 정적 테마들
const lightTheme = createAppTheme("light");
const darkTheme = createAppTheme("dark");

// 기본 익스포트 (호환성)
export default lightTheme;
export { darkTheme };
