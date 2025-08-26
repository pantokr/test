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
import { useLocation } from "react-router-dom";

export interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (credentials: { loginID: string; passwd: string }) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<boolean>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const location = useLocation();

  const isAuthenticated = useMemo(() => !!user, [user]);

  const clearSession = useCallback(() => {
    try {
      setUser(null);
      sessionStorage.removeItem("user");
    } catch (error) {
      // sessionStorage 접근 실패시 무시
    }
  }, []);

  const checkSession = useCallback(async (): Promise<boolean> => {
    try {
      const savedUser = sessionStorage.getItem("user");
      if (!savedUser) return false;

      const response = await sessionApi();
      sessionStorage.setItem("user", JSON.stringify(response));
      setUser(response);
      return true;
    } catch (error) {
      clearSession();
      return false;
    }
  }, [clearSession]);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await logoutApi();
    } catch (error) {
      // 서버 로그아웃 실패해도 로컬은 정리
    } finally {
      clearSession();
    }
  }, [clearSession]);

  // 초기화
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedUser = sessionStorage.getItem("user");
        if (savedUser) {
          JSON.parse(savedUser); // 유효성 검사
          await checkSession();
        }
      } catch (error) {
        clearSession();
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [checkSession, clearSession]);

  // 페이지 이동시 세션 체크
  useEffect(() => {
    if (isInitialized && user) {
      const publicPaths = ["/login", "/register", "/"];
      if (!publicPaths.includes(location.pathname)) {
        checkSession();
      }
    }
  }, [location.pathname]);

  const login = useCallback(
    async (credentials: { loginID: string; passwd: string }): Promise<void> => {
      try {
        const response = await loginApi(credentials);
        setUser(response);
        sessionStorage.setItem("user", JSON.stringify(response));
      } catch (error) {
        clearSession();
        throw error;
      }
    },
    [clearSession]
  );

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
