/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import pxToRem from "assets/theme/functions/pxToRem";

function navbar(theme, ownerState) {
  const { palette, boxShadows, functions, transitions, breakpoints, borders } = theme;
  const { transparentNavbar, absolute, light, darkMode } = ownerState;

  const { dark, white, text, transparent, background } = palette;
  const { navbarBoxShadow } = boxShadows;
  const { rgba, pxToRem } = functions;
  const { borderRadius } = borders;

  return {
    boxShadow: transparentNavbar || absolute ? "none" : navbarBoxShadow,
    backdropFilter: transparentNavbar || absolute ? "none" : `saturate(200%) blur(${pxToRem(30)})`,
    backgroundColor:
      transparentNavbar || absolute
        ? `${transparent.main} !important`
        : rgba(darkMode ? background.default : white.main, 0.8),

    color: () => {
      let color;

      if (light) {
        color = white.main;
      } else if (transparentNavbar) {
        color = text.main;
      } else {
        color = dark.main;
      }

      return color;
    },
    top: absolute ? 0 : pxToRem(12),
    minHeight: pxToRem(80), // 기존 60px → 80px로 증가
    display: "grid",
    alignItems: "center",
    borderRadius: borderRadius.xl,
    // 패딩 조정: 더 여유로운 상하 패딩
    paddingTop: pxToRem(8), // 기존 8px → 16px
    paddingBottom: pxToRem(8), // 기존 8px → 16px
    paddingRight: absolute ? pxToRem(8) : 0,
    paddingLeft: absolute ? pxToRem(16) : 0,

    "& > *": {
      transition: transitions.create("all", {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
    },

    "& .MuiToolbar-root": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      // 툴바 높이 조정
      // minHeight: pxToRem(60), // 추가: 툴바 최소 높이 설정

      [breakpoints.up("sm")]: {
        minHeight: pxToRem(65), // sm 이상에서 더 여유로운 높이
        padding: `${pxToRem(4)} ${pxToRem(16)}`, // 기존 4px → 8px
      },

      [breakpoints.up("md")]: {
        minHeight: pxToRem(70), // md 이상에서 더 여유로운 높이
        padding: `${pxToRem(8)} ${pxToRem(16)}`, // md에서 더 많은 패딩
      },
    },
  };
}

const navbarContainer = ({ breakpoints }) => ({
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  pt: 1, // 기존 0.5 → 1로 증가
  pb: 1, // 기존 0.5 → 1로 증가

  [breakpoints.up("md")]: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: pxToRem(8), // md에서 상단 패딩 추가
    paddingBottom: pxToRem(8), // md에서 하단 패딩 추가
  },
});

const navbarRow = ({ breakpoints }, { isMini }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  // 행 높이 조정
  minHeight: pxToRem(48), // 추가: 행 최소 높이

  [breakpoints.up("md")]: {
    justifyContent: isMini ? "space-between" : "stretch",
    width: isMini ? "100%" : "max-content",
    minHeight: pxToRem(52), // md에서 더 높은 행 높이
  },

  [breakpoints.up("xl")]: {
    justifyContent: "stretch !important",
    width: "max-content !important",
    minHeight: pxToRem(56), // xl에서 가장 높은 행 높이
  },
});

const navbarIconButton = ({ typography: { size }, breakpoints }) => ({
  px: 1.5, // 기존 1 → 1.5로 좌우 패딩 증가
  py: 1, // 추가: 상하 패딩 추가

  "& .material-icons, .material-icons-round": {
    fontSize: `${size.xl} !important`,
  },

  "& .MuiTypography-root": {
    display: "none",

    [breakpoints.up("sm")]: {
      display: "inline-block",
      lineHeight: 1.4, // 기존 1.2 → 1.4로 줄간격 증가
      ml: 0.75, // 기존 0.5 → 0.75로 여백 증가
    },
  },
});

const navbarMobileMenu = ({ breakpoints }) => ({
  display: "inline-block",
  lineHeight: 0,
  padding: pxToRem(8), // 추가: 모바일 메뉴 패딩

  [breakpoints.up("xl")]: {
    display: "none",
  },
});

export { navbar, navbarContainer, navbarRow, navbarIconButton, navbarMobileMenu };
