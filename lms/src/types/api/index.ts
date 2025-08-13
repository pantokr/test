export * from "./auth";
export * from "./audit";

/**
 * 공통 API 응답 구조
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: ApiErrorInfo;
  timestamp?: string;
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
