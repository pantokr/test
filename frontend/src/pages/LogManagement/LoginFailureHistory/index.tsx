// pages/LogManagement/LoginFailureHistory.tsx

import { loginFailureHistoryApi } from "@/api/audit";
import { LoginFailureHistoryItem } from "@/api/types";
import { AppCard } from "@/components/common/Card";
import AgGrid from "@/components/complex/dataGrid/AgGrid/AgGrid";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useGridData } from "@/hooks/api";
import React from "react";
import ColumnDefs from "./columnDefs";

const LoginFailureHistoryPage: React.FC = () => {
  const [{ data, loading }] = useGridData<LoginFailureHistoryItem>(
    loginFailureHistoryApi
  );

  return (
    <DashboardLayout title="로그인 실패 기록" mode="full">
      <AppCard width="100%" height="100%" title="로그인 실패 기록">
        <AgGrid columnDefs={ColumnDefs} rowData={data} loading={loading} />
      </AppCard>
    </DashboardLayout>
  );
};

export default LoginFailureHistoryPage;
