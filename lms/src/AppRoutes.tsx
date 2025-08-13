// src/AppRoutes.tsx - Protected Route 분리 후

import { useEffect, useMemo, type ReactNode } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

// Layout
import DashboardLayout from "@/layouts/DashboardLayout";

// Components
import ProtectedRoute from "@/components/ProtectedRoute";

// Routes and contexts
import routes from "@/config/routes";
import { useAuth } from "@/context";

// Types
import type { SidenavRoute } from "@/types/sidenav";

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // 우클릭 방지 (프로덕션 환경에서만)
  useEffect(() => {
    if (!import.meta.env.PROD) return;

    const handleContextMenu = (e: MouseEvent): void => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  // 라우트 생성 함수 (메모화)
  const routeElements = useMemo(() => {
    const elements: ReactNode[] = [];

    const processRoute = (route: SidenavRoute) => {
      if (route.collapse) {
        route.collapse.forEach(processRoute);
        return;
      }

      if (route.route && route.component) {
        elements.push(
          <Route key={route.key} path={route.route} element={route.component} />
        );
      }
    };

    routes.forEach(processRoute);
    return elements;
  }, []);

  return (
    <ProtectedRoute>
      <Routes>
        {routeElements}

        {/* 루트 경로 리다이렉트 */}
        <Route
          path="/"
          element={
            <Navigate
              to={isAuthenticated ? "/dashboard" : "/auth/sign-in"}
              replace
            />
          }
        />

        {/* 404 페이지 */}
        <Route
          path="*"
          element={
            <DashboardLayout title="페이지를 찾을 수 없습니다">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="400px"
                gap={2}
              >
                <Typography variant="h4" color="text.secondary">
                  404
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  요청하신 페이지를 찾을 수 없습니다.
                </Typography>
              </Box>
            </DashboardLayout>
          }
        />
      </Routes>
    </ProtectedRoute>
  );
};

export default AppRoutes;
