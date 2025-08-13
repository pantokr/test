// src/types/common.ts

/**
 * 에러 정보
 */
export interface ErrorInfo {
  code: string;
  message: string;
  details?: Record<string, any>;
  stack?: string;
}

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
