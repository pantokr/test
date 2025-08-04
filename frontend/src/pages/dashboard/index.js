/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "frames/LayoutContainers/DashboardLayout";
import DashboardNavbar from "frames/Navbars/DashboardNavbar";
import ReportsBarChart from "frames/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "frames/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "frames/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "pages/dashboard/data/reportsBarChartData";
import reportsLineChartData from "pages/dashboard/data/reportsLineChartData";

// Dashboard components
import { useAuth } from "context/auth";
import MDButton from "components/MDButton";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const { user, setUser } = useAuth(); // 로그인된 사용자 ID 등 인증 상태 가져오기
  const navigate = useNavigate();

  // 카드 클릭 핸들러 함수들
  const handleBookingsClick = () => {
    navigate("/loan-review/new-loan-review"); // 신규 대출 심사 페이지로 이동
  };

  const handleUsersClick = () => {
    navigate("/loan-review/ongoing-load-review"); // 진행 중인 대출 심사 페이지로 이동
  };

  const handleRevenueClick = () => {
    navigate("/loan-review/completed-load-review"); // 완료된 대출 심사 페이지로 이동
  };

  const handleWebsiteViewsClick = () => {
    navigate("/log/login-info"); // 로그인 정보 조회 페이지로 이동
  };

  const handleDailySalesClick = () => {
    navigate("/log/login-fail"); // 로그인 실패 조회 페이지로 이동
  };

  const handleCompletedTasksClick = () => {
    navigate("/log/login-reset"); // 로그인 초기화 조회 페이지로 이동
  };

  return (
    <DashboardLayout>
      <MDBox sx={{ display: "flex", flexDirection: "column", height: "100vh", p: 3 }}>
        <DashboardNavbar navbarTitle={user.id} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox
              mb={1.5}
              onClick={handleBookingsClick}
              sx={{
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  "& .MuiCard-root": {
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  },
                },
              }}
            >
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="신규 대출 심사"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than last week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox
              mb={1.5}
              onClick={handleUsersClick}
              sx={{
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  "& .MuiCard-root": {
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  },
                },
              }}
            >
              <ComplexStatisticsCard
                icon="leaderboard"
                title="진행 중인 대출 심사"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox
              mb={1.5}
              onClick={handleRevenueClick}
              sx={{
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  "& .MuiCard-root": {
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  },
                },
              }}
            >
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="완료된 대출 심사"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox
                mb={3}
                onClick={handleWebsiteViewsClick}
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    "& .MuiCard-root": {
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                    },
                  },
                }}
              >
                <ReportsBarChart
                  color="info"
                  title="로그인 정보 조회"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox
                mb={3}
                onClick={handleDailySalesClick}
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    "& .MuiCard-root": {
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                    },
                  },
                }}
              >
                <ReportsLineChart
                  color="success"
                  title="로그인 실패 조회"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox
                mb={3}
                onClick={handleCompletedTasksClick}
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    "& .MuiCard-root": {
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                    },
                  },
                }}
              >
                <ReportsLineChart
                  color="dark"
                  title="로그인 초기화 조회"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
