// src/AppRoutes.tsx - Protected Route 분리 후

import { Box, Typography } from "@mui/material";
import { useEffect, useMemo, type ReactNode } from "react";
import { Route, Routes } from "react-router-dom";

// Layout
import DashboardLayout from "@/components/layouts/DashboardLayout";

// Components
import ProtectedRoute from "@/routes/ProtectedRoute";

// Routes and contexts
import routes from "@/routes";
import { RouteItem } from "./routes/types";

const AppRoutes: React.FC = () => {
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

    const processRoute = (route: RouteItem) => {
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
