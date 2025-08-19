import {
  ButtonProps,
  IconButtonProps as MuiIconButtonProps,
  SxProps,
  Theme,
} from "@mui/material";
import { ReactNode } from "react";

// 버튼 크기 타입
export type ButtonSize = "small" | "medium" | "large";

export type ButtonStyle = "contained" | "outlined" | "text";

// AppIconButton Props 인터페이스 (아이콘만)
export interface AppIconButtonProps extends Omit<MuiIconButtonProps, "size"> {
  /** 버튼 크기 */
  size?: ButtonSize;
  /** 아이콘 */
  icon: ReactNode;
  /** 클릭 이벤트 핸들러 */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** MUI sx prop */
  sx?: SxProps<Theme>;
}

// AppTextButton Props 인터페이스
export interface AppButtonProps extends Omit<ButtonProps, "variant" | "size"> {
  /** 버튼 크기 */
  size?: ButtonSize;
  /** 버튼 스타일 */
  buttonStyle?: ButtonStyle;
  /** 버튼 텍스트 */
  children: ReactNode;
  /** 클릭 이벤트 핸들러 */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** MUI sx prop */
  sx?: SxProps<Theme>;
}
