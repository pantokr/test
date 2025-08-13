// src/context/auth/index.tsx - 업데이트된 버전

import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { UserInfo } from "@/types/api/auth";
import { loginApi, logoutApi, userSessionApi } from "@/api/auth";
import { isPublicRoute } from "@/utils/route";

interface AuthContextType {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  handleLogin: (credentials: {
    loginID: string;
    passwd: string;
  }) => Promise<void>;
  handleLogout: () => Promise<void>;
  checkSession: (pathname: string) => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
  }, []);

  // user 정보가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const handleLogin = async (credentials: {
    loginID: string;
    passwd: string;
  }): Promise<void> => {
    setLoading(true);
    try {
      const response = await loginApi(credentials);

      if (!response.data) {
        throw new Error("사용자 정보가 없습니다.");
      }

      const userInfo: UserInfo = {
        loginID: response.data.loginID,
        empName: response.data.empName,
        deptName: response.data.deptName,
        officeTel: response.data.officeTel,
        mobileTel: response.data.mobileTel,
      };

      setUser(userInfo);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async (): Promise<void> => {
    setLoading(true);
    try {
      // 실제 로그아웃 API 호출 (필요한 경우)
      const response = await logoutApi();
      if (!response.data) {
        // 보류
      }
      alert("로그아웃 되었습니다.");
    } catch (error) {
    } finally {
      setUser(null);
      localStorage.clear(); // 모든 로컬 데이터 클리어
      setLoading(false);
    }
  };

  const checkSession = async (pathname: string): Promise<void> => {
    // 공개 라우트는 세션 체크 안함
    if (isPublicRoute(pathname)) {
      setLoading(false);
      return;
    }

    try {
      const response = await userSessionApi();
      if (!response?.success) {
        // 세션 무효하면 로그아웃
        setUser(null);

        return;
      }

      setLoading(false);
    } catch (error) {
      // 세션 체크 실패하면 로그아웃
      setUser(null);
      window.location.href = "/auth/sign-in";
    }
  };

  const isAuthenticated = Boolean(user?.loginID);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleLogin,
        handleLogout,
        checkSession,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.");
  }
  return context;
};
