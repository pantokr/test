// src/providers/AppProvider.tsx - 통합 프로바이더

import React from "react";
import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/context/auth";
import { ThemeProvider } from "@/context/theme";

interface AppProviderProps {
  children: ReactNode;
}

/**
 * 모든 컨텍스트 프로바이더를 조합한 최상위 프로바이더
 */
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default AppProvider;
