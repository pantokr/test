import { useAuth } from "@/context";
import { isPublicRoute } from "@/utils/route";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isInitialized } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const isPublic = isPublicRoute(currentPath);

  if (isInitialized) {
    // 미인증 사용자가 Private 라우트 접근
    if (!user && !isPublic) {
      return <Navigate to="/auth/sign-in" replace />;
    }

    // 인증된 사용자가 Public 라우트 접근
    if (user && isPublic) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
