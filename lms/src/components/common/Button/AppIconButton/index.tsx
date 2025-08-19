import React from "react";
import { StyledAppIconButton } from "./styles";
import { AppIconButtonProps } from "../types";
import { useUserSettings } from "@/context";

/**
 * AppIconButton 컴포넌트 (아이콘만)
 *
 * @param size - 버튼 크기 (small | medium | large)
 * @param icon - 아이콘 (필수)
 * @param onClick - 클릭 이벤트
 * @param sx - MUI sx prop
 */
export const AppIconButton: React.FC<AppIconButtonProps> = ({
  size,
  icon,
  onClick,
  sx,
  ...props
}) => {
  const { userSettings } = useUserSettings();
  return (
    <StyledAppIconButton
      icon={undefined}
      size={size || userSettings.fontSize}
      onClick={onClick}
      sx={sx}
      {...props}
    >
      {icon}
    </StyledAppIconButton>
  );
};
