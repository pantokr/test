// src/layouts/DashboardLayout.tsx

import React, { useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

import type { DashboardLayoutProps } from "@/types/index";
import { useMaterialUIController, setLayout } from "@/context";
import { useSidenav } from "@/hooks";
import Sidenav from "@/components/Layout/Sidenav";
import ThemeToggle from "@/components/Layout/ThemeToggle";
import sidenavRoute from "@/config/routes";

import { LayoutContainer, MainArea, SidenavArea } from "./styles";
import MainContent from "@/components/Layout/MainContent";
import Navbar from "@/components/Layout/Navbar"; // 상단 바
import Footer from "@/components/Layout/Footer"; // 하단 푸터
import { ContentWrapper } from "@/components/Layout/MainContent/styles";

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  showSidenav = true,
  showThemeToggle = true, // 테마 토글 버튼 표시 옵션
  children,
}) => {
  const [controller, dispatch] = useMaterialUIController();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { open: sidenavOpen, close: closeSidenav } = useSidenav();

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [dispatch]);

  return (
    <LayoutContainer>
      <SidenavArea show={showSidenav && !isMobile}>
        {}
        <Sidenav
          brand=""
          brandName="LMS"
          routes={sidenavRoute}
          open={sidenavOpen}
          onClose={closeSidenav}
        />
      </SidenavArea>

      <MainArea>
        <Navbar />
        <MainContent>{children}</MainContent>
        <Footer />
      </MainArea>

      {/* 테마 토글 플로팅 버튼 */}
      {showThemeToggle && <ThemeToggle />}
    </LayoutContainer>
  );
};

export default DashboardLayout;
