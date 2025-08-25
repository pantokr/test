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

axiosClient.interceptors.response.use(
  (response) => {
    const { success, data, message } = response.data;

    if (!success) {
      const error = new Error(message || "Request failed");
      throw error;
    }

    // data만 반환하도록 response 수정
    response.data = data;
    return response;
  },
  (error) => {
    if (error.response?.data?.message) {
      error.message = error.response.data.message;
    }
    return Promise.reject(error);
  }
);
