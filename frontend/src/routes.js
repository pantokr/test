import React from "react";
import PropTypes from "prop-types";

// Material Dashboard 2 React pages
import Dashboard from "pages/dashboard";
import NewLoanReview from "pages/loanReviews/NewLoanReview";
import OngoingLoanReview from "pages/loanReviews/OngoingLoanReview";
import CompletedLoanReview from "pages/loanReviews/CompletedLoanReview";
import LoginInfo from "pages/log/LoginInfo";
import LoginFail from "pages/log/LoginFail";
import LoginReset from "pages/log/LoginReset";
import SignIn from "pages/authentication/sign-in";
import Overview from "pages/profile";

// @mui icons - SVG 아이콘으로 변경 (폐쇄망 호환)
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LoginIcon from "@mui/icons-material/Login";
import ErrorIcon from "@mui/icons-material/Error";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PersonIcon from "@mui/icons-material/Person";
import UserRegister from "pages/userManagement/UserRegister";

// 아이콘 매핑 객체 (SVG 컴포넌트)
const iconComponents = {
  dashboard: <DashboardIcon fontSize="small" />,
  assignment: <AssignmentIcon fontSize="small" />,
  hourglass_top: <HourglassTopIcon fontSize="small" />,
  check_circle: <CheckCircleIcon fontSize="small" />,
  login: <LoginIcon fontSize="small" />,
  error: <ErrorIcon fontSize="small" />,
  restart_alt: <RestartAltIcon fontSize="small" />,
  person: <PersonIcon fontSize="small" />,
};

// 🎯 간단한 방식: 직접 배열로 메뉴 정의
const menuItems = [
  // 대시보드
  {
    type: "collapse",
    name: "대시보드",
    key: "dashboard",
    icon: "dashboard",
    route: "/dashboard",
    component: Dashboard,
  },

  // 대출 심사 처리 섹션
  {
    type: "title",
    title: "대출 심사 처리",
    key: "loan-section-title",
  },
  {
    type: "collapse",
    name: "신규 대출 심사",
    key: "loan-review/new-loan-review",
    icon: "assignment",
    route: "/loan-review/new-loan-review",
    component: NewLoanReview,
  },
  {
    type: "collapse",
    name: "진행 중인 대출 심사",
    key: "loan-review/ongoing-load-review",
    icon: "hourglass_top",
    route: "/loan-review/ongoing-load-review",
    component: OngoingLoanReview,
  },
  {
    type: "collapse",
    name: "완료된 대출 심사",
    key: "loan-review/completed-load-review",
    icon: "check_circle",
    route: "/loan-review/completed-load-review",
    component: CompletedLoanReview,
  },

  // 로그 조회 섹션
  {
    type: "title",
    title: "로그 조회",
    key: "log-section-title",
  },
  {
    type: "collapse",
    name: "로그인 정보 조회",
    key: "log/login-info",
    icon: "login",
    route: "/log/login-info",
    component: LoginInfo,
  },
  {
    type: "collapse",
    name: "로그인 실패 조회",
    key: "log/login-fail",
    icon: "error",
    route: "/log/login-fail",
    component: LoginFail,
  },
  {
    type: "collapse",
    name: "로그인 초기화 조회",
    key: "log/login-reset",
    icon: "restart_alt",
    route: "/log/login-reset",
    component: LoginReset,
  },
  {
    type: "title",
    title: "사용자 관리",
    key: "user-management-title",
  },
  {
    type: "collapse",
    name: "사용자 신규 등록",
    key: "user-management/register",
    icon: "login",
    route: "/user-management/register",
    component: UserRegister,
  },
  // 인증 및 프로필
  {
    type: "auth",
    name: "Sign In",
    key: "sign-in",
    icon: "login",
    route: "/authentication/sign-in",
    component: SignIn,
  },
  {
    type: "profile",
    name: "Profile",
    key: "profile",
    icon: "person",
    route: "/profile",
    component: Overview,
  },
];

// 🚀 자동으로 routes 생성 (SVG 아이콘 사용)
const routes = menuItems.map((item) => {
  // title 타입은 그대로 반환
  if (item.type === "title") {
    return {
      type: "title",
      title: item.title,
      key: item.key,
    };
  }

  // 나머지는 아이콘과 컴포넌트 처리
  return {
    type: item.type === "profile" ? "" : item.type, // profile 타입은 빈 문자열로
    name: item.name,
    key: item.key,
    // SVG 아이콘 매핑 사용 (폐쇄망 호환)
    icon: item.icon ? iconComponents[item.icon] || iconComponents.dashboard : undefined,
    route: item.route,
    component: item.component ? <item.component /> : undefined,
  };
});

export default routes;
