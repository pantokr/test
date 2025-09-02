// pages/LogManagement/LoginResetHistory.tsx

import { loginResetHistoryApi } from "@/api/audit";
import { LoginResetHistoryItem } from "@/api/types";
import { AppPaper } from "@/components/common";
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
      <AppPaper width="100%" height="100%" title="로그인 초기화 기록">
        <AgGrid columnDefs={ColumnDefs} rowData={data} loading={loading} />
      </AppPaper>
    </DashboardLayout>
  );
};

export default LoginResetHistoryPage;
