// src/layouts/DashboardLayout/Navbar/index.tsx

import {
  AccountCircle,
  Email,
  Logout,
  Menu as MenuIcon,
  Notifications,
  Password,
  Podcasts,
  Settings,
  ShoppingCart,
} from "@mui/icons-material";
import { Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppIconButton } from "@/components/common/Button";
import AppTypography from "@/components/common/Typography";
import { useAuth } from "@/context";
import {
  LeftSection,
  RightSection,
  StyledAppBar,
  StyledToolbar,
  TitleContainer,
  UserName,
  UserSection,
  menuStyles,
} from "./styles";

interface NavbarProps {
  title?: string;
  light?: boolean;
  transparent?: boolean;
  absolute?: boolean;
  onSidenavToggle?: () => void; // sidenav 토글 함수
}

const Navbar: React.FC<NavbarProps> = ({
  title = "",
  transparent = true,
  onSidenavToggle,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notificationMenu, setNotificationMenu] = useState<null | HTMLElement>(
    null
  );
  const [userMenu, setUserMenu] = useState<null | HTMLElement>(null);

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

  // 프로필 페이지로 이동
  const handleProfileClick = () => {
    handleUserMenuClose();
    navigate("/user-data-settings");
  };

  // 설정 페이지로 이동
  const handleSettingsClick = () => {
    handleUserMenuClose();
    navigate("/password-settings");
  };

  // 로그아웃 처리
  const handleLogoutClick = async () => {
    handleUserMenuClose();

    if (confirm("로그아웃 하시겠습니까?")) {
      try {
        await logout();
      } catch (error) {
        // 에러가 발생해도 로컬에서는 로그아웃 처리
      }
    }
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
        {/* 📍 왼쪽: 사이드네비 토글 버튼과 제목 */}
        <LeftSection>
          {/* 사이드네비 토글 버튼 */}
          <AppIconButton onClick={onSidenavToggle}>
            <MenuIcon fontSize="small" />
          </AppIconButton>

          <TitleContainer>
            {/* 메인 제목 */}
            {title && (
              <AppTypography fontWeight="medium">{title}</AppTypography>
            )}
          </TitleContainer>
        </LeftSection>

        {/* ⚙️ 오른쪽: 액션 버튼들 */}
        <RightSection>
          {/* 설정 버튼 */}
          <AppIconButton onClick={handleUserMenuOpen}>
            <Settings fontSize="small" />
          </AppIconButton>

          {/* 알림 버튼 */}
          <AppIconButton onClick={handleNotificationMenuOpen}>
            <Notifications fontSize="small" />
          </AppIconButton>

          {/* 👤 사용자 섹션 */}
          <UserSection>
            {/* 사용자 이름 (데스크톱에서만) */}
            <UserName>
              {user?.empName || "사용자"} ({user?.loginId}) 님
            </UserName>
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
            {/* 프로필 메뉴 - routes.ts의 /profile 경로와 매칭 */}
            <MenuItem onClick={handleProfileClick}>
              <AccountCircle sx={{ mr: 1.5 }} fontSize="small" />
              <Typography variant="body2">사용자 정보 설정</Typography>
            </MenuItem>

            {/* 설정 메뉴 - routes.ts의 /settings 경로와 매칭 */}
            <MenuItem onClick={handleSettingsClick}>
              <Password sx={{ mr: 1.5 }} fontSize="small" />
              <Typography variant="body2">비밀번호 설정</Typography>
            </MenuItem>

            {/* 로그아웃 */}
            <MenuItem onClick={handleLogoutClick}>
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
