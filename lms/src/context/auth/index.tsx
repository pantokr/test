// src/context/auth.tsx
import { loginApi, logoutApi, sessionApi } from "@/api/auth";
import { UserData } from "@/api/types";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

// 타입 정의
export interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  isInitialized: boolean; // 초기화 완료 상태 추가
  login: (credentials: { loginID: string; passwd: string }) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<boolean>;
}

// Provider 컴포넌트
interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // 인증 상태 계산
  const isAuthenticated = useMemo(() => !!user, [user]);

  // 세션 정리 함수
  const clearSession = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("user");
  }, []);

  // 서버에서 세션 검증
  const checkSession = useCallback(async (): Promise<boolean> => {
    const savedUser = sessionStorage.getItem("user");
    if (!savedUser) {
      return false;
    }

    try {
      // 세션 검증 API 호출
      const response = await sessionApi();
      sessionStorage.setItem("user", JSON.stringify(response));
      return true;
    } catch (error) {
      throw error;
    }
  }, []);

  // sessionStorage에서 사용자 정보 복원 및 세션 검증 (초기화)
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedUser = sessionStorage.getItem("user");
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);

          // 서버에서 세션 유효성 검증
          const isValidSession = await checkSession();

          if (isValidSession) {
            setUser(parsedUser);
          }
        }
      } catch (error) {
        clearSession();
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  // 로그인 함수
  const login = useCallback(
    async (credentials: { loginID: string; passwd: string }): Promise<void> => {
      try {
        const response = await loginApi(credentials);

        setUser(response);
        sessionStorage.setItem("user", JSON.stringify(response));
      } catch (error) {
        throw error;
      }
    },
    []
  );

  // 로그아웃 함수
  const logout = useCallback(async (): Promise<void> => {
    try {
      await logoutApi();
    } catch (error) {
    } finally {
      // API 성공/실패 관계없이 항상 로컬 세션 정리
      clearSession();
    }
  }, [clearSession]);

  // Context 값 메모이제이션
  const contextValue: AuthContextType = useMemo(
    () => ({
      user,
      isAuthenticated,
      isInitialized,
      login,
      logout,
      checkSession,
    }),
    [user, isAuthenticated, isInitialized, login, logout, checkSession]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
