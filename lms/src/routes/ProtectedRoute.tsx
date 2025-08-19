import { useAuth } from "@/context";
import LoadingPage from "@/pages/Loading";
import { isPublicRoute } from "@/utils/route";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  // 로딩 중
  if (loading) {
    return <LoadingPage />;
  }

  const isPublic = isPublicRoute(currentPath);

  // 인증되지 않은 사용자
  if (!user) {
    if (!isPublic) {
      return <Navigate to="/auth/sign-in" replace />;
    }
  }

  // 인증된 사용자가 로그인/회원가입 페이지에 접근하면 대시보드로
  if (user) {
    if (isPublic) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
