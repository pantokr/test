// pages/LogManagement/LoginFailureHistory.tsx

import { loginFailureHistoryApi } from "@/api/audit";
import { LoginFailureHistoryItem } from "@/api/types";
import { AppPaper } from "@/components/common";
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
      <AppPaper width="100%" height="100%" title="로그인 실패 기록">
        <AgGrid columnDefs={ColumnDefs} rowData={loginFailureHistory} />
      </AppPaper>
    </DashboardLayout>
  );
};

export default LoginFailureHistoryPage;
