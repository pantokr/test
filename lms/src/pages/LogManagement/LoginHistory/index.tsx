// pages/LogManagement/LoginHistory.tsx

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { loginHistoryApi } from "@/api/audit";
import MuiDataGrid from "@/components/Grid/MuiDatagrid";
import { LoginHistoryItem } from "@/types";
import ColumnDefs from "./columnDefs";

const LoginHistoryPage: React.FC = () => {
  const [loginHistory, setLoginHistory] = useState<LoginHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 데이터를 그리드에 맞게 변환 (id 필드 추가)
  const transformedData = loginHistory.map((item, index) => ({
    id: `${item.login_id}_${item.login_time}_${index}`,
    ...item,
  }));

  const fetchLoginHistory = async () => {
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
    fetchLoginHistory();
  }, []);

  return (
    <DashboardLayout title="로그인 기록">
      <MuiDataGrid
        columnDefs={ColumnDefs}
        data={transformedData}
        title="로그인 기록"
        loading={loading}
      />
    </DashboardLayout>
  );
};

export default LoginHistoryPage;
