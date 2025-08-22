import axios from "axios";

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

// Axios 인스턴스 생성
export const axiosClient = axios.create({
  withCredentials: true, // 이게 빠져있음
});

// 401 에러 전역 처리
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response?.status === 401) {
    //   if (!error.config?.url?.includes("/auth/")) {
    //     alert("세션 정보 없음");
    //   }
    // }

    // 에러 메시지를 표준화
    console.log(error);
    if (error.response?.data) {
      error.message = error.response.data.error || error.response.data;
    }

    return Promise.reject(error);
  }
);
