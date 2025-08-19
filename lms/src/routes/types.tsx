import { ReactNode } from "react";

export interface RouteItem {
  key: string;
  name?: string;
  icon?: ReactNode | string;
  route?: string;
  component?: ReactNode;
  collapse?: RouteItem[];
  divider?: boolean; // 구분선
  title?: string; // 섹션 제목
}
