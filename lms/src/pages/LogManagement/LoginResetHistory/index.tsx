// pages/LogManagement/LoginResetHistory.tsx

import { loginResetHistoryApi } from "@/api/audit";
import { LoginResetHistoryItem } from "@/api/types";
import { AppBox } from "@/components/common/Box";
import AgGrid from "@/components/dataGrid/AgGrid/AgGrid";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import React, { useEffect, useState } from "react";
import ColumnDefs from "./columnDefs";

const LoginResetHistoryPage: React.FC = () => {
  const [loginResetHistory, setLoginResetHistory] = useState<
    LoginResetHistoryItem[]
  >([]);

  const fetchLoginResetHistory = async () => {
    try {
      const response = await loginResetHistoryApi();
      setLoginResetHistory(response);
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchLoginResetHistory();
  }, []);

  return (
    <DashboardLayout title="로그인 초기화 기록">
      <AppBox sx={{ flex: 1, minHeight: 0 }}>
        <AgGrid columnDefs={ColumnDefs} rowData={loginResetHistory} />
      </AppBox>
    </DashboardLayout>
  );
};

export default LoginResetHistoryPage;
