// src/types/auth.ts - 기존 타입에 추가

import { UserData } from "./user";

// ... 기존 타입들

// src/types/auth.ts

/**
 * 로그인 자격증명
 */
export interface LoginCredentials {
  loginId: string;
  passwd: string;
}

/**
 * 로그인 응답
 */
export interface LoginResponse {
  success: boolean;
  code: string;
  message: string;
  userData: UserData;
}
