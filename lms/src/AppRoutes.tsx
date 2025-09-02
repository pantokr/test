import React, { useEffect, useMemo, type ReactNode } from "react";
import { Route, Routes } from "react-router-dom";

// Components
import ProtectedRoute from "@/routes/ProtectedRoute";

// Routes
import NotFoundPage from "@/pages/common/NotFound";
import { hiddenRoutes, sidenavRoutes } from "@/routes";
import { RouteItem } from "@/routes/types";
import SignInPage from "./pages/SignIn";

const AppRoutes: React.FC = () => {
  // 우클릭 방지 (프로덕션)
  useEffect(() => {
    if (!import.meta.env.PROD) return;

    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  // Route 요소 생성
  const routeElements = useMemo(() => {
    const elements: ReactNode[] = [];

    const processRoute = (route: RouteItem) => {
      if (route.collapse) {
        route.collapse.forEach(processRoute);
        return;
      }

      if (route.route && route.component) {
        const element = route.protected ? (
          <ProtectedRoute>
            <route.component />
          </ProtectedRoute>
        ) : (
          <route.component />
        );

        elements.push(
          <Route key={route.key} path={route.route} element={element} />
        );
      }
    };

    sidenavRoutes.forEach(processRoute);
    hiddenRoutes.forEach(processRoute);

    return elements;
  }, []);

  return (
    <Routes>
      {routeElements}

      <Route path="/" element={<SignInPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
