// pages/dashboard.tsx

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import {
  Assessment,
  PieChart as PieChartIcon,
  ShowChart,
  TrendingUp,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

// 샘플 데이터
const lineChartData = [
  { name: "1월", 매출: 4000, 방문자: 2400 },
  { name: "2월", 매출: 3000, 방문자: 1398 },
  { name: "3월", 매출: 2000, 방문자: 9800 },
  { name: "4월", 매출: 2780, 방문자: 3908 },
  { name: "5월", 매출: 1890, 방문자: 4800 },
  { name: "6월", 매출: 2390, 방문자: 3800 },
  { name: "7월", 매출: 3490, 방문자: 4300 },
];

const barChartData = [
  { name: "제품A", 판매량: 4000, 목표: 2400 },
  { name: "제품B", 판매량: 3000, 목표: 1398 },
  { name: "제품C", 판매량: 2000, 목표: 9800 },
  { name: "제품D", 판매량: 2780, 목표: 3908 },
  { name: "제품E", 판매량: 1890, 목표: 4800 },
];

const pieChartData = [
  { name: "모바일", value: 400, color: "#0088FE" },
  { name: "데스크톱", value: 300, color: "#00C49F" },
  { name: "태블릿", value: 300, color: "#FFBB28" },
  { name: "기타", value: 200, color: "#FF8042" },
];

const areaChartData = [
  { name: "1주", 신규: 4000, 재방문: 2400 },
  { name: "2주", 신규: 3000, 재방문: 1398 },
  { name: "3주", 신규: 2000, 재방문: 9800 },
  { name: "4주", 신규: 2780, 재방문: 3908 },
];

const DashboardPage: React.FC = () => {
  const theme = useTheme();

  return (
    <DashboardLayout title="대시보드" mode="scroll">
      <Box sx={{ padding: 3 }}>
        {/* 메인 컨테이너 - Column 방향 */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* 첫 번째 행 - 라인 차트와 바 차트 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            {/* 라인 차트 */}
            <Box sx={{ flex: 1, minWidth: 400 }}>
              <Card elevation={3}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                      <TrendingUp />
                    </Avatar>
                  }
                  title="월별 매출 및 방문자"
                  subheader="2024년 상반기 데이터"
                />
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={lineChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="매출"
                        stroke={theme.palette.primary.main}
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="방문자"
                        stroke={theme.palette.secondary.main}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>

            {/* 바 차트 */}
            <Box sx={{ flex: 1, minWidth: 400 }}>
              <Card elevation={3}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: theme.palette.success.main }}>
                      <Assessment />
                    </Avatar>
                  }
                  title="제품별 판매 실적"
                  subheader="목표 대비 실적"
                />
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="판매량" fill={theme.palette.primary.main} />
                      <Bar dataKey="목표" fill={theme.palette.warning.main} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>
          </Box>

          {/* 두 번째 행 - 파이 차트와 에어리어 차트 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            {/* 파이 차트 */}
            <Box sx={{ flex: 1, minWidth: 400 }}>
              <Card elevation={3}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: theme.palette.info.main }}>
                      <PieChartIcon />
                    </Avatar>
                  }
                  title="접속 디바이스 분석"
                  subheader="디바이스별 접속 비율"
                />
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>

            {/* 에어리어 차트 */}
            <Box sx={{ flex: 1, minWidth: 400 }}>
              <Card elevation={3}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: theme.palette.error.main }}>
                      <ShowChart />
                    </Avatar>
                  }
                  title="주간 사용자 분석"
                  subheader="신규 vs 재방문 사용자"
                />
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={areaChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="신규"
                        stackId="1"
                        stroke={theme.palette.primary.main}
                        fill={theme.palette.primary.main}
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="재방문"
                        stackId="1"
                        stroke={theme.palette.secondary.main}
                        fill={theme.palette.secondary.main}
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>
          </Box>

          {/* 세 번째 행 - 통계 카드들 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  bgcolor: theme.palette.primary.main,
                  color: "white",
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  12,345
                </Typography>
                <Typography variant="body2">총 방문자</Typography>
              </Paper>
            </Box>

            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  bgcolor: theme.palette.success.main,
                  color: "white",
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  ₩2,345,678
                </Typography>
                <Typography variant="body2">총 매출</Typography>
              </Paper>
            </Box>

            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  bgcolor: theme.palette.warning.main,
                  color: "white",
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  1,234
                </Typography>
                <Typography variant="body2">신규 고객</Typography>
              </Paper>
            </Box>

            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  bgcolor: theme.palette.info.main,
                  color: "white",
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  98.5%
                </Typography>
                <Typography variant="body2">만족도</Typography>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default DashboardPage;
