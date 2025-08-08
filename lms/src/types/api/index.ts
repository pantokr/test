// src/types/auth.ts - 기존 타입에 추가

// ... 기존 타입들

// src/types/auth.ts

/**
 * 로그인 자격증명
 */
export interface LoginCredentials {
  loginID: string;
  passwd: string;
}

/**
 * 로그아웃 응답
 */
export interface LogoutResponse {
  success: boolean;
  message?: string;
}

/**
 * 사용자 기본 정보
 */
export interface UserInfo {
  loginID: string;
  empName: string;
  deptName: string;
  officeTel: string;
  mobileTel: string;
}

/**
 * 사용자 세션 응답 (UserInfo 확장)
 */
export interface UserSession extends UserInfo {
  lastLoginDate?: string;
}

/**
 * 사용자 등록 데이터
 */
export interface RegisterUserData {
  id: string;
  passwd: string;
  empName: string;
  deptName: string;
  officeTel?: string;
  mobileTel?: string;
  email?: string;
  // 필요한 다른 필드들
}

/**
 * 사용자 등록 응답
 */
export interface RegisterResponse {
  success: boolean;
  message?: string;
  user?: UserInfo;
}

/**
 * API 에러 정보
 */
export interface ApiErrorInfo {
  message: string;
  status: number;
  code?: string;
  details?: { [key: string]: any }; // Record 대신 인덱스 시그니처 사용
}

/**
 * 인증 상태
 */
export interface AuthState {
  isAuthenticated: boolean;
  user: UserInfo | null;
  loading: boolean;
  error: string | null;
}

/**
 * 인증 컨텍스트 액션 타입
 */
export type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: UserInfo }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "SET_USER"; payload: UserInfo | null } // null 허용 추가
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "CLEAR_ERROR" };

/**
 * API 응답 기본 구조
 */
