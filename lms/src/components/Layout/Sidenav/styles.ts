// src/components/Sidenav/styles.ts

import { styled } from "@mui/material/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Collapse,
} from "@mui/material";

import type { SidenavItemStyleProps, SidenavColor } from "@/types";
import { SIDENAV_WIDTH } from "@/constants";

export const SidenavRoot = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "ownerState",
})<{ ownerState: { darkMode: boolean; sidenavColor: SidenavColor } }>(
  ({ theme, ownerState }) => {
    // sidenavColor에 따른 색상 결정
    const getSidenavColors = (color: SidenavColor) => {
      switch (color) {
        case "blueGrey":
          return {
            background:
              theme.palette.mode === "dark"
                ? theme.palette.primary.dark
                : theme.palette.primary.main, // 수정: 문법 오류 해결
            border: theme.palette.primary.main,
            text: theme.palette.primary.contrastText,
          };
        case "blue":
          return {
            background:
              theme.palette.mode === "dark"
                ? theme.palette.primary.dark || theme.palette.primary.main // 수정: 중복 제거
                : theme.palette.primary.main || theme.palette.primary.light, // 수정: 중복 제거
            border: theme.palette.secondary.main,
            text: theme.palette.secondary.contrastText,
          };
        case "green":
          return {
            background:
              theme.palette.mode === "dark"
                ? theme.palette.primary.dark || theme.palette.primary.main // 수정: 중복 제거
                : theme.palette.primary.main || theme.palette.primary.light, // 수정: 중복 제거
            border: theme.palette.info.main,
            text: theme.palette.info.contrastText,
          };
        case "deepPurple":
          return {
            background:
              theme.palette.mode === "dark"
                ? theme.palette.primary.dark || theme.palette.primary.main // 수정: 중복 제거
                : theme.palette.primary.main || theme.palette.primary.light, // 수정: 중복 제거
            border: theme.palette.success.main,
            text: theme.palette.success.contrastText,
          };
        default: // 수정: default case 추가
          return {
            background:
              theme.palette.mode === "dark"
                ? theme.palette.primary.dark
                : theme.palette.primary.main,
            border: theme.palette.primary.main,
            text: theme.palette.primary.contrastText,
          };
      }
    };

    const colors = getSidenavColors(ownerState.sidenavColor);

    return {
      "& .MuiDrawer-paper": {
        width: SIDENAV_WIDTH,
        boxSizing: "border-box",
        border: "none",
        backgroundColor: "transparent",
        boxShadow: "none",
        padding: theme.spacing(2),

        "& > *": {
          background: "#1c1c1c", // 고정된 어두운 배경
          borderRadius: theme.spacing(2),
          boxShadow: "none",
          overflow: "hidden",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)", // 흰색 테두리 고정
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

export const SidenavBrandText = styled("span")(({ theme }) => ({
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
    padding: theme.spacing(0.25, 0),
  },
}));

export const SidenavItemRoot = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "ownerState",
})<{ ownerState: SidenavItemStyleProps["ownerState"] }>(
  ({ theme, ownerState }) => ({
    margin: theme.spacing(0.25, 0),
    borderRadius: theme.spacing(1),
    backgroundColor: ownerState.active
      ? `${theme.palette.primary.main}75` // active일 때만 primary 색상 배경
      : "transparent",
    transition: theme.transitions.create(["background-color", "transform"], {
      duration: theme.transitions.duration.short,
    }),
    "&:hover": {
      backgroundColor: ownerState.active
        ? `${theme.palette.primary.main}22` // active 호버는 primary 색상
        : "rgba(255, 255, 255, 0.05)", // 비활성 호버는 흰색 투명도
      transform: "translateX(2px)",
    },
  })
);

export const SidenavItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "ownerState",
})<{ ownerState: SidenavItemStyleProps["ownerState"] }>(
  ({ theme, ownerState }) => ({
    padding: theme.spacing(0.75, 2),
    borderRadius: theme.spacing(1),
    color: ownerState.active
      ? "#ffffff" // 활성화된 아이템은 흰색
      : "#ffffff", // 기본은 흰색 고정
    transition: theme.transitions.create(["color"], {
      duration: theme.transitions.duration.short,
    }),
    minHeight: 36,
    "& .MuiListItemIcon-root": {
      minWidth: 36,
      color: "inherit",
      "& .MuiSvgIcon-root": {
        fontSize: theme.typography.body1.fontSize,
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
    paddingTop: theme.spacing(0.25),
    paddingBottom: theme.spacing(0.25),
  },
}));

export const SidenavDivider = styled("div")(({ theme }) => ({
  height: 1,
  background:
    "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)", // 흰색 고정
  margin: theme.spacing(1, 2),
  borderRadius: 1,
}));

export const SidenavTitle = styled("div", {
  shouldForwardProp: (prop) => prop !== "darkMode",
})<{ darkMode?: boolean }>(({ theme }) => ({
  padding: theme.spacing(1.5, 2, 0.5, 2),
  fontSize: theme.typography.caption.fontSize,
  fontWeight: theme.typography.fontWeightBold,
  fontFamily: theme.typography.fontFamily,
  textTransform: "uppercase",
  letterSpacing: "0.8px",
  color: "rgba(255, 255, 255, 0.6)", // 흰색 고정
}));
