// src/api/auth.ts

// Types import
import type { ApiResponse, LoginCredentials, UserInfo } from "@/types";

// Error import
import { AuthApiError } from "@/errors/AuthApiError";
import {
  createApiUrl,
  createRequestOptions,
  handleResponse,
} from "@/utils/api";
import { AUTH_ROUTE } from "@/constants";

// API Functions
/**
 * 사용자 로그인
 */

export const loginApi = async (
  credentials: LoginCredentials
): Promise<ApiResponse<UserInfo>> => {
  try {
    const response = await fetch(
      createApiUrl(AUTH_ROUTE, "/login"),
      createRequestOptions("POST", credentials)
    );

    if (response.status == 401) {
      throw new AuthApiError("아이디/비밀번호 오류", 401);
    } else if (!response.ok) {
      const errorMsg = await response.text();
      throw new AuthApiError(errorMsg, response.status, response);
    }
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
export const logoutApi = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      createApiUrl(AUTH_ROUTE, "/logout"),
      createRequestOptions("POST")
    );
    return handleResponse<ApiResponse>(response);
  } catch (error) {
    if (error instanceof AuthApiError) {
      throw error;
    }
    throw new AuthApiError(
      `로그아웃 실패: ${
        error instanceof Error ? error.message : "알 수 없는 오류"
      }`,
      0
    );
  }
};

/**
 * 현재 사용자 세션 정보 가져오기 (새로고침 시 쿠키 재설정)
 */
export const sessionApi = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      createApiUrl(AUTH_ROUTE, "/session"),
      createRequestOptions("GET")
    );

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new AuthApiError(errorMsg, response.status, response);
    }

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
// export const isExistUser = async (id: string): Promise<boolean> => {
//   try {
//     const response = await fetch(
//       createApiUrl(AUTH_ROUTE, "/id-exists"),
//       createRequestOptions("POST", { id })
//     );

//     if (response.status === 404) {
//       return false; // 사용자 없음
//     }

//     if (!response.ok) {
//       const errorMsg = await response.text();
//       throw new AuthApiError(errorMsg, response.status, response);
//     }

//     return true; // 사용자 존재
//   } catch (error) {
//     if (error instanceof AuthApiError && error.status === 404) {
//       return false;
//     }

//     if (error instanceof AuthApiError) {
//       throw error;
//     }

//     throw new AuthApiError(
//       `Failed to check user existence: ${
//         error instanceof Error ? error.message : "Unknown error"
//       }`,
//       0
//     );
//   }
// };

/**
 * 새 사용자 등록
 */
// export const registerUser = async (
//   userData: RegisterUserData
// ): Promise<RegisterResponse> => {
//   try {
//     // 입력 데이터 검증
//     if (
//       !userData.id ||
//       !userData.passwd ||
//       !userData.empName ||
//       !userData.deptName
//     ) {
//       throw new AuthApiError("Required fields are missing", 400);
//     }

//     const response = await fetch(
//       createApiUrl(AUTH_ROUTE, "/register"),
//       createRequestOptions("POST", userData)
//     );

//     return handleResponse<RegisterResponse>(response);
//   } catch (error) {
//     if (error instanceof AuthApiError) {
//       throw error;
//     }
//     throw new AuthApiError(
//       `User registration failed: ${
//         error instanceof Error ? error.message : "Unknown error"
//       }`,
//       0
//     );
//   }
// };
