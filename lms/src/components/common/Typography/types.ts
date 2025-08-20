import {
  TypographyProps as MuiTypographyProps,
  SxProps,
  Theme,
} from "@mui/material";
import { ReactNode } from "react";

// 타이포그래피 변형 타입
export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption"
  | "overline";

// 색상 타입
export type TypographyColor = string;

// AppTypography Props 인터페이스
export interface AppTypographyProps
  extends Omit<MuiTypographyProps, "variant" | "color"> {
  /** 타이포그래피 변형 */
  variant?: TypographyVariant;
  /** 색상 */
  color?: TypographyColor;
  /** 텍스트 내용 */
  children: ReactNode;
  /** MUI sx prop */
  sx?: SxProps<Theme>;
}
