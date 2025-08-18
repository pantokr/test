// pages/LogManagement/LoginHistory.tsx

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { loginResetHistoryApi } from "@/api/audit";
import AgGrid from "@/components/Grid/AgGrid";
import { LoginHistoryItem } from "@/types";
import ColumnDefs from "./columnDefs";
import { Box, Typography } from "@mui/material";
import LoadingPage from "@/pages/loading";

const LoginResetHistoryPage: React.FC = () => {
  const [loginResetHistory, setLoginResetHistory] = useState<
    LoginHistoryItem[]
  >([]);
  const [loading, setLoading] = useState(true);

  const fetchLoginResetHistory = async () => {
    try {
      setLoading(true);
      const response = await loginResetHistoryApi();

      if (response && response.data) {
        setLoginResetHistory(response.data);
      } else {
        throw new Error("로그인 초기화 기록을 가져오는 데 실패했습니다.");
      }
    } catch (err) {
      console.error("로그인 초기화 기록 조회 오류:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoginResetHistory();
  }, []);

  if (loading) {
    LoadingPage("로그인 초기화 기록");
  }

  return (
    <DashboardLayout title="로그인 초기화 기록">
      <Box sx={{ mb: 2, flexShrink: 0 }}>
        <Typography variant="h6" component="h2">
          로그인 초기화 기록
        </Typography>
      </Box>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <AgGrid columnDefs={ColumnDefs} rowData={loginResetHistory} />
      </Box>
    </DashboardLayout>
  );
};

export default LoginResetHistoryPage;
