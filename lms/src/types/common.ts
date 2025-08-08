// src/types/common.ts

/**
 * 공통 API 응답 구조
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: ErrorInfo;
  timestamp?: string;
}

/**
 * 에러 정보
 */
export interface ErrorInfo {
  code: string;
  message: string;
  details?: Record<string, any>;
  stack?: string;
}

/**
 * 페이지네이션 정보
 */
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * 페이지네이션이 포함된 API 응답
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationInfo;
}

/**
 * 정렬 옵션
 */
export interface SortOption {
  field: string;
  direction: "asc" | "desc";
}

/**
 * 필터 옵션
 */
export interface FilterOption {
  field: string;
  operator: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "like" | "in";
  value: any;
}

/**
 * 검색 쿼리 파라미터
 */
export interface SearchParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: SortOption[];
  filters?: FilterOption[];
}

/**
 * 로딩 상태
 */
export type LoadingState = "idle" | "loading" | "succeeded" | "failed";

/**
 * 테마 모드
 */
export type ThemeMode = "light" | "dark";

/**
 * 언어 코드
 */
export type LanguageCode = "ko" | "en" | "ja";

/**
 * 파일 업로드 정보
 */
export interface FileUploadInfo {
  id: string;
  originalName: string;
  fileName: string;
  mimeType: string;
  size: number;
  url?: string;
  uploadedAt: string;
}

/**
 * 선택 옵션
 */
export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
  group?: string;
}

/**
 * 폼 필드 상태
 */
export interface FormFieldState {
  value: any;
  error?: string;
  touched: boolean;
  dirty: boolean;
}

/**
 * 테이블 컬럼 정의
 */
export interface TableColumn<T = any> {
  key: keyof T | string;
  title: string;
  width?: number | string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  align?: "left" | "center" | "right";
}
