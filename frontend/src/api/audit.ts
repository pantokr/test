// src/api/auth.ts
import { AUDIT_ROUTE } from "@/constants";
import { apiRequest, createApiUrl } from "@/utils/api";
import {
  LoginFailureHistoryItem,
  LoginHistoryItem,
  LoginResetHistoryItem,
} from "./types";

export const loginHistoryApi = async (): Promise<LoginHistoryItem[]> => {
  return await apiRequest.get<LoginHistoryItem[]>(
    createApiUrl(AUDIT_ROUTE, "/login-history")
  );
};

export const loginFailureHistoryApi = async (): Promise<
  LoginFailureHistoryItem[]
> => {
  return await apiRequest.get<LoginFailureHistoryItem[]>(
    createApiUrl(AUDIT_ROUTE, "/login-failure-history")
  );
};

export const loginResetHistoryApi = async (): Promise<
  LoginResetHistoryItem[]
> => {
  return await apiRequest.get<LoginResetHistoryItem[]>(
    createApiUrl(AUDIT_ROUTE, "/login-reset-history")
  );
};
