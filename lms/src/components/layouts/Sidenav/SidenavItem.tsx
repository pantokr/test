// src/components/Sidenav/SidenavCollapse.tsx

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Icon, List, ListItemIcon, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { RouteItem } from "@/routes/types";
import { SidenavItemButton, SidenavItemRoot, SidenavSubItem } from "./styles";
import { SidenavItemProps } from "./types";

const SidenavItem: React.FC<SidenavItemProps> = ({
  route,
  darkMode,
  onNavigate,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const { name, icon, route: routePath, collapse } = route;

  if (!name) {
    return null;
  }

  const isActive = location.pathname === routePath;

  // 현재 경로가 서브아이템 중 하나와 일치하는지 확인하는 함수
  const checkActiveInCollapse = (collapseItems: RouteItem[]): boolean => {
    return collapseItems.some((item) => {
      if (item.route === location.pathname) return true;
      if (item.collapse) return checkActiveInCollapse(item.collapse);
      return false;
    });
  };

  const isParentActive = collapse ? checkActiveInCollapse(collapse) : false;

  useEffect(() => {
    if (collapse && isParentActive) {
      setOpen(true);
    }
  }, [collapse, isParentActive]);

  const handleClick = (): void => {
    if (routePath) {
      if (onNavigate) {
        onNavigate();
      }
      navigate(routePath);

      return;
    }

    if (collapse) {
      setOpen(!open);
    }
  };

  const renderIcon = (): React.ReactNode => {
    if (typeof icon === "string") {
      return <Icon>{icon}</Icon>;
    }
    return icon;
  };

  const renderExpandIcon = (): React.ReactNode => {
    if (!collapse) return null;

    return open ? <ExpandLess /> : <ExpandMore />;
  };

  const renderSubmenu = (): React.ReactNode => {
    if (!collapse) return null;

    return (
      <SidenavSubItem in={open} timeout={0} unmountOnExit>
        <List component="div" disablePadding>
          {collapse.map((subRoute) => (
            <SidenavItem
              key={subRoute.key}
              route={subRoute}
              darkMode={darkMode}
              onNavigate={onNavigate}
            />
          ))}
        </List>
      </SidenavSubItem>
    );
  };

  const ownerState = {
    active: isActive || isParentActive,
    open,
    darkMode,
  };

  return (
    <>
      <SidenavItemRoot ownerState={ownerState} disablePadding>
        <SidenavItemButton
          ownerState={ownerState}
          onClick={handleClick}
          role="button"
          aria-expanded={collapse ? open : undefined}
          aria-label={name}
        >
          {icon && <ListItemIcon>{renderIcon()}</ListItemIcon>}

          <ListItemText primary={name} />

          {renderExpandIcon()}
        </SidenavItemButton>
      </SidenavItemRoot>

      {renderSubmenu()}
    </>
  );
};

export default SidenavItem;
