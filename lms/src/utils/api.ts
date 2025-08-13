import { AuthApiError } from "@/errors/AuthApiError";

// Constants

// Utility functions
export const createApiUrl = (route: string, endpoint: string): string =>
  `${route}${endpoint}`;

export const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorMsg = await response.text();
    throw new AuthApiError(errorMsg, response.status, response);
  }
  return response.json() as Promise<T>;
};

export const createRequestOptions = (
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
