import { ComponentType, ReactNode } from "react";

export interface RouteItem {
  key: string;
  name?: string;
  icon?: ReactNode | string;
  route?: string;
  component?: ComponentType; // JSX가 아닌 컴포넌트 타입
  collapse?: RouteItem[];
  divider?: boolean;
  title?: string;
  requiredPermissions?: string[];
}
