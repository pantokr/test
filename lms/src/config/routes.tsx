// src/config/routes.ts
import React from "react";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Assessment as AssessmentIcon,
  Person as PersonIcon,
  Login as LoginIcon,
  ListAlt,
  CheckCircle,
  Error,
  RestartAlt,
} from "@mui/icons-material";

import type { RouteItem } from "@/types";

// 실제 로그인 페이지 import
import SignIn from "@/pages/auth/SignIn";
import DashboardPage from "@/pages/Dashboard";
import { Box } from "@mui/material";
import LoginHistoryPage from "@/pages/LogManagement/LoginHistory";

const Users = () => (
  <div style={{ padding: 20 }}>
    <h2>사용자 관리</h2>
    <p>사용자 관리 페이지입니다.</p>
  </div>
);

const Courses = () => (
  <div style={{ padding: 20 }}>
    <h2>강의 관리</h2>
    <p>강의 관리 페이지입니다.</p>
  </div>
);

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
    key: "users",
    name: "사용자 관리",
    icon: <PeopleIcon />,
    route: "/users",
    component: <Users />,
  },
  {
    key: "log-management",
    name: "로그 관리",
    icon: <ListAlt />,
    collapse: [
      {
        key: "login-success-log",
        name: "로그인 기록",
        route: "/logs/login-history",
        icon: <CheckCircle />,
        component: <LoginHistoryPage />,
      },
      {
        key: "login-failure-log",
        name: "로그인 실패 기록",
        route: "/logs/login-failure",
        icon: <Error />,
        component: <Box />,
      },
      {
        key: "login-reset-log",
        name: "로그인 초기화 기록",
        route: "/logs/login-reset",
        icon: <RestartAlt />,
        component: <Box />,
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
    component: <SignIn />, // 이제 실제 로그인 페이지
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
