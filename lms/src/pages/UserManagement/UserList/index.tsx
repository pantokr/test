// pages/LogManagement/LoginHistory.tsx

import { UserAccountListApi, UserDeletionApi } from "@/api";
import { UserListItem } from "@/api/types";
import { AppPaper, Column, Row } from "@/components/common";
import AppTextButton from "@/components/common/Button/AppTextButton";
import AgGrid from "@/components/dataGrid/AgGrid/AgGrid";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useGridData } from "@/hooks/api";
import { GridApi } from "ag-grid-community";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ColumnDefs from "./columnDefs";

const UserListPage: React.FC = () => {
  const navigate = useNavigate();
  const gridApiRef = useRef<GridApi | null>(null);

  const [{ data, loading }, { refresh }] =
    useGridData<UserListItem>(UserAccountListApi);

  // ✅ 선택 삭제 핸들러
  const handleDeleteUsers = async () => {
    if (!gridApiRef.current) return;

    const selectedRows = gridApiRef.current.getSelectedRows();
    const deleteEmpId = selectedRows.map((r) => r.loginId); // id 필드 기준

    if (deleteEmpId.length === 0) {
      alert("삭제할 사용자를 선택해주세요.");
      return;
    }
    const confirmed = window.confirm(
      `선택된 ${deleteEmpId.length}명의 사용자를 삭제하시겠습니까?`
    );
    if (!confirmed) return;
    try {
      await UserDeletionApi({ deleteEmpId });
      refresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <DashboardLayout title="사용자 목록">
      <AppPaper width="100%" height="100%" title="사용자 목록">
        <Column>
          <Row mainAxisAlignment="end" spacing={2}>
            <AppTextButton onClick={() => navigate("/user-registration")}>
              사용자 등록
            </AppTextButton>
            <AppTextButton onClick={handleDeleteUsers}>선택 삭제</AppTextButton>
          </Row>
          <Row sx={{ flex: 1, minHeight: 0 }}>
            <AgGrid
              columnDefs={ColumnDefs}
              rowData={data}
              loading={loading}
              gridApiRef={gridApiRef}
              gridOptions={{
                onRowDoubleClicked: (event) => {
                  navigate("/user-update", { state: { userData: event.data } });
                },
              }}
            />
          </Row>
        </Column>
      </AppPaper>
    </DashboardLayout>
  );
};

export default UserListPage;
