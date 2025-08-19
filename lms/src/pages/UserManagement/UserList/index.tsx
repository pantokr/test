// pages/LogManagement/LoginHistory.tsx

import { loginHistoryApi } from "@/api/audit";
import AgGrid from "@/components/dataGrid/AgGrid/AgGrid";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { LoginHistoryItem } from "@/types";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ColumnDefs from "./columnDefs";

const UserListPage: React.FC = () => {
  const [loginHistory, setLoginHistory] = useState<LoginHistoryItem[]>([]);
  const [, setLoading] = useState(true);

  const fetchUserList = async () => {
    try {
      setLoading(true);
      const response = await loginHistoryApi();

      if (response && response.data) {
        setLoginHistory(response.data);
      } else {
        throw new Error("로그인 기록을 가져오는 데 실패했습니다.");
      }
    } catch (err) {
      console.error("로그인 기록 조회 오류:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <DashboardLayout title="사용자 관리">
      <Box sx={{ mb: 2, flexShrink: 0 }}></Box>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <AgGrid columnDefs={ColumnDefs} rowData={loginHistory} />
      </Box>
    </DashboardLayout>
  );
};

export default UserListPage;
