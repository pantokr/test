// src/App.tsx
import { ThemeProvider } from "@/context";
import { AuthProvider } from "@/context/auth";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

/**
 * 메인 애플리케이션 컴포넌트
 * - 모든 프로바이더와 라우터를 통합하여 관리
 * - 애플리케이션의 최상위 진입점
 */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
