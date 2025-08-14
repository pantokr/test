// src/types/common.ts

import { ReactNode } from "react";

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
 * 라우트 아이템
 */
export interface RouteItem {
  key: string;
  name?: string;
  icon?: ReactNode | string;
  route?: string;
  component?: ReactNode;
  collapse?: RouteItem[];
  noCollapse?: boolean;
  href?: string;
  target?: "_blank" | "_self";
  badge?: {
    color: string;
    content: string | number;
  };
  divider?: boolean; // 구분선
  title?: string; // 섹션 제목
}
