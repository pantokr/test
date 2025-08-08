import React, { useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

import type { DashboardLayoutProps } from "@/types/layout";
import { useMaterialUIController, setLayout } from "@/context";
import { useSidenav } from "@/hooks";
import Sidenav from "@/components/Layout/Sidenav";
import routes from "@/routes";

import { LayoutContainer, MainArea, SidenavArea } from "./styles";
import MainContent from "@/components/Layout/MainContent";
import Navbar from "@/components/Layout/Navbar"; // 상단 바
import Footer from "@/components/Layout/Footer"; // 하단 푸터

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  showSidenav = true,
  children,
}) => {
  const [controller, dispatch] = useMaterialUIController();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { open: sidenavOpen, close: closeSidenav } = useSidenav();

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [dispatch]);

  console.log({ children, showSidenav, isMobile, sidenavOpen });
  return (
    <LayoutContainer>
      <SidenavArea show={showSidenav && !isMobile}>
        <Sidenav
          brand=""
          brandName="LMS"
          routes={routes}
          open={sidenavOpen}
          onClose={closeSidenav}
        />
      </SidenavArea>

      <MainArea>
        <Navbar />
        <MainContent>{children}</MainContent>
        <Footer />
      </MainArea>
    </LayoutContainer>
  );
};

export default DashboardLayout;
