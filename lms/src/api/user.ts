import { USER_ROUTE } from "@/constants";
import { apiRequest, createApiUrl } from "@/utils/api";
import {
  LoginCredentials,
  PasswdUpdate,
  UserRegistration,
  UserUpdate,
} from "./types";

// API Functions
/**
 * 사용자 등록
 */
export const UserRegistrationApi = async (
  registrationData: UserRegistration
): Promise<void> => {
  await apiRequest.post<void>(
    createApiUrl(USER_ROUTE, "/user-registration"),
    registrationData
  );
};

/**
 * 사용자 정보 업데이트
 */
export const UserUpdateApi = async (updateData: UserUpdate): Promise<void> => {
  await apiRequest.post<void>(
    createApiUrl(USER_ROUTE, "/user-update"),
    updateData
  );
};

/**
 * 사용자 비밀번호 업데이트
 */
export const PasswdUpdateApi = async (
  updateData: PasswdUpdate
): Promise<void> => {
  await apiRequest.post<void>(
    createApiUrl(USER_ROUTE, "/password-update"),
    updateData
  );
};

export const PasswdVerificationApi = async (
  verificationData: LoginCredentials
): Promise<void> => {
  await apiRequest.post<void>(
    createApiUrl(USER_ROUTE, "/password-verification"),
    verificationData
  );
};
