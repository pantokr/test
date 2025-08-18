// src/layouts/DashboardLayout.tsx

import React, { useCallback } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

import type { DashboardLayoutProps } from "@/types/index";

import PreferenceToggle from "@/components/Layout/PreferenceToggle";
import sidenavRoute from "@/routes";

import { LayoutContainer, MainArea, SidenavArea } from "./styles";
import MainContent from "@/components/Layout/MainContent";
import Navbar from "@/components/Layout/Navbar"; // 상단 바
import Footer from "@/components/Layout/Footer"; // 하단 푸터
import Sidenav from "@/components/Layout/Sidenav";
import { useSidenav } from "@/context";

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  showSidenav = true,
  showThemeToggle = true, // 테마 토글 버튼 표시 옵션
  children,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { openSidenav, closeSidenav } = useSidenav();

  return (
    <LayoutContainer>
      <SidenavArea show={showSidenav && !isMobile}>
        {}
        <Sidenav
          brandName="LMS"
          routes={sidenavRoute}
          open={openSidenav}
          onClose={closeSidenav}
        />
      </SidenavArea>

      <MainArea>
        <Navbar />
        <MainContent>{children}</MainContent>
        <Footer />
      </MainArea>

      {/* 테마 토글 플로팅 버튼 */}
      {showThemeToggle && <PreferenceToggle />}
    </LayoutContainer>
  );
};

export default DashboardLayout;
