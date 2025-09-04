// src/api/auth.ts

import { AUTH_ROUTE } from "@/constants";
import { apiRequest, createApiUrl } from "@/utils/api";
import { LoginCredentials, UserData } from "./types";

// API Functions
/**
 * 사용자 로그인
 */
export const loginApi = async (
  credentials: LoginCredentials
): Promise<UserData> => {
  return await apiRequest.post<UserData>(
    createApiUrl(AUTH_ROUTE, "/login"),
    credentials
  );
};

/**
 * 사용자 로그아웃
 */
export const logoutApi = async (): Promise<void> => {
  await apiRequest.post<void>(createApiUrl(AUTH_ROUTE, "/logout"));
};

/**
 * 현재 사용자 세션 정보 가져오기 (새로고침 시 쿠키 재설정)
 */
export const sessionApi = async (): Promise<UserData> => {
  return await apiRequest.get<UserData>(createApiUrl(AUTH_ROUTE, "/session"));
};
