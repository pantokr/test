// src/components/ProtectedRoute/index.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { isPublicRoute } from "@/utils/route";
import LoadingPage from "@/pages/loading";
import { useAuth } from "@/context";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const { pathname } = useLocation();

  // 로딩 중
  if (loading) {
    return LoadingPage();
  }

  // 인증된 사용자가 공개 라우트에 접근
  if (isAuthenticated && isPublicRoute(pathname)) {
    return <Navigate to="/dashboard" replace />;
  }

  // 인증되지 않은 사용자가 보호된 라우트에 접근
  if (!isAuthenticated && !isPublicRoute(pathname)) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  // 인증 통과 시 자식 컴포넌트 렌더링
  return <>{children}</>;
};

export default ProtectedRoute;
