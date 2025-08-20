// src/context/auth.tsx
import { loginApi, logoutApi, sessionApi } from "@/api/auth";
import { UserInformation } from "@/api/types";
import { isPublicRoute } from "@/utils/route";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

// 타입 정의
export interface AuthContextType {
  user: UserInformation | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: { loginID: string; passwd: string }) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<boolean>;
}

// Context 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

// Provider 컴포넌트
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInformation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();

  // 초기화 완료 여부 추적
  const isInitialized = useRef(false);

  // 인증 상태 계산
  const isAuthenticated = useMemo(() => !!user, [user]);

  // 세션 만료 처리
  const expireSession = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // 공개 라우트가 아니라면 로그인 페이지로 리다이렉트
    if (!isPublicRoute(location.pathname)) {
      navigate("/auth/signin", { replace: true });
    }
  }, [location.pathname, navigate]);

  // 로컬스토리지에서 사용자 정보 복원 (초기화)
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Failed to restore user session:", error);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
        isInitialized.current = true;
      }
    };

    initializeAuth();
  }, []);

  // 사용자 정보 변경시 로컬스토리지 동기화
  useEffect(() => {
    // 초기화 완료 후에만 저장
    if (!isInitialized.current) return;

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // 세션 체크 함수
  const checkSession = useCallback(async (): Promise<boolean> => {
    try {
      const response = await sessionApi();
      if (!response?.success) {
        expireSession();
        return false;
      }
      return true;
    } catch (error) {
      console.error("Session check failed:", error);
      expireSession();
      return false;
    }
  }, [expireSession]);

  // 라우트 변경시 세션 체크
  useEffect(() => {
    const performSessionCheck = async () => {
      // 초기화 완료되지 않았거나 공개 라우트면 스킵
      if (!isInitialized.current || isPublicRoute(location.pathname) || !user) {
        return;
      }

      await checkSession();
    };

    performSessionCheck();
  }, [location.pathname, user, checkSession]);

  // 로그인 함수
  const login = useCallback(
    async (credentials: { loginID: string; passwd: string }): Promise<void> => {
      try {
        setLoading(true);
        const response = await loginApi(credentials);

        if (!response.data) {
          throw new Error("사용자 정보가 없습니다.");
        }

        setUser(response.data);

        // 로그인 성공 후 리다이렉트
        const redirectTo =
          new URLSearchParams(location.search).get("redirect") || "/dashboard";
        navigate(redirectTo, { replace: true });
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [location.search, navigate]
  );

  // 로그아웃 함수
  const logout = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);

      // API 호출 (실패해도 로컬 세션은 정리)
      try {
        await logoutApi();
      } catch (error) {
        console.error("Logout API failed:", error);
        // API 실패해도 계속 진행
      }

      expireSession();
    } catch (error) {
      console.error("Logout error:", error);
      // 에러가 발생해도 로컬 세션 정리
      expireSession();
    } finally {
      setLoading(false);
    }
  }, [expireSession]);

  // Context 값 메모이제이션
  const contextValue: AuthContextType = useMemo(
    () => ({
      user,
      isAuthenticated,
      loading,
      login,
      logout,
      checkSession,
    }),
    [user, isAuthenticated, loading, login, logout, checkSession]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
