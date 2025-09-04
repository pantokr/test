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
  remainingSessionTime: number; // 초 단위 남은 세션 시간
  login: (credentials: { loginId: string; passwd: string }) => Promise<void>;
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
  const [remainingSessionTime, setRemainingSessionTime] = useState(0);
  const location = useLocation();

  const isAuthenticated = useMemo(() => !!user, [user]);

  const clearSession = useCallback(() => {
    try {
      setUser(null);
      setRemainingSessionTime(0);
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

      // 세션 만료 시간 계산: 서버 시간 기준 현재 시간 + 세션 유지 시간(20분)
      const sessionDuration = 20 * 60 * 1000; // 20분 -> 밀리초
      const expireAt = Date.now() + sessionDuration;

      sessionStorage.setItem("user", JSON.stringify({ ...response, expireAt }));
      setUser(response);
      setRemainingSessionTime(sessionDuration / 1000); // 초 단위

      return true;
    } catch (error) {
      clearSession();
      return false;
    }
  }, [clearSession]);

  // 남은 세션 시간 감소
  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => {
      setRemainingSessionTime((prev) => {
        if (prev <= 1) {
          clearSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated, clearSession]);

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
          const parsed = JSON.parse(savedUser);
          const now = Date.now();
          if (parsed.expireAt && parsed.expireAt > now) {
            setUser(parsed);
            setRemainingSessionTime(Math.floor((parsed.expireAt - now) / 1000));
            await checkSession();
          } else {
            clearSession();
          }
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
    async (credentials: { loginId: string; passwd: string }): Promise<void> => {
      try {
        const response = await loginApi(credentials);
        const sessionDuration = 20 * 60 * 1000;
        const expireAt = Date.now() + sessionDuration;

        setUser(response);
        setRemainingSessionTime(sessionDuration / 1000);

        sessionStorage.setItem(
          "user",
          JSON.stringify({ ...response, expireAt })
        );
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
      remainingSessionTime,
      login,
      logout,
      checkSession,
    }),
    [
      user,
      isAuthenticated,
      isInitialized,
      remainingSessionTime,
      login,
      logout,
      checkSession,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
