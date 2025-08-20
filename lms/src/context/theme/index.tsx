import { createAppTheme } from "@/assets/theme";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ThemeSettings } from "../types";

interface ThemeContextType {
  themeSettings: ThemeSettings;
  updateThemeSettings: (settings: Partial<ThemeSettings>) => void;
  resetThemeSettings: () => void;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const defaultThemeSettings: ThemeSettings = {
  darkMode: false,
  fontSize: "medium",
  fontFamily: "default",
  colorScheme: "blueGrey",
  compactMode: false,
  language: "ko",
};

export const useThemeSettings = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeSettings must be used within ThemeProvider");
  }
  return context;
};

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
      "*::-webkit-scrollbar": {
        width: 8,
        height: 8,
      },
      "*::-webkit-scrollbar-track": {
        backgroundColor: themeSettings.darkMode ? "#2e2e2e" : "#f1f1f1",
        borderRadius: 4,
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: themeSettings.darkMode ? "#555" : "#c1c1c1",
        borderRadius: 4,
        "&:hover": {
          backgroundColor: themeSettings.darkMode ? "#777" : "#a8a8a8",
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
