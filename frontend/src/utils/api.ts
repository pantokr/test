import { ApiError, ApiResponse } from "@/api/types";
import axios, { AxiosResponse } from "axios";

// Utility functions
export const createApiUrl = (route: string, endpoint: string): string =>
  `${route}${endpoint}`;

// export const handleResponse = async <T>(response: Response): Promise<T> => {
//   if (!response.ok) {
//     const errorMsg = await response.text();
//     throw new AuthApiError(errorMsg, response.status, response);
//   }
//   return response.json() as Promise<T>;
// };

// Axios 인스턴스 생성
export const axiosClient = axios.create({
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { success, data, message, code } = response.data;

    if (!success) {
      throw new ApiError(message || "Request failed", response.status, code);
    }

    // data만 반환하도록 response 수정
    response.data = data;
    return response;
  },
  (error) => {
    // 네트워크 오류 또는 서버에서 ApiResponse 형식이 아닌 응답이 온 경우
    if (error.response?.data) {
      const responseData = error.response.data as ApiResponse;

      if (responseData.message || responseData.code) {
        throw new ApiError(
          responseData.message || "Server error",
          error.response.status,
          responseData.code
        );
      }
    }

    // 기본 에러 처리
    throw new ApiError(
      error.message || "Network error",
      error.response?.status || 0
    );
  }
);

// 타입 안전한 API 요청 함수들
export const apiRequest = {
  get: async <T>(url: string): Promise<T> => {
    const response = await axiosClient.get<T>(url);
    return response.data;
  },

  post: async <T>(url: string, data?: any): Promise<T> => {
    const response = await axiosClient.post<T>(url, data);
    return response.data;
  },

  put: async <T>(url: string, data?: any): Promise<T> => {
    const response = await axiosClient.put<T>(url, data);
    return response.data;
  },

  delete: async <T>(url: string, data?: any): Promise<T> => {
    const response = await axiosClient.delete<T>(url, { data });
    return response.data;
  },
};

export const createAxiosConfig = (
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: { [key: string]: any }
): RequestInit => ({
  method,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  ...(body && { body: JSON.stringify(body) }),
});
