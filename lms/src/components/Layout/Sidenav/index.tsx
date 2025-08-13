// src/components/Sidenav/index.tsx (컴포넌트 분리 버전)

import React, { useEffect } from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Close } from "@mui/icons-material";

import type { SidenavProps, SidenavRoute } from "@/types/sidenav";
import { useMaterialUIController, setLayout } from "@/context";
import SidenavItem from "./SidenavItem";
import LogoutSection from "./LogoutSection";
import {
  SidenavRoot,
  SidenavContent,
  SidenavBrand,
  SidenavBrandLogo,
  SidenavBrandText,
  SidenavList,
  SidenavDivider,
  SidenavTitle,
} from "./styles";
import { isPublicRoute } from "@/utils/route";

const Sidenav: React.FC<Omit<SidenavProps, "color">> = ({
  brand,
  brandName = "LMS",
  routes,
  open = true,
  onClose,
}) => {
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    if (isMobile && onClose) {
      onClose();
    }
  }, [location.pathname, isMobile, onClose]);

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [dispatch]);

  const renderBrand = (): ReactNode => (
    <SidenavBrand>
      {brand && <SidenavBrandLogo src={brand} alt="Brand" />}
      <SidenavBrandText>{brandName}</SidenavBrandText>
      {isMobile && onClose && (
        <IconButton
          onClick={onClose}
          sx={{ marginLeft: "auto", color: "inherit" }}
          aria-label="Close sidebar"
        >
          <Close />
        </IconButton>
      )}
    </SidenavBrand>
  );

  const renderRoutes = (routes: SidenavRoute[]): ReactNode =>
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
            key={route.key}
            route={filteredRoute}
            darkMode={darkMode}
          />
        );
      }

      if (route.divider) return <SidenavDivider key={`divider-${route.key}`} />;
      if (route.title)
        return (
          <SidenavTitle key={`title-${route.key}`} darkMode={darkMode}>
            {route.title}
          </SidenavTitle>
        );
      if (route.name)
        return (
          <SidenavItem key={route.key} route={route} darkMode={darkMode} />
        );
      return null;
    });

  return (
    <SidenavRoot
      variant={isMobile ? "temporary" : "permanent"}
      open={open}
      onClose={onClose}
      ownerState={{ darkMode }}
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
          darkMode={darkMode}
          isMobile={isMobile}
          onClose={onClose}
        />
      </SidenavContent>
    </SidenavRoot>
  );
};

export default Sidenav;
