// src/types/loading.ts

/**
 * 로딩 상태 타입
 */
export type LoadingState = "idle" | "loading" | "success" | "error";

/**
 * 로딩 컨텍스트 타입
 */
export interface LoadingContextType {
  isLoading: boolean;
  loadingMessage?: string;
  setLoading: (loading: boolean, message?: string) => void;
  withLoading: <T>(asyncFn: () => Promise<T>, message?: string) => Promise<T>;
}

/**
 * 전역 로딩 상태
 */
export interface GlobalLoadingState {
  auth: LoadingState;
  app: LoadingState;
  route: LoadingState;
  api: LoadingState;
}

/**
 * 로딩 액션 타입
 */
export type LoadingAction =
  | { type: "SET_AUTH_LOADING"; payload: LoadingState }
  | { type: "SET_APP_LOADING"; payload: LoadingState }
  | { type: "SET_ROUTE_LOADING"; payload: LoadingState }
  | { type: "SET_API_LOADING"; payload: LoadingState }
  | { type: "RESET_LOADING" };

/**
 * 로딩 컴포넌트 Props
 */
export interface LoadingComponentProps {
  message?: string;
  size?: "small" | "medium" | "large";
  variant?: "spinner" | "skeleton" | "dots";
  fullScreen?: boolean;
  overlay?: boolean;
}
