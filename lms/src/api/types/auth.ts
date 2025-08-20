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
export interface UserInformation {
  loginID: string;
  empName: string;
  deptName: string;
  officeTel: string;
  mobileTel: string;
}
