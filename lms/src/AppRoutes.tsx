// src/AppRoutes.tsx - 중복 로직 제거 및 최적화
import {
  useEffect,
  useState,
  useMemo,
  type ReactNode,
  use,
  useCallback,
} from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Layout
import DashboardLayout from "@/layouts/DashboardLayout";

// Routes and contexts
import routes from "@/routes";
import { useAuth } from "@/context";

// API
import { userSessionApi } from "@/api/auth";

// Types
import type { SidenavRoute } from "@/types/sidenav";
import { Box, CircularProgress, Typography } from "@mui/material";

// 상수 분리
const PUBLIC_ROUTES = [
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/reset-password",
] as const;

const AppRoutes: React.FC = () => {
  const { user, setUser } = useAuth();
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // 공개 라우트 여부 확인 (메모화)
  const isPublicRoute = useMemo(() => {
    return PUBLIC_ROUTES.includes(pathname as (typeof PUBLIC_ROUTES)[number]);
  }, [pathname]);

  // 인증 상태 확인 (메모화)
  const isAuthenticated = useMemo(() => {
    return Boolean(user?.loginID);
  }, [user?.loginID]);

  // 세션 체크 함수 (단일 책임)
  const checkSession = async (): Promise<boolean> => {
    try {
      const response = await userSessionApi();
      return response?.success || false;
    } catch (err) {
      setUser(null);
      return false;
    }
  };

  // 세션 실패 시 처리 (단일 책임)
  const handleSessionFailure = useCallback(() => {
    setUser(null);
    window.location.href = "/auth/sign-in";
  }, [setUser]);

  useEffect(() => {
    if (isPublicRoute) {
      // 공개 라우트일 땐 세션 체크하지 않음
      setIsLoading(false);
      return;
    }

    const initialize = async () => {
      try {
        const sessionValid = await checkSession();
        if (!sessionValid) {
          handleSessionFailure();
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        handleSessionFailure();
      }
    };

    initialize();
  }, [checkSession, handleSessionFailure]);

  // // 우클릭 방지
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent): void => {
      if (import.meta.env.PROD) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  // 라우트 요소 생성 함수 (리팩토링)
  const createRouteElement = (route: SidenavRoute): ReactNode => {
    if (!isPublicRoute) {
      return (
        <Route
          key={route.key}
          path={route.route}
          element={isAuthenticated ? route.component : route.component}
        />
      );
    } else {
      return (
        <Route key={route.key} path={route.route} element={route.component} />
      );
    }
  };

  // 라우트 생성 함수 (단순화)
  const getRoutes = (allRoutes: SidenavRoute[]): ReactNode[] => {
    const routeElements: ReactNode[] = [];

    const processRoute = (route: SidenavRoute) => {
      if (route.collapse) {
        route.collapse.forEach(processRoute);
        return;
      }

      if (route.route && route.component) {
        routeElements.push(createRouteElement(route));
      }
    };

    allRoutes.forEach(processRoute);
    return routeElements;
  };

  // 로딩 상태 렌더링
  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        gap={2}
      >
        <CircularProgress size={48} />
        <Typography variant="h6" color="text.secondary">
          세션 체크 중...
        </Typography>
      </Box>
    );
  }

  return (
    <Routes>
      {getRoutes(routes)}

      {/* 기본 리다이렉트 - 인증 상태에 따라 */}
      <Route
        path="/"
        element={
          <Navigate
            to={isAuthenticated ? "/dashboard" : "/auth/sign-in"}
            replace
          />
        }
      />

      {/* 404 처리 */}
      <Route
        path="*"
        element={
          <DashboardLayout title="페이지를 찾을 수 없습니다"></DashboardLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
