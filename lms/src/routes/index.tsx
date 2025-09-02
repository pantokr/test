import {
  Dashboard as DashboardIcon,
  ListAlt,
  People,
} from "@mui/icons-material";

import type { RouteItem } from "./types";

// 페이지 import
import DashboardPage from "@/pages/Dashboard";
import LoginFailureHistoryPage from "@/pages/LogManagement/LoginFailureHistory";
import LoginHistoryPage from "@/pages/LogManagement/LoginHistory";
import LoginResetHistoryPage from "@/pages/LogManagement/LoginResetHistory";
// import SignInPage from "@/pages/SignIn";
import SignInPage from "@/pages/SignIn";
import UserListPage from "@/pages/UserManagement/UserList";
import UserRegistrationPage from "@/pages/UserManagement/UserRegistration";
import UserUpdatePage from "@/pages/UserManagement/UserUpdate";
import PasswordSettingsPage from "@/pages/UserMenu/PasswordSettings";
import ProfileSettingsPage from "@/pages/UserMenu/ProfileSettings";

export const sidenavRoutes: RouteItem[] = [
  {
    key: "dashboard",
    name: "대시보드",
    icon: <DashboardIcon />,
    route: "/dashboard",
    component: DashboardPage,
    protected: true,
  },
  {
    key: "user-management",
    name: "사용자 관리",
    icon: <People />,
    collapse: [
      {
        key: "user-list",
        name: "사용자 목록",
        route: "/user-list",
        component: UserListPage,
        protected: true,
      },
    ],
  },
  {
    key: "log-management",
    name: "로그 관리",
    icon: <ListAlt />,
    collapse: [
      {
        key: "login-history",
        name: "로그인 기록",
        route: "/log/login-history",
        component: LoginHistoryPage,
        protected: true,
      },
      {
        key: "login-failure-history",
        name: "로그인 실패 기록",
        route: "/log/login-failure-history",
        component: LoginFailureHistoryPage,
        protected: true,
      },
      {
        key: "login-reset-history",
        name: "로그인 초기화 기록",
        route: "/log/login-reset-history",
        component: LoginResetHistoryPage,
        protected: true,
      },
    ],
  },
];

export const hiddenRoutes: RouteItem[] = [
  {
    key: "user-registration",
    name: "사용자 등록",
    route: "/user-registration",
    component: UserRegistrationPage,
    protected: true,
  },
  {
    key: "user-data-settings",
    name: "사용자 정보 설정",
    route: "/user-data-settings",
    component: ProfileSettingsPage,
    protected: true,
  },
  {
    key: "user-update",
    name: "사용자 정보 수정",
    route: "/user-update",
    component: UserUpdatePage,
    protected: true,
  },
  {
    key: "password-settings",
    name: "비밀번호 설정",
    route: "/password-settings",
    component: PasswordSettingsPage,
    protected: true,
  },
  {
    key: "sign-in",
    name: "로그인",
    route: "/auth/sign-in",
    component: SignInPage,
    protected: false,
  },
];
