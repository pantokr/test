// src/components/Sidenav/LogoutSection.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";
import {
  AccessAlarm,
  Dashboard,
  Logout as LogoutIcon,
} from "@mui/icons-material";

import { useAuth } from "@/context/auth";
import { LogoutContainer, userInfo, LogoutButton } from "./styles";

interface LogoutSectionProps {
  darkMode: boolean;
  isMobile: boolean;
  onClose?: () => void;
}

const LogoutSection: React.FC<LogoutSectionProps> = ({ darkMode }) => {
  const { handleLogout, isAuthenticated } = useAuth();

  // 인증된 사용자에게만 로그아웃 버튼 표시
  if (!isAuthenticated) return null;

  return (
    <Box sx={LogoutContainer(darkMode)}>
      {/* 사용자 정보 표시 */}
      {/* {user && (
        <Box sx={userInfoStyles}>
          {user.empName} ({user.deptName})
        </Box>
      )} */}

      <Button
        fullWidth
        variant="outlined"
        startIcon={<AccessAlarm />}
        onClick={handleLogout}
        sx={LogoutButton}
      >
        로그아웃
      </Button>
    </Box>
  );
};

export default LogoutSection;
