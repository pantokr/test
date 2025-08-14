// src/api/auth.ts

import { AUDIT_ROUTE } from "@/constants";
import { AuthApiError } from "@/errors/AuthApiError";
import { ApiResponse, LoginHistoryItem } from "@/types";
import {
  createApiUrl,
  createRequestOptions,
  handleResponse,
} from "@/utils/api";

export const loginHistoryApi = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      createApiUrl(AUDIT_ROUTE, "/login-history"),
      createRequestOptions("GET")
    );
    return handleResponse<ApiResponse<LoginHistoryItem[]>>(response);
  } catch (error) {
    if (error instanceof AuthApiError) {
      throw error;
    }
    throw new AuthApiError(
      `로그인 히스토리 조회 실패: ${
        error instanceof Error ? error.message : "알 수 없는 오류"
      }`,
      0
    );
  }
};
