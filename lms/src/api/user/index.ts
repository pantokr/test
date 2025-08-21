import { USER_ROUTE } from "@/constants";
import {
  createApiUrl,
  createRequestOptions,
  handleResponse,
} from "@/utils/api";
import { AuthApiError } from "../AuthApiError";
import { ApiResponse } from "../types";
import { UserRegistration } from "../types/user";

// API Functions
/**
 * 사용자 로그인
 */
export const UserRegistrationApi = async (
  registrationData: UserRegistration
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      createApiUrl(USER_ROUTE, "/user-registration"),
      createRequestOptions("POST", registrationData)
    );

    const errorMsg = await response.clone().text();
    if (!response.ok) {
      throw new AuthApiError(errorMsg, response.status, response);
    }
    return handleResponse<ApiResponse>(response);
  } catch (error) {
    if (error instanceof AuthApiError) {
      throw error;
    }
    throw new AuthApiError(
      `사용자 등록 실패: ${
        error instanceof Error ? error.message : "알 수 없는 오류"
      }`,
      0
    );
  }
};
