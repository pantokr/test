// src/App.tsx
import { AuthProvider, DeviceProvider, ThemeProvider } from "@/context";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { SidenavProvider } from "./context/sidenav";

/**
 * 메인 애플리케이션 컴포넌트
 * - 모든 프로바이더와 라우터를 통합하여 관리
 * - 애플리케이션의 최상위 진입점
 */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <DeviceProvider>
        <ThemeProvider>
          <SidenavProvider>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </SidenavProvider>
        </ThemeProvider>
      </DeviceProvider>
    </BrowserRouter>
  );
};

export default App;
