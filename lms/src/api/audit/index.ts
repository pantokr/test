// src/api/auth.ts
import { AUDIT_ROUTE } from "@/constants";
import { axiosClient, createApiUrl } from "@/utils/api";
import {
  LoginFailureHistoryItem,
  LoginHistoryItem,
  LoginResetHistoryItem,
} from "../types";

export const loginHistoryApi = async (): Promise<LoginHistoryItem[]> => {
  const response = await axiosClient.get(
    createApiUrl(AUDIT_ROUTE, "/login-history")
  );
  return response.data;
};

export const loginFailureHistoryApi = async (): Promise<
  LoginFailureHistoryItem[]
> => {
  const response = await axiosClient.get(
    createApiUrl(AUDIT_ROUTE, "/login-failure-history")
  );
  return response.data;
};

export const loginResetHistoryApi = async (): Promise<
  LoginResetHistoryItem[]
> => {
  const response = await axiosClient.get(
    createApiUrl(AUDIT_ROUTE, "/login-reset-history")
  );
  return response.data;
};
