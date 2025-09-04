import { USER_ROUTE } from "@/constants";
import { apiRequest, createApiUrl } from "@/utils/api";
import {
  LoginCredentials,
  PasswdReset,
  PasswdUpdate,
  UserDeletion,
  UserListItem,
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
 * 사용자 삭제
 */
export const UserDeletionApi = async (
  deletionData: UserDeletion
): Promise<void> => {
  await apiRequest.delete<void>(
    createApiUrl(USER_ROUTE, `/user-deletion`),
    deletionData
  );
};

/**
 * 사용자 비밀번호 업데이트
 */
export const PasswordUpdateApi = async (
  passwdUpdateData: PasswdUpdate
): Promise<void> => {
  await apiRequest.post<void>(
    createApiUrl(USER_ROUTE, "/password-update"),
    passwdUpdateData
  );
};

/**
 * 사용자 비밀번호 업데이트
 */
export const PasswordResetApi = async (
  passwdResetData: PasswdReset
): Promise<void> => {
  await apiRequest.post<void>(
    createApiUrl(USER_ROUTE, "/password-reset"),
    passwdResetData
  );
};

/**
 * 사용자 비밀번호 확인
 */
export const PasswordVerificationApi = async (
  verificationData: LoginCredentials
): Promise<void> => {
  await apiRequest.post<void>(
    createApiUrl(USER_ROUTE, "/password-verification"),
    verificationData
  );
};

export const UserAccountListApi = async (): Promise<UserListItem[]> => {
  const response = await apiRequest.get<UserListItem[]>(
    createApiUrl(USER_ROUTE, "/user-account-list")
  );
  return response;
};
