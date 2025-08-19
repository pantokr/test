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
 * 로그아웃 버튼 스타일 (라이트/다크 모드 상관없이 일관된 스타일)
 */
export const LogoutButton: SxProps<Theme> = {
  color: "#ffffff",
  backgroundColor: "rgba(255, 255, 255, 0.125)",
  borderColor: "rgba(255, 255, 255, 0.25)",
  backdropFilter: "blur(10px)",
  borderRadius: 2,

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderColor: "rgba(255, 255, 255, 0.5)",
    color: "#ffffff",
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
