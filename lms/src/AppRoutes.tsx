// src/AppRoutes.tsx - Protected Route 분리 후

import { useEffect, useMemo, type ReactNode } from "react";
import { Route, Routes } from "react-router-dom";

// Layout

// Components
import ProtectedRoute from "@/routes/ProtectedRoute";

// Routes and contexts
import routes from "@/routes";
import NotFoundPage from "./pages/common/NotFound";
import SignInPage from "./pages/SignIn";
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
        {/* 404 페이지 - 전체 화면을 덮는 컴포넌트 */}
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<SignInPage />} />
      </Routes>
    </ProtectedRoute>
  );
};

export default AppRoutes;
