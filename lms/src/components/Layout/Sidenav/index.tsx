// src/components/Sidenav/index.tsx

import React, { useEffect } from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Close } from "@mui/icons-material";

import type { SidenavProps, SidenavRoute } from "@/types/sidenav";
import { useMaterialUIController, setLayout } from "@/context";
import SidenavCollapse from "./SidenavCollapse";
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
      if (route.divider) return <SidenavDivider key={`divider-${route.key}`} />;
      if (route.title)
        return (
          <SidenavTitle key={`title-${route.key}`} darkMode={darkMode}>
            {route.title}
          </SidenavTitle>
        );
      if (route.name)
        return (
          <SidenavCollapse key={route.key} route={route} darkMode={darkMode} />
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
      <SidenavContent>
        {renderBrand()}
        <SidenavList>{renderRoutes(routes)}</SidenavList>
      </SidenavContent>
    </SidenavRoot>
  );
};

export default Sidenav;
