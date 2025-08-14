// src/components/Sidenav/SidenavCollapse.tsx

import React, { useState } from "react";
import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ListItemIcon,
  ListItemText,
  Icon,
  Collapse,
  List,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import type { RouteItem } from "@/types";
import { useMaterialUIController } from "@/context";
import { SidenavItemRoot, SidenavItemButton, SidenavSubItem } from "./styles";

interface SidenavItemProps {
  route: RouteItem;
  darkMode: boolean;
}

const SidenavItem: React.FC<SidenavItemProps> = ({ route, darkMode }) => {
  const [controller] = useMaterialUIController();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const {
    key,
    name,
    icon,
    route: routePath,
    collapse,
    noCollapse,
    href,
    target,
    badge,
  } = route;

  if (!name) {
    return null;
  }

  const isActive = location.pathname === routePath;
  const isParentActive =
    collapse?.some((item) => location.pathname === item.route) || false;

  const handleClick = (): void => {
    if (href) {
      window.open(href, target || "_self");
      return;
    }

    if (routePath) {
      navigate(routePath);
      return;
    }

    if (collapse && !noCollapse) {
      setOpen(!open);
    }
  };

  const renderIcon = (): React.ReactNode => {
    if (typeof icon === "string") {
      return <Icon>{icon}</Icon>;
    }
    return icon;
  };

  const renderBadge = (): React.ReactNode => {
    if (!badge) return null;

    return (
      <span style={{ backgroundColor: badge.color }}>{badge.content}</span>
    );
  };

  const renderExpandIcon = (): React.ReactNode => {
    if (!collapse || noCollapse) return null;

    return open ? <ExpandLess /> : <ExpandMore />;
  };

  const renderSubmenu = (): React.ReactNode => {
    if (!collapse || noCollapse) return null;

    return (
      <SidenavSubItem in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {collapse.map((subRoute) => (
            <SidenavItem
              key={subRoute.key}
              route={subRoute}
              darkMode={darkMode}
            />
          ))}
        </List>
      </SidenavSubItem>
    );
  };

  const ownerState = {
    active: isActive || isParentActive,
    noCollapse: Boolean(noCollapse),
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
          aria-expanded={collapse && !noCollapse ? open : undefined}
          aria-label={name}
        >
          {icon && <ListItemIcon>{renderIcon()}</ListItemIcon>}

          <ListItemText
            primary={name}
            primaryTypographyProps={{
              noWrap: true,
            }}
          />

          {renderBadge()}
          {renderExpandIcon()}
        </SidenavItemButton>
      </SidenavItemRoot>

      {renderSubmenu()}
    </>
  );
};

export default SidenavItem;
