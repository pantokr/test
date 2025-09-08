import { createAppTheme } from "@/assets/theme";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ThemeSettings } from "../types";

export interface ThemeContextType {
  themeSettings: ThemeSettings;
  updateThemeSettings: (settings: Partial<ThemeSettings>) => void;
  resetThemeSettings: () => void;
  toggleDarkMode: () => void;
}

const defaultThemeSettings: ThemeSettings = {
  darkMode: false,
  fontSize: "medium",
  fontFamily: "default",
  colorScheme: "blueGrey",
  compactMode: false,
  language: "ko",
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // 초기값 로드
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(() => {
    if (typeof window === "undefined") return defaultThemeSettings;

    try {
      const saved = localStorage.getItem("themeSettings");
      return saved
        ? { ...defaultThemeSettings, ...JSON.parse(saved) }
        : defaultThemeSettings;
    } catch {
      return defaultThemeSettings;
    }
  });

  // 로컬스토리지 저장
  useEffect(() => {
    localStorage.setItem("themeSettings", JSON.stringify(themeSettings));
  }, [themeSettings]);

  const updateThemeSettings = useCallback(
    (settings: Partial<ThemeSettings>) => {
      setThemeSettings((prev: ThemeSettings) => ({ ...prev, ...settings }));
    },
    []
  );

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  const resetThemeSettings = useCallback(() => {
    setThemeSettings(defaultThemeSettings);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setThemeSettings((prev: any) => ({ ...prev, darkMode: !prev.darkMode }));
  }, []);

  // 테마 생성
  const theme = useMemo(() => {
    return createAppTheme(
      themeSettings.darkMode ? "dark" : "light",
      themeSettings
    );
  }, [themeSettings]);

  // 글로벌 스타일
  const globalStyles = useMemo(
    () => ({
      "::selection": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      },
      html: {
        scrollBehavior: "smooth",
      },
    }),
    [themeSettings.darkMode, theme.palette.primary]
  );

  const contextValue = useMemo(
    () => ({
      themeSettings,
      updateThemeSettings,
      resetThemeSettings,
      toggleDarkMode,
    }),
    [themeSettings, updateThemeSettings, resetThemeSettings, toggleDarkMode]
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
