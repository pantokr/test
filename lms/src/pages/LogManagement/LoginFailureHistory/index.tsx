// pages/LogManagement/LoginFailureHistory.tsx

import { loginFailureHistoryApi } from "@/api/audit";
import { LoginFailureHistoryItem } from "@/api/types";
import { AppBox } from "@/components/common/Box";
import AgGrid from "@/components/dataGrid/AgGrid/AgGrid";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import React, { useEffect, useState } from "react";
import ColumnDefs from "./columnDefs";

const LoginFailureHistoryPage: React.FC = () => {
  const [loginFailureHistory, setLoginFailureHistory] = useState<
    LoginFailureHistoryItem[]
  >([]);

  const fetchLoginFailHistory = async () => {
    try {
      const response = await loginFailureHistoryApi();
      setLoginFailureHistory(response);
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchLoginFailHistory();
  }, []);

  return (
    <DashboardLayout title="로그인 실패 기록">
      <AppBox sx={{ flex: 1, minHeight: 0 }}>
        <AgGrid columnDefs={ColumnDefs} rowData={loginFailureHistory} />
      </AppBox>
    </DashboardLayout>
  );
};

export default LoginFailureHistoryPage;
