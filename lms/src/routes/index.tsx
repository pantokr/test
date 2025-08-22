// src/config/routes.ts
import {
  Assessment as AssessmentIcon,
  CheckCircle,
  Dashboard as DashboardIcon,
  Error,
  ListAlt,
  Login as LoginIcon,
  People,
  People as PeopleIcon,
  PersonAdd,
  Person as PersonIcon,
  RestartAlt,
  Security,
  Settings as SettingsIcon,
} from "@mui/icons-material";

import type { RouteItem } from "./types";

// 실제 로그인 페이지 import
import DashboardPage from "@/pages/Dashboard";
import LoginHistoryPage from "@/pages/LogManagement/LoginHistory";
import SignIn from "@/pages/SignIn";
import UserListPage from "@/pages/UserManagement/UserList";
import UserRegistrationPage from "@/pages/UserManagement/UserRegistration";
import LoginFailureHistoryPage from "../pages/LogManagement/LoginFailureHistory";
import LoginResetHistoryPage from "../pages/LogManagement/LoginResetHistory";

const Reports = () => (
  <div style={{ padding: 20 }}>
    <h2>리포트</h2>
    <p>리포트 페이지입니다.</p>
  </div>
);

const Settings = () => (
  <div style={{ padding: 20 }}>
    <h2>설정</h2>
    <p>설정 페이지입니다.</p>
  </div>
);

const Profile = () => (
  <div style={{ padding: 20 }}>
    <h2>프로필</h2>
    <p>프로필 페이지입니다.</p>
  </div>
);

const SignUp = () => (
  <div style={{ padding: 20 }}>
    <h2>회원가입</h2>
    <p>회원가입 페이지입니다.</p>
  </div>
);

// 라우트 설정
const sidenavRoutes: RouteItem[] = [
  {
    key: "dashboard",
    name: "대시보드",
    icon: <DashboardIcon />,
    route: "/dashboard",
    component: <DashboardPage />,
  },
  {
    key: "user-management",
    name: "사용자 관리",
    icon: <PeopleIcon />,
    collapse: [
      {
        key: "user-list",
        name: "사용자 목록",
        route: "/user-list",
        component: <UserListPage />,
        icon: <People />, // 사람들 아이콘
      },
      {
        key: "user-permissions",
        name: "사용자 권한관리",
        route: "/user-permissions",
        component: <UserListPage />,
        icon: <Security />, // 보안/권한 아이콘
      },
      {
        key: "user-registration",
        name: "사용자 등록",
        route: "/user-registration",
        component: <UserRegistrationPage />,
        icon: <PersonAdd />, // 사용자 추가 아이콘
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
        icon: <CheckCircle />,
        component: <LoginHistoryPage />,
      },
      {
        key: "login-failure-history",
        name: "로그인 실패 기록",
        route: "/log/login-failure-history",
        icon: <Error />,
        component: <LoginFailureHistoryPage />,
      },
      {
        key: "login-reset-history",
        name: "로그인 초기화 기록",
        route: "/log/login-reset-history",
        icon: <RestartAlt />,
        component: <LoginResetHistoryPage />,
      },
    ],
  },

  {
    key: "reports",
    name: "리포트",
    icon: <AssessmentIcon />,
    route: "/reports",
    component: <Reports />,
  },
  {
    key: "divider-1",
    divider: true,
  },
  {
    key: "account-pages",
    title: "계정",
  },
  {
    key: "profile",
    name: "프로필",
    icon: <PersonIcon />,
    route: "/profile",
    component: <Profile />,
  },
  {
    key: "settings",
    name: "설정",
    icon: <SettingsIcon />,
    route: "/settings",
    component: <Settings />,
  },
  // 인증 관련 라우트
  {
    key: "sign-in",
    name: "로그인",
    icon: <LoginIcon />,
    route: "/auth/sign-in",
    component: <SignIn />,
  },
  {
    key: "sign-up",
    name: "회원가입",
    icon: <PersonIcon />,
    route: "/auth/sign-up",
    component: <SignUp />,
  },
];

export default sidenavRoutes;

export { default as ProtectedRoute } from "./ProtectedRoute";
