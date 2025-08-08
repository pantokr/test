// src/api/auth.ts

// Types import
import { ApiResponse } from "@/types";
import type {
  LoginCredentials,
  LogoutResponse,
  UserInfo,
  UserSession,
  RegisterUserData,
  RegisterResponse,
  ApiErrorInfo,
} from "@/types";

// API Error Class
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
  }
}

// Constants
const AUTH_ROUTE = import.meta.env.VITE_AUTH_ROUTE;

if (!AUTH_ROUTE) {
  throw new Error("VITE_AUTH_ROUTE 환경 변수가 설정되지 않았습니다.");
}

// Utility functions
const createApiUrl = (endpoint: string): string => `${AUTH_ROUTE}${endpoint}`;

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorMsg = await response.text();
    throw new AuthApiError(errorMsg, response.status, response);
  }
  return response.json() as Promise<T>;
};

const createRequestOptions = (
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: { [key: string]: any } // Record<string, any> 대신 사용
): RequestInit => ({
  method,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  ...(body && { body: JSON.stringify(body) }),
});

// API Functions
/**
 * 사용자 로그인
 */
export const loginApi = async (
  credentials: LoginCredentials
): Promise<ApiResponse<UserInfo>> => {
  try {
    const response = await fetch(
      createApiUrl("/login"),
      createRequestOptions("POST", credentials)
    );
    return handleResponse<ApiResponse<UserInfo>>(response);
  } catch (error) {
    if (error instanceof AuthApiError) {
      throw error;
    }
    throw new AuthApiError(
      `로그인 실패: ${
        error instanceof Error ? error.message : "알 수 없는 오류"
      }`,
      0
    );
  }
};

/**
 * 사용자 로그아웃
 */
export const logoutApi = async (): Promise<LogoutResponse> => {
  try {
    const response = await fetch(
      createApiUrl("/logout"),
      createRequestOptions("POST")
    );

    // 로그아웃은 실패해도 클라이언트에서 처리할 수 있도록 에러를 던지지 않음
    if (!response.ok) {
      console.warn("Logout request failed, but continuing...");
      return { success: false, message: "Logout request failed" };
    }

    // return handleResponse<LogoutResponse>(response);
    return { success: true, message: "Logout successful" };
  } catch (error) {
    console.warn("Logout error:", error);
    return { success: false, message: "Network error during logout" };
  }
};

/**
 * 현재 사용자 세션 정보 가져오기 (새로고침 시 쿠키 재설정)
 */
export const userSessionApi = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      createApiUrl("/user-session"),
      createRequestOptions("GET")
    );

    return handleResponse<ApiResponse>(response);
  } catch (error) {
    if (error instanceof AuthApiError) {
      throw error;
    }
    throw new AuthApiError(
      `세션을 가져오는 중 오류 발생: ${
        error instanceof Error ? error.message : "알 수 없는 오류"
      }`,
      0
    );
  }
};

/**
 * 사용자 ID 존재 여부 확인
 */
export const isExistUser = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(
      createApiUrl("/id-exists"),
      createRequestOptions("POST", { id })
    );

    if (response.status === 404) {
      return false; // 사용자 없음
    }

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new AuthApiError(errorMsg, response.status, response);
    }

    return true; // 사용자 존재
  } catch (error) {
    if (error instanceof AuthApiError && error.status === 404) {
      return false;
    }

    if (error instanceof AuthApiError) {
      throw error;
    }

    throw new AuthApiError(
      `Failed to check user existence: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      0
    );
  }
};

/**
 * 새 사용자 등록
 */
export const registerUser = async (
  userData: RegisterUserData
): Promise<RegisterResponse> => {
  try {
    // 입력 데이터 검증
    if (
      !userData.id ||
      !userData.passwd ||
      !userData.empName ||
      !userData.deptName
    ) {
      throw new AuthApiError("Required fields are missing", 400);
    }

    const response = await fetch(
      createApiUrl("/register"),
      createRequestOptions("POST", userData)
    );

    return handleResponse<RegisterResponse>(response);
  } catch (error) {
    if (error instanceof AuthApiError) {
      throw error;
    }
    throw new AuthApiError(
      `User registration failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      0
    );
  }
};
