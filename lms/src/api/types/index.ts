export * from "./audit";
export * from "./auth";
export * from "./user";

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  code?: string; // 실패 시 에러 코드
}

export class ApiError extends Error {
  public status: number;
  public code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}
