// src/layouts/DashboardLayout.tsx

import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";

import sidenavRoute from "@/routes";

import Sidenav from "@/components/layouts/Sidenav";
import { useSidenav } from "@/context";
import Footer from "./Footer";
import MainContent from "./MainContent";
import Navbar from "./Navbar";
import PreferenceToggle from "./PreferenceToggle";
import { LayoutContainer, MainArea, SidenavArea } from "./styles";
import { DashboardLayoutProps } from "./types";

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  title = "",
  showSidenav = true,
  showPreferenceToggle = true, // 테마 토글 버튼 표시 옵션
  children,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { isSidenavOpen, closeSidenav, toggleSidenav } = useSidenav();

  return (
    <LayoutContainer>
      <SidenavArea show={showSidenav && !isMobile}>
        {}
        <Sidenav
          brandName="LMS"
          routes={sidenavRoute}
          isOpen={isSidenavOpen}
          onClose={closeSidenav}
        />
      </SidenavArea>

      <MainArea>
        <Navbar
          title={title}
          onSidenavToggle={() => {
            // if (isMobile) {
            //   toggleSidenav();
            // }
            toggleSidenav();
          }}
        />
        <MainContent>{children}</MainContent>
        <Footer />
      </MainArea>

      {/* 테마 토글 플로팅 버튼 */}
      {showPreferenceToggle && <PreferenceToggle />}
    </LayoutContainer>
  );
};

export default DashboardLayout;
