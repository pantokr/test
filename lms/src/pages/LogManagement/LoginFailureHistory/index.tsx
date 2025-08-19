// pages/LogManagement/LoginHistory.tsx

import { loginFailureHistoryApi } from "@/api/audit";
import AgGrid from "@/components/dataGrid/AgGrid/AgGrid";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { LoginHistoryItem } from "@/types";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ColumnDefs from "./columnDefs";

const LoginFailureHistoryPage: React.FC = () => {
  const [loginFailureHistory, setLoginFailureHistory] = useState<
    LoginHistoryItem[]
  >([]);

  const [, setLoading] = useState(true);
  const fetchLoginFailHistory = async () => {
    try {
      setLoading(true);
      const response = await loginFailureHistoryApi();

      if (response && response.data) {
        setLoginFailureHistory(response.data);
      } else {
        throw new Error("로그인 실패 기록을 가져오는 데 실패했습니다.");
      }
    } catch (err) {
      console.error("로그인 실패 기록 조회 오류:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoginFailHistory();
  }, []);

  return (
    <DashboardLayout title="로그인 실패 기록">
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <AgGrid columnDefs={ColumnDefs} rowData={loginFailureHistory} />
      </Box>
    </DashboardLayout>
  );
};

export default LoginFailureHistoryPage;
