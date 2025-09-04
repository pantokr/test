import { loginHistoryApi } from "@/api/audit";
import { LoginHistoryItem } from "@/api/types";
import { Column } from "@/components/common";
import { AppCard } from "@/components/common/Card";
import AgGrid from "@/components/dataGrid/AgGrid/AgGrid";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useGridData } from "@/hooks/api";
import dayjs from "dayjs";
import React from "react";
import ColumnDefs from "./columnDefs";

const LoginHistoryPage: React.FC = () => {
  const [{ data, loading }] = useGridData<LoginHistoryItem>(loginHistoryApi);

  return (
    <DashboardLayout title="로그인 기록">
      <AppCard width="100%" height="100%" title="로그인 기록">
        <Column>
          <AgGrid
            columnDefs={ColumnDefs}
            rowData={data}
            loading={loading}
            initialFilterModel={{
              loginTime: {
                type: "greaterThan",
                dateFrom: dayjs().subtract(90, "days").format("YYYY-MM-DD"),
              },
            }}
          />
        </Column>
      </AppCard>
    </DashboardLayout>
  );
};

export default LoginHistoryPage;
