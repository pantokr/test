import {
  Dashboard as DashboardIcon,
  ListAlt,
  LocalAtm,
  People,
} from "@mui/icons-material";

import type { RouteItem } from "./types";

// 페이지 import
import DashboardPage from "@/pages/Dashboard";
import LoginFailureHistoryPage from "@/pages/LogManagement/LoginFailureHistory";
import LoginHistoryPage from "@/pages/LogManagement/LoginHistory";
import LoginResetHistoryPage from "@/pages/LogManagement/LoginResetHistory";
// import SignInPage from "@/pages/SignIn";
import PurchasedReceivablesDetailPage from "@/pages/PurchasedReceivables/Detail";
import PurchasedReceivablesListPage from "@/pages/PurchasedReceivables/List";
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
  },
  {
    key: "user-management",
    name: "사용자 관리",
    icon: <People />,
    requiredPermissions: ["관리자"], // 👈 관리자만 접근
    collapse: [
      {
        key: "user-list",
        name: "사용자 목록",
        route: "/user-list",
        component: UserListPage,
        requiredPermissions: ["관리자"], // 👈 하위에도 지정 (명시적)
      },
    ],
  },
  {
    key: "log-management",
    name: "로그 관리",
    icon: <ListAlt />,
    requiredPermissions: ["관리자"], // 👈 관리자만 접근
    collapse: [
      {
        key: "login-history",
        name: "로그인 기록",
        route: "/log/login-history",
        component: LoginHistoryPage,
        requiredPermissions: ["관리자"],
      },
      {
        key: "login-failure-history",
        name: "로그인 실패 기록",
        route: "/log/login-failure-history",
        component: LoginFailureHistoryPage,
        requiredPermissions: ["관리자"],
      },
      {
        key: "login-reset-history",
        name: "로그인 초기화 기록",
        route: "/log/login-reset-history",
        component: LoginResetHistoryPage,
        requiredPermissions: ["관리자"],
      },
    ],
  },
  {
    key: "purchased-receivables",
    name: "매입채권 관리",
    icon: <LocalAtm />,
    collapse: [
      {
        key: "purchased-receivables-list",
        name: "매입채권 목록",
        route: "/purchased-receivables/list",
        component: PurchasedReceivablesListPage,
      },
      {
        key: "purchased-receivables-detail",
        name: "매입채권 상세",
        route: "/purchased-receivables/detail",
        component: PurchasedReceivablesDetailPage,
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
  },
  {
    key: "user-data-settings",
    name: "사용자 정보 설정",
    route: "/user-data-settings",
    component: ProfileSettingsPage,
  },
  {
    key: "user-update",
    name: "사용자 정보 수정",
    route: "/user-update",
    component: UserUpdatePage,
  },
  {
    key: "password-settings",
    name: "비밀번호 설정",
    route: "/password-settings",
    component: PasswordSettingsPage,
  },
  {
    key: "sign-in",
    name: "로그인",
    route: "/auth/sign-in",
    component: SignInPage,
  },
];
