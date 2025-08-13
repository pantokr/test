// src/errors/AuthApiError.ts

import type { ApiErrorInfo } from "@/types";

/**
 * 인증 API 관련 에러를 처리하는 커스텀 에러 클래스
 */
export class AuthApiError extends Error {
  status: number;
  response?: Response;
  errorInfo?: ApiErrorInfo;

  constructor(
    message: string,
    status: number,
    response?: Response,
    errorInfo?: ApiErrorInfo
  ) {
    super(message);
    this.name = "AuthApiError";
    this.status = status;
    this.response = response;
    this.errorInfo = errorInfo;

    // Error 객체의 스택 트레이스 설정 (V8 엔진용)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthApiError);
    }
  }

  /**
   * 에러 정보를 JSON 형태로 반환
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      errorInfo: this.errorInfo,
    };
  }
}
