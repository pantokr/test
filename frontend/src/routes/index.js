import React from "react";
import PropTypes from "prop-types";

// Material Dashboard 2 React pages
import Dashboard from "pages/dashboard";
import NewLoanReview from "pages/loanReviews/NewLoanReview"; // 신규 대출 심사
import OngoingLoanReview from "pages/loanReviews/OngoingLoanReview"; // 진행 중인 대출 심사
import CompletedLoanReview from "pages/loanReviews/CompletedLoanReview"; // 완료된 대출 심사
import SignIn from "pages/authentication/sign-in";
import SignUp from "pages/authentication/sign-up";
import ResetPassword from "pages/authentication/reset-password";

// @mui icons
import Icon from "@mui/material/Icon";

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
    route: "loan-review/ongoing-load-review",
    component: <OngoingLoanReview />,
  },
  {
    type: "collapse",
    name: "완료된 대출 심사",
    key: "loan-review/completed-load-review",
    icon: <Icon fontSize="small">check_circle</Icon>,
    route: "loan-review/completed-load-review",
    component: <CompletedLoanReview />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "auth",
    name: "Reset Password",
    key: "reset-password",
    route: "/authentication/reset-password",
    component: <ResetPassword />,
  },
];

export default routes;
