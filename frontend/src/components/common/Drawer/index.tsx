// src/components/common/AppDrawer/index.tsx
import { Drawer, DrawerProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

// AppDrawer 스타일 정의
const StyledAppDrawer = styled(Drawer)(({}) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: "transparent",
    borderRadius: "0 !important",
    boxShadow: "none",
    border: "none",
  },
  "& .MuiPaper-root": {
    borderRadius: "0 !important",
  },
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 백드롭 투명도 조정 가능
  },
}));

// AppDrawer Props 타입 정의
interface AppDrawerProps extends Omit<DrawerProps, "children"> {
  children: React.ReactNode;
  /**
   * 배경색 설정 (기본값: transparent)
   */
  backgroundColor?: string;
  /**
   * 백드롭 투명도 설정 (기본값: 0.5)
   */
  backdropOpacity?: number;
  /**
   * borderRadius 적용 여부 (기본값: false)
   */
  enableBorderRadius?: boolean;
  /**
   * 그림자 적용 여부 (기본값: false)
   */
  enableShadow?: boolean;
}

const AppDrawer: React.FC<AppDrawerProps> = ({
  children,
  backgroundColor = "transparent",
  backdropOpacity = 0.5,
  enableBorderRadius = false,
  enableShadow = false,
  sx,
  ...props
}) => {
  const customSx = {
    "& .MuiDrawer-paper": {
      backgroundColor,
      borderRadius: enableBorderRadius ? undefined : "0 !important",
      boxShadow: enableShadow ? undefined : "none",
      border: "none",
    },
    "& .MuiPaper-root": {
      borderRadius: enableBorderRadius ? undefined : "0 !important",
    },
    "& .MuiBackdrop-root": {
      backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})`,
    },
    ...sx,
  };

  return (
    <StyledAppDrawer sx={customSx} {...props}>
      {children}
    </StyledAppDrawer>
  );
};

export default AppDrawer;
