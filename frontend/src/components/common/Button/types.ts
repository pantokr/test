import { ButtonProps } from "@mui/material";
import { ReactNode } from "react";

// 버튼 크기 타입
// export type ButtonSize = "small" | "medium" | "large";

// export type ButtonStyle = "contained" | "outlined" | "text";

// AppIconButton Props 인터페이스 (아이콘만)
export interface AppIconButtonProps extends ButtonProps {
  /** 아이콘 */
  iconColor?: string;
  icon?: ReactNode;
}

// AppTextButton Props 인터페이스
export interface AppButtonProps extends ButtonProps {
  /** 버튼 크기 */
}
