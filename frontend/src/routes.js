import React from "react";
import PropTypes from "prop-types";

// Material Dashboard 2 React pages
import Dashboard from "pages/dashboard";
import NewLoanReview from "pages/loanReviews/NewLoanReview"; // 신규 대출 심사
import OngoingLoanReview from "pages/loanReviews/OngoingLoanReview"; // 진행 중인 대출 심사
import CompletedLoanReview from "pages/loanReviews/CompletedLoanReview"; // 완료된 대출 심사

// 로그 조회 페이지 (예시, 직접 만들어야 함)
import LoginInfo from "pages/logs/LoginInfo";
import LoginFail from "pages/logs/LoginFail";
import LoginReset from "pages/logs/LoginReset";

// @mui icons
import Icon from "@mui/material/Icon";
import SignIn from "pages/authentication/sign-in";

const routes = [
  {
    type: "collapse",
    name: "대시보드",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },

  {
    type: "title",
    title: "대출 심사 처리",
    key: "main-title",
  },
  {
    type: "collapse",
    name: "신규 대출 심사",
    key: "loan-review/new-loan-review",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/loan-review/new-loan-review",
    component: <NewLoanReview />,
  },
  {
    type: "collapse",
    name: "진행 중인 대출 심사",
    key: "loan-review/ongoing-load-review",
    icon: <Icon fontSize="small">hourglass_top</Icon>,
    route: "/loan-review/ongoing-load-review",
    component: <OngoingLoanReview />,
  },
  {
    type: "collapse",
    name: "완료된 대출 심사",
    key: "loan-review/completed-load-review",
    icon: <Icon fontSize="small">check_circle</Icon>,
    route: "/loan-review/completed-load-review",
    component: <CompletedLoanReview />,
  },

  {
    type: "title",
    title: "로그 조회",
    key: "log-section",
  },
  {
    type: "collapse",
    name: "로그인 정보 조회",
    key: "log/login-info",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/log/login-info",
    component: <LoginInfo />,
  },
  {
    type: "collapse",
    name: "로그인 실패 조회",
    key: "log/login-fail",
    icon: <Icon fontSize="small">error</Icon>,
    route: "/log/login-fail",
    component: <LoginFail />,
  },
  {
    type: "collapse",
    name: "로그인 초기화 조회",
    key: "log/login-reset",
    icon: <Icon fontSize="small">restart_alt</Icon>,
    route: "/log/login-reset",
    component: <LoginReset />,
  },
  {
    type: "auth",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
];

export default routes;
