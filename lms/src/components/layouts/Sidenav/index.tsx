// src/components/Sidenav/index.tsx (brand 로고 제거 버전)

import type { ReactNode } from "react";
import React, { useCallback } from "react";

import { AppIconButton, Row } from "@/components/common";
import AppTypography from "@/components/common/Typography";
import { useDevice, useSidenav, useThemeSettings } from "@/context";
import { RouteItem } from "@/routes/types";
import { isPublicRoute } from "@/utils/route";
import { Close } from "@mui/icons-material";
import LogoutSection from "./LogoutSection";
import SidenavItem from "./SidenavItem";
import {
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
  isOpen = false,
  onClose,
}) => {
  const { themeSettings } = useThemeSettings();
  const { isSidenavPinned } = useSidenav();
  const { isMobile } = useDevice();

  // onClose를 useCallback으로 메모이제이션하여 무한 루프 방지
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const renderBrand = (): ReactNode => (
    <Row
      mainAxisAlignment="spaceBetween"
      crossAxisAlignment="center"
      sx={{ backgroundColor: "transparent" }}
    >
      <AppTypography fontSize="large" variant="h1" color="white">
        {brandName}
      </AppTypography>
      <AppIconButton onClick={handleClose} size="large" iconColor="white">
        <Close />
      </AppIconButton>
    </Row>
  );

  const renderRoutes = (routes: RouteItem[]): ReactNode =>
    routes.map((route) => {
      // Public route는 렌더링하지 않음
      if (route.route && isPublicRoute(route.route)) {
        return null;
      }

      // 작은 아이템의 묶음
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
            darkMode={themeSettings.darkMode}
            onNavigate={handleClose}
          />
        );
      }

      // 구분선
      if (route.divider) return <SidenavDivider key={`divider-${route.key}`} />;

      // 제목
      if (route.title)
        return (
          <SidenavTitle
            key={`title-${route.key}`}
            darkMode={themeSettings.darkMode}
          >
            {route.title}
          </SidenavTitle>
        );

      // 큰 ITEM
      if (route.name)
        return (
          <SidenavItem
            key={route.key}
            route={route}
            darkMode={themeSettings.darkMode}
            onNavigate={handleClose}
          />
        );
      return null;
    });
  return (
    <SidenavRoot
      variant={!isSidenavPinned ? "temporary" : "persistent"}
      open={isOpen}
      onClose={handleClose}
      ownerState={{
        darkMode: themeSettings.darkMode,
      }}
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
          darkMode={themeSettings.darkMode}
          isMobile={isMobile}
          onClose={handleClose}
        />
      </SidenavContent>
    </SidenavRoot>
  );
};

export default Sidenav;
export * from "./types";
