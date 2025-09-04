// src/components/Sidenav/logoutStyles.ts

import type { SxProps, Theme } from "@mui/material/styles";

/**
 * 로그아웃 섹션 컨테이너 스타일
 */
export const LogoutContainer = (): SxProps<Theme> => ({
  padding: 2,
  marginTop: "auto",
  borderTop: `1px solid ${"rgba(255, 255, 255, 0.12)"}`,
});

/**
 * 로그아웃 버튼 스타일 (밝은 계열)
 */
export const LogoutButton: SxProps<Theme> = {
  color: "#ffffff",
  backgroundColor: "rgba(0, 0, 0, 0.0)",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  backdropFilter: "blur(8px)",
  borderRadius: 2,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

  "&:hover": {
    backgroundColor: "rgba(60, 60, 60, 0.50)",
    borderColor: "rgba(255, 255, 255, 0.5)",
    color: "#ffffff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
    transform: "translateY(-1px)",
  },

  "&:active": {
    transform: "translateY(0px)",
    backgroundColor: "rgba(45, 45, 45, 0.98)",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.6)",
  },

  "&:focus": {
    outline: "2px solid rgba(255, 255, 255, 0.25)",
    outlineOffset: "2px",
  },

  "& .MuiSvgIcon-root": {
    fontSize: "1.125rem",
    transition: "all 0.2s ease-in-out",
    filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))",
  },

  // 텍스트에 미묘한 그림자 효과
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
};
