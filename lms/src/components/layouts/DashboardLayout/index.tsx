// src/layouts/DashboardLayout.tsx

import React from "react";

import sidenavRoute from "@/routes";

import Sidenav from "@/components/layouts/Sidenav";
import { SIDENAV_WIDTH } from "@/constants";
import { useDevice } from "@/context";
import { useSidenav } from "@/context/sidenav";
import MainContent from "./MainContent";
import Navbar from "./Navbar";
import PreferenceToggle from "./PreferenceToggle/PreferenceToggle";
import { LayoutContainer, MainArea, SidenavArea } from "./styles";
import { DashboardLayoutProps } from "./types";

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  title = "",
  showPreferenceToggle = true, // 테마 토글 버튼 표시 옵션
  children,
}) => {
  const { isMobile } = useDevice();
  const { isSidenavOpen, isSidenavPinned, closeSidenav, toggleSidenav } =
    useSidenav();

  return (
    <LayoutContainer>
      <SidenavArea width={!isMobile && isSidenavPinned ? SIDENAV_WIDTH : 0}>
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
            toggleSidenav();
          }}
        />
        <MainContent>{children}</MainContent>
        {/* <Footer /> */}
      </MainArea>
      {/* 테마 토글 플로팅 버튼 */}
      {showPreferenceToggle && <PreferenceToggle />}
    </LayoutContainer>
  );
};

export default DashboardLayout;
