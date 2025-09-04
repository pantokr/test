// pages/LogManagement/LoginResetHistory.tsx

import { loginResetHistoryApi } from "@/api/audit";
import { LoginResetHistoryItem } from "@/api/types";
import { AppCard } from "@/components/common/Card";
import AgGrid from "@/components/dataGrid/AgGrid/AgGrid";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useGridData } from "@/hooks/api";
import React from "react";
import ColumnDefs from "./columnDefs";

const LoginResetHistoryPage: React.FC = () => {
  const [{ data, loading }] =
    useGridData<LoginResetHistoryItem>(loginResetHistoryApi);

  return (
    <DashboardLayout title="로그인 초기화 기록">
      <AppCard width="95%" height="95%" title="로그인 초기화 기록">
        <AgGrid columnDefs={ColumnDefs} rowData={data} loading={loading} />
      </AppCard>
    </DashboardLayout>
  );
};

export default LoginResetHistoryPage;
