// src/context/auth/AuthProvider.tsx
import { loginApi, logoutApi, sessionApi } from "@/api/auth";
import type { UserInfo } from "@/types";
import { isPublicRoute } from "@/utils/route";
import type { ReactNode } from "react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type { AuthContextType } from "./AuthContext";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const location = useLocation();

  const expireSession = function () {
    setUser(null);
    localStorage.clear();
  };

  // localStorage에서 사용자 정보 복원
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // user 정보가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // 라우트 변경시마다 세션 체크
  useEffect(() => {
    // 로딩이 완료되고, 사용자가 인증된 상태에서만 세션 체크
    handleSession(location.pathname);
  }, [location.pathname]);

  const handleLogin = async (credentials: {
    loginID: string;
    passwd: string;
  }): Promise<void> => {
    try {
      const response = await loginApi(credentials);

      if (!response.data) {
        throw new Error("사용자 정보가 없습니다.");
      }

      setUser(response.data);
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      // 실제 로그아웃 API 호출 (필요한 경우)
      const response = await logoutApi();
      if (!response.data) {
        // 보류
      }
      alert("로그아웃 되었습니다.");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      expireSession();
    }
  };

  const handleSession = async (pathname: string): Promise<void> => {
    // 공개 라우트는 세션 체크 안함
    if (isPublicRoute(pathname)) {
      return;
    }

    try {
      const response = await sessionApi();
      if (!response?.success) {
        // 세션 무효하면 로그아웃
        expireSession();
        return;
      }
    } catch (error) {
      // 세션 체크 실패하면 로그아웃
      expireSession();
    }
  };

  const contextValue: AuthContextType = {
    user,
    setUser,
    handleLogin,
    handleLogout,
    handleSession,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
