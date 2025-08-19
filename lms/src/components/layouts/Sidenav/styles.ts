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
import { AppColorSchemes } from "@/types";
import { SidenavItemStyleProps } from "./types";

export const SidenavRoot = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "ownerState",
})<{ ownerState: { darkMode: boolean; sidenavColor: AppColorSchemes } }>(
  ({ theme }) => {
    // sidenavColor에 따른 색상 결정

    return {
      "& .MuiDrawer-paper": {
        width: SIDENAV_WIDTH,
        boxSizing: "border-box",
        border: "none",
        backgroundColor: "transparent",
        boxShadow: "none",
        padding: theme.spacing(2),

        "& > *": {
          background: "#1c1c1c",
          borderRadius: theme.spacing(2),
          boxShadow: "none",
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
    };
  }
);

export const SidenavContent = styled(AppBox)(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
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
  padding: theme.spacing(0.5, 1.5),
  flex: 1,

  "& .MuiListItem-root": {
    padding: theme.spacing(0.125, 0), // 기존 0.25에서 0.125로 줄임
  },
}));

export const SidenavItemRoot = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "ownerState",
})<{ ownerState: SidenavItemStyleProps["ownerState"] }>(
  ({ theme, ownerState }) => ({
    margin: theme.spacing(0.25, 0), // 기존 0.25에서 0.125로 줄임
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
        fontSize: theme.typography.body2.fontSize, // body1에서 body2로 아이콘 크기 줄임
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
    paddingTop: theme.spacing(0.125), // 기존 0.25에서 0.125로 줄임
    paddingBottom: theme.spacing(0.125), // 기존 0.25에서 0.125로 줄임
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
  padding: theme.spacing(1.5, 2, 0.5, 2),
  fontSize: theme.typography.caption.fontSize,
  fontWeight: theme.typography.fontWeightBold,
  fontFamily: theme.typography.fontFamily,
  textTransform: "uppercase",
  letterSpacing: "0.8px",
  color: "rgba(255, 255, 255, 0.6)",
}));
