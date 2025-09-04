import { useThemeSettings } from "@/context";
import { IconButton, styled } from "@mui/material";
import React from "react";
import { AppIconButtonProps } from "../types";

const StyledAppIconButton = styled(IconButton)<AppIconButtonProps>(
  ({ size = "medium" }) => ({
    // 포커스 및 클릭 시 테두리 제거

    // 크기별 스타일
    ...(size === "small" && {
      width: 32,
      height: 32,
      padding: 4,
      "& svg": {
        fontSize: "1.125rem",
      },
    }),
    ...(size === "medium" && {
      width: 40,
      height: 40,
      padding: 5,
      "& svg": {
        fontSize: "1.25rem",
      },
    }),
    ...(size === "large" && {
      width: 48,
      height: 48,
      padding: 6,
      "& svg": {
        fontSize: "1.5rem",
      },
    }),
  })
);

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
