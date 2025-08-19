// src/layouts/DashboardLayout/Navbar/styles.ts

import { AppBar, Box, InputBase, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";

/**
 * 메인 네비바 컨테이너
 */
export const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "transparent",
})<{ transparent?: boolean }>(({ theme }) => ({
  position: "sticky",
  color: "inherit",
  elevation: 0,
  backgroundColor: "transparent", // 🌟 완전 투명 배경
  backdropFilter: "none", // 블러 제거
  boxShadow: "none", // 그림자 제거
  border: "none", // 테두리 제거
  zIndex: theme.zIndex.drawer - 1,
  height: 64,
  transition: theme.transitions.create(["background-color", "box-shadow"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  }),
}));

/**
 * 툴바 컨테이너
 */
export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  minHeight: "64px !important",
  padding: theme.spacing(0, 3),

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0, 2),
  },
}));

/**
 * 왼쪽 섹션 (제목, 브레드크럼)
 */
export const LeftSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  flex: 1,
}));

/**
 * 제목 컨테이너
 */
export const TitleContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
}));

/**
 * 가운데 섹션 (검색창)
 */
export const CenterSection = styled(Box)(({ theme }) => ({
  flex: "0 1 400px",
  margin: theme.spacing(0, 3),

  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

/**
 * 오른쪽 섹션 (액션 버튼들)
 */
export const RightSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
}));

/**
 * 검색창 컨테이너
 */
export const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.spacing(1),
  backgroundColor: "rgba(255, 255, 255, 0.1)", // 어두운 테마에 맞는 색상
  border: "1px solid rgba(255, 255, 255, 0.1)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  "&:focus-within": {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  marginLeft: 0,
  width: "100%",
  transition: theme.transitions.create(["background-color", "border-color"], {
    duration: theme.transitions.duration.short,
  }),

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

/**
 * 검색 아이콘 래퍼
 */
export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary, // 테마 보조 텍스트 색상
}));

/**
 * 검색 입력창
 */
export const SearchInput = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary, // 테마 기본 텍스트 색상
  width: "100%",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",

    "&::placeholder": {
      color: theme.palette.text.secondary, // 테마 보조 텍스트 색상
      opacity: 0.7,
    },

    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

/**
 * 액션 버튼 (설정, 알림 등)
 */
export const ActionButton = styled("button")(({ theme }) => ({
  background: "none",
  border: "none",
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary, // 테마 보조 텍스트 색상
  transition: theme.transitions.create(["background-color", "color"], {
    duration: theme.transitions.duration.short,
  }),

  "&:hover": {
    backgroundColor: theme.palette.action.hover, // 테마 호버 색상
    color: theme.palette.text.primary, // 테마 기본 텍스트 색상
  },

  "&:focus": {
    outline: "none",
    backgroundColor: theme.palette.action.hover,
  },
}));

/**
 * 사용자 정보 섹션
 */
export const UserSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(1),
}));

/**
 * 사용자 이름
 */
export const UserName = styled("span")(({ theme }) => ({
  color: theme.palette.text.primary, // 테마 기본 텍스트 색상
  fontSize: "0.875rem",
  marginRight: theme.spacing(1),
  maxWidth: 120,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",

  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

/**
 * 브레드크럼 컨테이너
 */
export const BreadcrumbContainer = styled(Box)(({ theme }) => ({
  "& .MuiBreadcrumbs-separator": {
    color: theme.palette.text.disabled, // 테마 비활성 텍스트 색상
    margin: theme.spacing(0, 0.5),
  },

  "& a": {
    textDecoration: "none",
    color: theme.palette.text.secondary, // 테마 보조 텍스트 색상
    display: "flex",
    alignItems: "center",

    "&:hover": {
      color: theme.palette.text.primary, // 테마 기본 텍스트 색상
      textDecoration: "underline",
    },
  },

  "& .MuiTypography-root": {
    fontSize: "0.875rem",

    "&:last-child": {
      color: theme.palette.text.primary, // 테마 기본 텍스트 색상
      fontWeight: 500,
    },
  },

  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

/**
 * 메뉴 스타일 (공통)
 */
export const menuStyles = {
  mt: 1,
  "& .MuiPaper-root": {
    backgroundColor: "rgba(26, 26, 26, 0.95)", // 반투명 다크 배경
    backdropFilter: "blur(20px)", // 블러 효과로 유리 느낌
    color: "#ffffff", // 메뉴는 흰색 텍스트 유지
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: 2,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",

    "& .MuiMenuItem-root": {
      color: "rgba(255, 255, 255, 0.9)",

      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      },

      "& .MuiSvgIcon-root": {
        color: "rgba(255, 255, 255, 0.6)",
      },
    },
  },
};
