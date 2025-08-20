// src/components/Sidenav/styles.ts

import {
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { AppBox } from "@/components/common/Box";
import AppTypography from "@/components/common/Typography";
import { SIDENAV_WIDTH } from "@/constants";
import { SidenavItemStyleProps } from "./types";

export const SidenavRoot = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "ownerState",
})<{ ownerState: { darkMode: boolean } }>(({ theme }) => {
  return {
    "& .MuiDrawer-paper": {
      width: SIDENAV_WIDTH,
      boxSizing: "border-box",
      border: "none",
      backgroundColor: "transparent",
      boxShadow: "none",

      "& > *": {
        background: "#1c1c1caa",
        overflow: "hidden",
        backdropFilter: "blur(10px)",
        height: "100%", // 전체 높이 사용
      },

      overflowX: "visible",
      transition: theme.transitions.create(["width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shortest,
      }),
    },

    // Drawer root 자체의 borderRadius도 제거
    "& .MuiPaper-root": {
      borderRadius: "0 !important",
    },
  };
});

export const SidenavContent = styled(AppBox)(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  padding: 0, // padding 값 설정
}));

export const SidenavBrand = styled(AppBox)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2, 2, 2),
  minHeight: 56,
  borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
  color: "#ffffff",
}));

export const SidenavBrandText = styled(AppTypography)(({ theme }) => ({
  fontSize: theme.typography.h5.fontSize,
  fontWeight: theme.typography.h5.fontWeight,
  fontFamily: theme.typography.fontFamily,
  color: "inherit",
  textDecoration: "none",
}));

export const SidenavList = styled(List)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  flex: 1,

  "& .MuiListItem-root": {
    padding: theme.spacing(0.125, 0),
  },
}));

export const SidenavItemRoot = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "ownerState",
})<{ ownerState: SidenavItemStyleProps["ownerState"] }>(
  ({ theme, ownerState }) => ({
    margin: theme.spacing(0.25, 0),
    borderRadius: theme.spacing(1),
    backgroundColor: ownerState.active
      ? `${theme.palette.primary.main}75`
      : "transparent",
    transition: theme.transitions.create(["background-color", "transform"], {
      duration: theme.transitions.duration.short,
    }),
    "&:hover": {
      backgroundColor: ownerState.active
        ? `${theme.palette.primary.main}2`
        : "rgba(255, 255, 255, 0.05)",
      transform: "translateX(2px)",
    },
  })
);

export const SidenavItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "ownerState",
})<{ ownerState: SidenavItemStyleProps["ownerState"] }>(
  ({ theme, ownerState }) => ({
    padding: theme.spacing(0, 1),
    borderRadius: theme.spacing(1),
    color: ownerState.active ? "#ffffff" : "#ffffff",
    transition: theme.transitions.create(["color"], {
      duration: theme.transitions.duration.short,
    }),
    minHeight: 24,
    "& .MuiListItemIcon-root": {
      minWidth: 32,
      color: "inherit",
      "& .MuiSvgIcon-root": {
        fontSize: theme.typography.body2.fontSize,
      },
    },
    "& .MuiListItemText-root": {
      margin: 0,
      "& .MuiTypography-root": {
        fontSize: theme.typography.body2.fontSize,
        fontWeight: ownerState.active
          ? theme.typography.fontWeightMedium
          : theme.typography.fontWeightRegular,
        fontFamily: theme.typography.fontFamily,
        lineHeight: theme.typography.body2.lineHeight,
      },
    },
  })
);

export const SidenavSubItem = styled(Collapse)(({ theme }) => ({
  "& .MuiList-root": {
    paddingLeft: theme.spacing(2.5),
    paddingTop: theme.spacing(0.125),
    paddingBottom: theme.spacing(0.125),
  },
}));

export const SidenavDivider = styled(Divider)(({ theme }) => ({
  height: 1,
  background:
    "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
  margin: theme.spacing(1, 2),
  borderRadius: 1,
  border: "none",
}));

export const SidenavTitle = styled(AppTypography, {
  shouldForwardProp: (prop) => prop !== "darkMode",
})<{ darkMode?: boolean }>(({ theme }) => ({
  fontSize: theme.typography.caption.fontSize,
  fontWeight: theme.typography.fontWeightBold,
  fontFamily: theme.typography.fontFamily,
  textTransform: "uppercase",
  letterSpacing: "0.8px",
  color: "rgba(255, 255, 255, 0.6)",
}));
