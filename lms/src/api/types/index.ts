export * from "./audit";
export * from "./auth";
export * from "./user";

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  code?: string; // 실패 시 에러 코드
}
