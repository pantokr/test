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
 * API 에러 정보
 */
export interface ApiErrorInfo {
  message: string;
  status: number;
  code?: string;
  details?: { [key: string]: any }; // Record 대신 인덱스 시그니처 사용
}
