// src/components/ProtectedRoute/index.tsx

import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

import { useAuth } from "@/context";
import { isPublicRoute } from "@/utils/route";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { checkSession, isAuthenticated, loading } = useAuth();
  const { pathname } = useLocation();

  // 세션 체크
  useEffect(() => {
    checkSession(pathname);
  }, [pathname, checkSession]);

  // 로딩 중
  if (loading) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          backgroundColor: "background.default",
          zIndex: 9999,
        }}
      >
        <CircularProgress size={48} />
        <Typography variant="h6" color="text.secondary">
          로딩 중...
        </Typography>
      </Box>
    );
  }

  // 인증되지 않은 사용자가 보호된 라우트에 접근
  if (!isAuthenticated && !isPublicRoute(pathname)) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  // 인증된 사용자가 공개 라우트에 접근
  if (isAuthenticated && isPublicRoute(pathname)) {
    return <Navigate to="/dashboard" replace />;
  }

  // 인증 통과 시 자식 컴포넌트 렌더링
  return <>{children}</>;
};

export default ProtectedRoute;
