// src/context/auth/index.tsx

import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { UserInfo } from "@/types/api";
import { loginApi } from "@/api/auth";

interface AuthContextType {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void; // null 허용 추가
  handleLogin: (credentials: {
    loginID: string;
    passwd: string;
  }) => Promise<void>;
  handleLogout: () => Promise<void>;
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

  const handleLogin = async (credentials: {
    loginID: string;
    passwd: string;
  }): Promise<void> => {
    try {
      const response = await loginApi(credentials); // ✅ API 호출만 위임

      if (!response.data) {
        throw new Error("사용자 정보가 없습니다.");
      }

      // 응답 데이터를 setUser로 설정
      const user: UserInfo = {
        loginID: response.data.loginID,
        empName: response.data.empName,
        deptName: response.data.deptName,
        officeTel: response.data.officeTel,
        mobileTel: response.data.mobileTel,
      };

      setUser(user);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async (): Promise<void> => {
    setLoading(true);
    try {
      // 실제로는 로그아웃 API 호출
      setUser(null);
    } catch (error) {
      throw new Error(
        `로그인 실패: ${
          error instanceof Error ? error.message : "알 수 없는 오류"
        }`
      );
    } finally {
      setLoading(false);
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
