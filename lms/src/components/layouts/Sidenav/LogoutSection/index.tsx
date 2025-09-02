// src/components/Sidenav/LogoutSection.tsx

import React from "react";

import { AppBox } from "@/components/common/Box";
import { AppButton } from "@/components/common/Button/AppButton";
import AppTypography from "@/components/common/Typography";
import { useAuth, useSidenav } from "@/context";
import { format } from "date-fns";
import { LogoutButton, LogoutContainer } from "./styles";

interface LogoutSectionProps {
  darkMode: boolean;
  isMobile: boolean;
  onClose?: () => void;
}

const LogoutSection: React.FC<LogoutSectionProps> = () => {
  const { logout, remainingSessionTime } = useAuth();
  const { resetSidenav } = useSidenav();
  const formatTime = (seconds: number) =>
    format(new Date(seconds * 1000), "mm:ss");

  return (
    <AppBox sx={LogoutContainer()}>
      {/* 사용자 정보 표시 */}

      <AppBox sx={{ color: "#ffffff", marginBottom: 1, textAlign: "right" }}>
        <AppTypography>
          남은 시간 : {formatTime(remainingSessionTime)}
        </AppTypography>
      </AppBox>

      {/* 로그아웃 버튼 */}

      <AppButton
        variant="outlined"
        onClick={async () => {
          await logout();
          resetSidenav();
        }}
        sx={LogoutButton}
        fullWidth
      >
        로그아웃
      </AppButton>
    </AppBox>
  );
};

export default LogoutSection;
