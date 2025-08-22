// pages/LogManagement/LoginHistory.tsx

import { loginHistoryApi } from "@/api/audit";
import { LoginHistoryItem } from "@/api/types";
import { AppBox } from "@/components/common/Box";
import AgGrid from "@/components/dataGrid/AgGrid/AgGrid";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import React, { useEffect, useState } from "react";
import ColumnDefs from "./columnDefs";

const LoginHistoryPage: React.FC = () => {
  const [loginHistory, setLoginHistory] = useState<LoginHistoryItem[]>([]);

  const fetchLoginHistory = async () => {
    try {
      const response = await loginHistoryApi();
      setLoginHistory(response);
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchLoginHistory();
  }, []);

  return (
    <DashboardLayout title="로그인 기록">
      <AppBox sx={{ flex: 1, minHeight: 0 }}>
        <AgGrid columnDefs={ColumnDefs} rowData={loginHistory} />
      </AppBox>
    </DashboardLayout>
  );
};

export default LoginHistoryPage;
