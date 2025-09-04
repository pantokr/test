export * from "./audit";
export * from "./auth";
export * from "./user";

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  code?: string;
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
// 페이징 정보 인터페이스
export interface PaginationInfo {
  page: number;
  size: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// 페이징이 포함된 데이터 타입
export interface PaginatedData<T> {
  items: T[];
  pagination: PaginationInfo;
}

// export interface PaginationParams {
//   page: number;
//   size: number;
//   sortField?: string;
//   sortOrder?: 'asc' | 'desc';
//   filters?: Record<string, any>;
// }

// 기존 ApiResponse를 활용한 페이징 응답 타입
export type PaginatedApiResponse<T> = ApiResponse<PaginatedData<T>>;
