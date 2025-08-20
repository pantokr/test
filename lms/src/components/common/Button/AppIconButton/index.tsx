import { useThemeSettings } from "@/context";
import React from "react";
import { AppIconButtonProps } from "../types";
import { StyledAppIconButton } from "./styles";

/**
 * AppIconButton 컴포넌트 (아이콘만)
 *
 * @param size - 버튼 크기 (small | medium | large)
 * @param icon - 아이콘 (필수)
 * @param onClick - 클릭 이벤트
 * @param sx - MUI sx prop
 */
export const AppIconButton: React.FC<AppIconButtonProps> = ({
  onClick,
  icon,
  iconColor,
  size,
  children,
  sx,
  ...props
}) => {
  const { themeSettings } = useThemeSettings();
  return (
    <StyledAppIconButton
      // icon={undefined}
      size={size || themeSettings.fontSize}
      onClick={onClick}
      sx={{
        color: iconColor,
        ...sx,
      }}
      {...props}
    >
      {children || icon}
    </StyledAppIconButton>
  );
};
