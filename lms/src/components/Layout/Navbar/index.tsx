// src/layouts/DashboardLayout/Navbar/index.tsx

import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Breadcrumbs,
  useTheme,
  Badge,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import {
  AccountCircle,
  Settings,
  Notifications,
  Email,
  Podcasts,
  ShoppingCart,
  NavigateNext,
  Search as SearchIcon,
  Home,
  Logout,
} from "@mui/icons-material";

import { useMaterialUIController } from "@/context";
import { useAuth } from "@/context";
import {
  StyledAppBar,
  StyledToolbar,
  LeftSection,
  TitleContainer,
  CenterSection,
  RightSection,
  SearchContainer,
  SearchIconWrapper,
  SearchInput,
  ActionButton,
  UserSection,
  UserName,
  BreadcrumbContainer,
  menuStyles,
} from "./styles";

interface NavbarProps {
  title?: string;
  light?: boolean;
  transparent?: boolean;
  absolute?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  title = "",
  light = false,
  transparent = false,
  absolute = false,
}) => {
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;
  const { user } = useAuth();
  const [notificationMenu, setNotificationMenu] = useState<null | HTMLElement>(
    null
  );
  const [userMenu, setUserMenu] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  // 브레드크럼 생성
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);

    const breadcrumbNameMap: { [key: string]: string } = {
      dashboard: "대시보드",
      users: "사용자 관리",
      settings: "설정",
      profile: "프로필",
      analytics: "분석",
      reports: "리포트",
    };

    const breadcrumbs = [
      <Link
        key="home"
        to="/"
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Home sx={{ mr: 0.5, fontSize: "1rem" }} />
        <Typography variant="body2">홈</Typography>
      </Link>,
    ];

    pathnames.forEach((pathname, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
      const isLast = index === pathnames.length - 1;
      const name = breadcrumbNameMap[pathname] || pathname;

      breadcrumbs.push(
        isLast ? (
          <Typography key={pathname} variant="body2" fontWeight="medium">
            {name}
          </Typography>
        ) : (
          <Link key={pathname} to={routeTo}>
            <Typography variant="body2">{name}</Typography>
          </Link>
        )
      );
    });

    return breadcrumbs;
  };

  // 메뉴 핸들러
  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationMenu(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationMenu(null);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenu(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenu(null);
  };

  // 알림 메뉴 아이템 컴포넌트
  const NotificationMenuItem = ({
    icon,
    title,
  }: {
    icon: React.ReactNode;
    title: string;
  }) => (
    <MenuItem
      onClick={handleNotificationMenuClose}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        py: 1.5,
        px: 2,
        minWidth: 280,
      }}
    >
      {icon}
      <Typography variant="body2">{title}</Typography>
    </MenuItem>
  );

  return (
    <StyledAppBar transparent={transparent}>
      <StyledToolbar>
        {/* 📍 왼쪽: 제목 및 브레드크럼 */}
        <LeftSection>
          <TitleContainer>
            {/* 메인 제목 */}
            {title && (
              <Typography
                variant="h6"
                component="h1"
                fontWeight="medium"
                sx={{
                  color: theme.palette.text.primary, // 테마 기본 텍스트 색상
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                  lineHeight: 1.2,
                  mb: location.pathname !== "/" ? 0.5 : 0,
                }}
              >
                {title}
              </Typography>
            )}

            {/* 브레드크럼 */}
            {location.pathname !== "/" && (
              <BreadcrumbContainer>
                <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
                  {generateBreadcrumbs()}
                </Breadcrumbs>
              </BreadcrumbContainer>
            )}
          </TitleContainer>
        </LeftSection>

        {/* 🔍 가운데: 검색창 (데스크톱에서만) */}
        <CenterSection>
          <SearchContainer>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <SearchInput
              placeholder="검색…"
              inputProps={{ "aria-label": "search" }}
            />
          </SearchContainer>
        </CenterSection>

        {/* ⚙️ 오른쪽: 액션 버튼들 */}
        <RightSection>
          {/* 설정 버튼 */}
          <IconButton
            size="small"
            sx={{
              color: theme.palette.text.secondary, // 테마 보조 텍스트 색상
              "&:hover": {
                backgroundColor: theme.palette.action.hover, // 테마 호버 색상
                color: theme.palette.text.primary, // 테마 기본 텍스트 색상
              },
            }}
          >
            <Settings fontSize="small" />
          </IconButton>

          {/* 알림 버튼 */}
          <IconButton
            size="small"
            onClick={handleNotificationMenuOpen}
            sx={{
              color: theme.palette.text.secondary, // 테마 보조 텍스트 색상
              "&:hover": {
                backgroundColor: theme.palette.action.hover, // 테마 호버 색상
                color: theme.palette.text.primary, // 테마 기본 텍스트 색상
              },
            }}
          >
            <Badge badgeContent={3} color="error" variant="dot">
              <Notifications fontSize="small" />
            </Badge>
          </IconButton>

          {/* 👤 사용자 섹션 */}
          <UserSection>
            {/* 사용자 이름 (데스크톱에서만) */}
            <UserName>{user?.empName || "사용자"}</UserName>

            {/* 아바타 */}
            <IconButton
              size="small"
              onClick={handleUserMenuOpen}
              sx={{
                p: 0,
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "primary.main",
                  fontSize: "0.875rem",
                }}
              >
                {user?.empName ? user.empName.charAt(0) : <AccountCircle />}
              </Avatar>
            </IconButton>
          </UserSection>

          {/* 📢 알림 메뉴 */}
          <Menu
            anchorEl={notificationMenu}
            open={Boolean(notificationMenu)}
            onClose={handleNotificationMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            sx={menuStyles}
          >
            <NotificationMenuItem
              icon={<Email fontSize="small" />}
              title="새 메시지 확인"
            />
            <NotificationMenuItem
              icon={<Podcasts fontSize="small" />}
              title="팟캐스트 세션 관리"
            />
            <NotificationMenuItem
              icon={<ShoppingCart fontSize="small" />}
              title="결제가 성공적으로 완료됨"
            />
          </Menu>

          {/* 👤 사용자 메뉴 */}
          <Menu
            anchorEl={userMenu}
            open={Boolean(userMenu)}
            onClose={handleUserMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            sx={{
              ...menuStyles,
              "& .MuiPaper-root": {
                ...menuStyles["& .MuiPaper-root"],
                minWidth: 200,
              },
            }}
          >
            <MenuItem onClick={handleUserMenuClose}>
              <AccountCircle sx={{ mr: 1.5 }} fontSize="small" />
              <Typography variant="body2">프로필</Typography>
            </MenuItem>
            <MenuItem onClick={handleUserMenuClose}>
              <Settings sx={{ mr: 1.5 }} fontSize="small" />
              <Typography variant="body2">설정</Typography>
            </MenuItem>
            <MenuItem onClick={handleUserMenuClose}>
              <Logout sx={{ mr: 1.5 }} fontSize="small" />
              <Typography variant="body2">로그아웃</Typography>
            </MenuItem>
          </Menu>
        </RightSection>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;
