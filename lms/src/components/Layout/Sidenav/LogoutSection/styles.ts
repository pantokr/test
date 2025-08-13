// src/components/Sidenav/logoutStyles.ts

import type { SxProps, Theme } from "@mui/material/styles";

/**
 * 로그아웃 섹션 컨테이너 스타일
 */
export const LogoutContainer = (darkMode: boolean): SxProps<Theme> => ({
  padding: 2,
  marginTop: "auto",
  borderTop: `1px solid ${"rgba(255, 255, 255, 0.12)"}`,
});

/**
 * 사용자 정보 표시 스타일 (다크 배경에 맞춘 고정 스타일)
 */
export const userInfo: SxProps<Theme> = {
  mb: 1.5,
  fontSize: "0.875rem",
  color: "rgba(255, 255, 255, 0.8)", // 밝은 텍스트로 고정
  fontWeight: 500,
  textAlign: "center",
};

/**
 * 로그아웃 버튼 스타일 (라이트/다크 모드 상관없이 일관된 스타일)
 */
export const LogoutButton: SxProps<Theme> = {
  color: "#ffffff",
  backgroundColor: "rgba(255, 255, 255, 0.08)",
  borderColor: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
  borderRadius: 2,
  padding: "10px 16px",
  fontWeight: 600,
  fontSize: "0.875rem",
  textTransform: "none",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderColor: "rgba(255, 255, 255, 0.4)",
    color: "#ffffff",
    transform: "translateY(-1px)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },

  "&:active": {
    transform: "translateY(0px)",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
  },

  "& .MuiSvgIcon-root": {
    fontSize: "1.125rem",
    transition: "all 0.2s ease-in-out",
  },
};
