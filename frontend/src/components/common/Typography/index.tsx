import React from "react";
import { StyledAppTypography } from "./styles";
import { AppTypographyProps } from "./types";

/**
 * AppTypography 컴포넌트
 *
 * @param variant - 타이포그래피 변형 (h1~h6, subtitle1, subtitle2, body1, body2, caption, overline)
 * @param color - 색상 (inherit, primary, secondary, textPrimary, textSecondary, error)
 * @param children - 텍스트 내용 (필수)
 * @param sx - MUI sx prop
 */
const AppTypography: React.FC<AppTypographyProps> = ({
  variant = "body1",
  color = "inherit",
  children,
  sx,
  ...props
}) => {
  return (
    <StyledAppTypography variant={variant} color={color} sx={sx} {...props}>
      {children}
    </StyledAppTypography>
  );
};

export default AppTypography;
export type {
  AppTypographyProps,
  TypographyColor,
  TypographyVariant,
} from "./types";
