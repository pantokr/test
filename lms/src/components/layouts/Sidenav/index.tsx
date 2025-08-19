// src/components/Sidenav/index.tsx (brand 로고 제거 버전)

import { Close } from "@mui/icons-material";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import type { ReactNode } from "react";
import React, { useCallback } from "react";

import { useSidenav, useUserSettings } from "@/context/theme";
import { RouteItem } from "@/routes/types";
import { isPublicRoute } from "@/utils/route";
import LogoutSection from "./LogoutSection";
import SidenavItem from "./SidenavItem";
import {
  SidenavBrand,
  SidenavBrandText,
  SidenavContent,
  SidenavDivider,
  SidenavList,
  SidenavRoot,
  SidenavTitle,
} from "./styles";
import { SidenavProps } from "./types";

const Sidenav: React.FC<Omit<SidenavProps, "color">> = ({
  routes,
  brandName = "LMS",
  isOpen = true,
  onClose,
}) => {
  // useUserSettings에서 sidenavColor와 isDark 가져오기
  const { isDark } = useUserSettings();
  const { sidenavColor, closeSidenav } = useSidenav();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  // onClose를 useCallback으로 메모이제이션하여 무한 루프 방지
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      closeSidenav(); // fallback으로 context의 closeSidenav 사용
    }
  }, [onClose, closeSidenav]);

  const renderBrand = (): ReactNode => (
    <SidenavBrand>
      <SidenavBrandText>{brandName}</SidenavBrandText>
      {isMobile && (
        <IconButton
          onClick={handleClose}
          sx={{ marginLeft: "auto", color: "inherit" }}
          aria-label="Close sidebar"
        >
          <Close />
        </IconButton>
      )}
    </SidenavBrand>
  );

  const renderRoutes = (routes: RouteItem[]): ReactNode =>
    routes.map((route) => {
      // Public route는 렌더링하지 않음
      if (route.route && isPublicRoute(route.route)) {
        return null;
      }

      // collapse가 있는 경우 하위 라우트들도 체크
      if (route.collapse) {
        const filteredCollapse = route.collapse.filter((subRoute) => {
          // 하위 라우트가 public route가 아닌 경우만 포함
          return !(subRoute.route && isPublicRoute(subRoute.route));
        });

        // 필터링 후 남은 하위 라우트가 없으면 전체 메뉴 숨김
        if (filteredCollapse.length === 0) {
          return null;
        }

        // 필터링된 하위 라우트로 업데이트
        const filteredRoute = {
          ...route,
          collapse: filteredCollapse,
        };

        return (
          <SidenavItem
            key={`${route.key}-${location.pathname}`} // 경로 변경시 강제 리마운팅
            route={filteredRoute}
            darkMode={isDark}
          />
        );
      }

      if (route.divider) return <SidenavDivider key={`divider-${route.key}`} />;
      if (route.title)
        return (
          <SidenavTitle key={`title-${route.key}`} darkMode={isDark}>
            {route.title}
          </SidenavTitle>
        );
      if (route.name)
        return <SidenavItem key={route.key} route={route} darkMode={isDark} />;
      return null;
    });
  return (
    <SidenavRoot
      variant={isMobile ? "temporary" : "permanent"}
      open={isOpen}
      onClose={handleClose}
      ownerState={{
        darkMode: isDark,
        sidenavColor, // sidenavColor 전달
      }}
      ModalProps={{ keepMounted: true }}
    >
      <SidenavContent
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {renderBrand()}
        <SidenavList sx={{ flex: 1, overflow: "auto" }}>
          {renderRoutes(routes)}
        </SidenavList>
        <LogoutSection
          darkMode={isDark}
          isMobile={isMobile}
          onClose={handleClose}
        />
      </SidenavContent>
    </SidenavRoot>
  );
};

export default Sidenav;
export * from "./types";
