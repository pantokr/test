// pages/LogManagement/LoginFailureHistory.tsx

import { loginFailureHistoryApi } from "@/api/audit";
import { LoginFailureHistoryItem } from "@/api/types";
import { AppBox } from "@/components/common/Box";
import AgGrid from "@/components/dataGrid/AgGrid/AgGrid";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import ColumnDefs from "./columnDefs";

const LoginFailureHistoryPage: React.FC = () => {
  const [loginFailureHistory, setLoginFailureHistory] = useState<
    LoginFailureHistoryItem[]
  >([]);

  const [loading, setLoading] = useState(true);
  const fetchLoginFailHistory = async () => {
    try {
      setLoading(true);
      const response = await loginFailureHistoryApi();

      if (response && response.data) {
        setLoginFailureHistory(response.data);
      } else {
        throw new Error("로그인 실패 기록을 가져오는 데 실패했습니다.");
      }
    } catch (err) {
      console.error("로그인 실패 기록 조회 오류:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoginFailHistory();
  }, []);

  return (
    <DashboardLayout title="로그인 실패 기록">
      <AppBox sx={{ flex: 1, minHeight: 0 }}>
        {loading ? (
          <AppBox
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </AppBox>
        ) : (
          <AgGrid columnDefs={ColumnDefs} rowData={loginFailureHistory} />
        )}
      </AppBox>
    </DashboardLayout>
  );
};

export default LoginFailureHistoryPage;
