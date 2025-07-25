// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import NewLoanReview from "layouts/loanReviews/NewLoanReview"; // 신규 대출 심사
import OngoingLoanReview from "layouts/loanReviews/OngoingLoanReview"; // 진행 중인 대출 심사
import CompletedLoanReview from "layouts/loanReviews/CompletedLoanReview"; // 완료된 대출 심사
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  // 로그인 페이지

  // 대시보드 (메인 화면)

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
];

export default routes;
