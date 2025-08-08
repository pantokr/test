// src/components/Sidenav/styles.ts

import { styled } from "@mui/material/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Collapse,
} from "@mui/material";

import type {
  SidenavStyleProps,
  SidenavCollapseStyleProps,
} from "@/types/sidenav";
import { SIDENAV_WIDTH } from "@/constants";

export const SidenavRoot = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "ownerState",
})<{ ownerState: SidenavStyleProps["ownerState"] }>(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: SIDENAV_WIDTH,
    boxSizing: "border-box",
    border: "none",
    backgroundColor: "transparent",
    boxShadow: "none",
    padding: theme.spacing(2),

    "& > *": {
      background: "#2c2c2c",
      borderRadius: theme.spacing(2),
      boxShadow: "none", // 그림자 제거
      overflow: "hidden",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },

    overflowX: "visible",
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

export const SidenavContent = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

export const SidenavBrand = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2, 1.5, 2),
  minHeight: 56,
  borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
  color: "#ffffff",
}));

export const SidenavBrandLogo = styled("img")(({ theme }) => ({
  width: 32,
  height: 32,
  marginRight: theme.spacing(1),
}));

export const SidenavBrandText = styled("span")(() => ({
  fontSize: "1.25rem",
  fontWeight: 600,
  color: "inherit",
  textDecoration: "none",
}));

export const SidenavList = styled(List)(({ theme }) => ({
  padding: theme.spacing(0.5, 1.5),
  flex: 1,

  "& .MuiListItem-root": {
    padding: theme.spacing(0.25, 0),
  },
}));

export const SidenavCollapseRoot = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "ownerState",
})<{ ownerState: SidenavCollapseStyleProps["ownerState"] }>(
  ({ theme, ownerState }) => ({
    margin: theme.spacing(0.25, 0),
    borderRadius: theme.spacing(1),
    backgroundColor: ownerState.active
      ? "rgba(255, 255, 255, 0.1)"
      : "transparent",
    transition: theme.transitions.create(["background-color", "transform"], {
      duration: theme.transitions.duration.short,
    }),
    "&:hover": {
      backgroundColor: ownerState.active
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(255, 255, 255, 0.05)",
      transform: "translateX(2px)",
    },
  })
);

export const SidenavCollapseButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "ownerState",
})<{ ownerState: SidenavCollapseStyleProps["ownerState"] }>(
  ({ theme, ownerState }) => ({
    padding: theme.spacing(0.75, 2),
    borderRadius: theme.spacing(1),
    color: ownerState.active ? "#ffffff" : "rgba(255, 255, 255, 0.8)",
    transition: theme.transitions.create(["color"], {
      duration: theme.transitions.duration.short,
    }),
    minHeight: 36,
    "& .MuiListItemIcon-root": {
      minWidth: 36,
      color: "inherit",
      "& .MuiSvgIcon-root": {
        fontSize: "1.1rem",
      },
    },
    "& .MuiListItemText-root": {
      margin: 0,
      "& .MuiTypography-root": {
        fontSize: "0.8rem",
        fontWeight: ownerState.active ? 600 : 400,
        lineHeight: 1.2,
      },
    },
  })
);

export const SidenavSubCollapse = styled(Collapse)(({ theme }) => ({
  "& .MuiList-root": {
    paddingLeft: theme.spacing(2.5),
    paddingTop: theme.spacing(0.25),
    paddingBottom: theme.spacing(0.25),
  },
}));

export const SidenavDivider = styled("div")(({ theme }) => ({
  height: 1,
  background:
    "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
  margin: theme.spacing(1, 2),
  borderRadius: 1,
}));

export const SidenavTitle = styled("div", {
  shouldForwardProp: (prop) => prop !== "darkMode",
})<{ darkMode?: boolean }>(({ theme }) => ({
  padding: theme.spacing(1.5, 2, 0.5, 2),
  fontSize: "0.7rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.8px",
  color: "rgba(255, 255, 255, 0.6)",
}));
