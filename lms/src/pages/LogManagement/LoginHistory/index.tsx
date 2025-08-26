// pages/LogManagement/LoginHistory.tsx

import { loginHistoryApi } from "@/api/audit";
import { LoginHistoryItem } from "@/api/types";
import { AppPaper } from "@/components/common";
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
      <AppPaper width="100%" height="100%" title="로그인 기록">
        <AgGrid columnDefs={ColumnDefs} rowData={loginHistory} />
      </AppPaper>
    </DashboardLayout>
  );
};

export default LoginHistoryPage;
