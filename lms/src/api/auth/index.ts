// src/api/auth.ts

// Types import

// Error import
import { AUTH_ROUTE } from "@/constants";
import { axiosClient, createApiUrl } from "@/utils/api";
import { LoginCredentials, UserInformation } from "../types";

// API Functions
/**
 * 사용자 로그인
 */
export const loginApi = async (
  credentials: LoginCredentials
): Promise<UserInformation> => {
  const response = await axiosClient.post(
    createApiUrl(AUTH_ROUTE, "/login"),
    credentials
  );
  return response.data;
};

/**
 * 사용자 로그아웃
 */
export const logoutApi = async (): Promise<void> => {
  await axiosClient.post(createApiUrl(AUTH_ROUTE, "/logout"));
};

/**
 * 현재 사용자 세션 정보 가져오기 (새로고침 시 쿠키 재설정)
 */
export const sessionApi = async (): Promise<UserInformation> => {
  const response = await axiosClient.get(createApiUrl(AUTH_ROUTE, "/session"));
  return response.data;
};
