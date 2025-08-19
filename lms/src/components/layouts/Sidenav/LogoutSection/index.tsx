// src/components/Sidenav/LogoutSection.tsx

import { Box } from "@mui/material";
import React from "react";

import { AppButton } from "@/components/common/Button/AppButton";
import { useAuth } from "@/context/auth";
import { getCookie } from "@/utils/cookie";
import { LogoutButton, LogoutContainer } from "./styles";

interface LogoutSectionProps {
  darkMode: boolean;
  isMobile: boolean;
  onClose?: () => void;
}

const LogoutSection: React.FC<LogoutSectionProps> = () => {
  const { handleLogout, user } = useAuth();

  return (
    <Box sx={LogoutContainer()}>
      {/* 사용자 정보 표시 */}

      {user && (
        <Box sx={{ color: "#ffffff", marginBottom: 1 }}>
          {getCookie("lms-session")}
        </Box>
      )}
      {/* 로그아웃 버튼 */}

      <AppButton
        buttonStyle="outlined"
        onClick={handleLogout}
        sx={LogoutButton}
        fullWidth
      >
        로그아웃
      </AppButton>
    </Box>
  );
};

export default LogoutSection;
