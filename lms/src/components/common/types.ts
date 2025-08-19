// src/components/common/types.ts
import React from "react";

export interface BaseProps {
  className?: string;
  sx?: object;
  children?: React.ReactNode;
}

export interface LayoutProps extends BaseProps {
  gap?: number;
}
