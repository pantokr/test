// pages/LogManagement/LoginResetHistory.tsx

import { loginResetHistoryApi } from "@/api/audit";
import { LoginResetHistoryItem } from "@/api/types";
import AgGrid from "@/components/dataGrid/AgGrid/AgGrid";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ColumnDefs from "./columnDefs";

const LoginResetHistoryPage: React.FC = () => {
  const [loginResetHistory, setLoginResetHistory] = useState<
    LoginResetHistoryItem[]
  >([]);
  const [, setLoading] = useState(true);

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

  return (
    <DashboardLayout title="로그인 초기화 기록">
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <AgGrid columnDefs={ColumnDefs} rowData={loginResetHistory} />
      </Box>
    </DashboardLayout>
  );
};

export default LoginResetHistoryPage;
