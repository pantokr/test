// pages/LogManagement/LoginHistory.tsx

import { PasswordResetApi, UserAccountListApi, UserDeletionApi } from "@/api";
import { PasswdReset, UserListItem } from "@/api/types";
import {
  AppButton,
  AppPaper,
  AppTextField,
  Column,
  Row,
} from "@/components/common";
import AppTextButton from "@/components/common/Button/AppTextButton";
import AppDialog from "@/components/common/Dialog";
import AppToggleButton from "@/components/common/ToggleButton/AppToggleButton";
import AppTypography from "@/components/common/Typography";
import AgGrid from "@/components/dataGrid/AgGrid/AgGrid";
import UserUpdateForm from "@/components/forms/UserUpdateForm";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useAuth } from "@/context";
import { useGridData } from "@/hooks/api";
import { ToggleButtonGroup } from "@mui/material";
import { GridApi } from "ag-grid-community";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ColumnDefs from "./columnDefs";

const UserListPage: React.FC = () => {
  const navigate = useNavigate();
  const gridApiRef = useRef<GridApi | null>(null);

  const { user } = useAuth();
  const [{ data, loading }, { refresh }] =
    useGridData<UserListItem>(UserAccountListApi);
  const [isUserDetailDialogOpen, setIsUserDetailDialogOpen] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserListItem>();
  const [resetFormData, setResetFormData] = useState<PasswdReset>({
    loginId: "",
    resetEmpId: "",
    resetCode: "",
    resetReason: "",
  });

  useEffect(() => {
    // 기본값 설정
    setResetFormData((prev) => ({
      ...prev,
      resetEmpId: user?.loginId || "",
    }));
  }, [user]);

  // ✅ 선택 삭제 핸들러
  const handleDeleteUser = async () => {
    if (!gridApiRef.current) return;

    const confirmed = window.confirm(
      `선택된 ${selectedUser?.loginId} 사용자를 삭제하시겠습니까?`
    );
    if (!confirmed) return;

    try {
      await UserDeletionApi({ deleteEmpId: selectedUser!.loginId });
      alert("삭제되었습니다.");
      refresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // ✅ 비밀번호 초기화 실행
  const handleConfirmReset = async () => {
    const confirmed = window.confirm(
      `선택된 ${selectedUser?.loginId} 사용자의 비밀번호를 초기화하시겠습니까?`
    );
    if (!confirmed) return;

    try {
      setResetFormData((prev) => ({
        ...prev,
        loginId: selectedUser!.loginId,
      }));
      await PasswordResetApi(resetFormData);

      alert("비밀번호가 초기화되었습니다.");
      setIsResetDialogOpen(false);
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
          </Row>
          <Row sx={{ flex: 1, minHeight: 0 }}>
            <AgGrid
              columnDefs={ColumnDefs}
              rowData={data}
              loading={loading}
              gridApiRef={gridApiRef}
              gridOptions={{
                onRowDoubleClicked: (event) => {
                  setSelectedUser(event.data);
                  setIsUserDetailDialogOpen(true);
                },
              }}
            />
          </Row>
        </Column>

        {/* 사용자 상세 다이얼로그 */}
        <AppDialog
          open={isUserDetailDialogOpen}
          title={"사용자 정보 상세"}
          maxWidth="sm"
          onClose={() => {
            setIsUserDetailDialogOpen(false);
          }}
        >
          <Column>
            <Row mainAxisAlignment="end" spacing={2}>
              <AppTextButton onClick={() => setIsResetDialogOpen(true)}>
                비밀번호 초기화
              </AppTextButton>
              <AppTextButton onClick={handleDeleteUser}>삭제</AppTextButton>
            </Row>
          </Column>
          <UserUpdateForm
            initialData={selectedUser}
            onSuccess={() => window.location.reload()}
          ></UserUpdateForm>
        </AppDialog>

        {/* 초기화 사유 다이얼로그 */}
        <AppDialog
          open={isResetDialogOpen}
          title={"비밀번호 초기화 사유"}
          maxWidth="xs"
          onClose={() => {
            setIsResetDialogOpen(false);
          }}
        >
          <Column spacing={2}>
            <AppTypography variant="body2" sx={{ mb: 1 }}>
              비밀번호 초기화 사유를 선택해주세요.
            </AppTypography>
            <ToggleButtonGroup
              value={resetFormData.resetCode}
              exclusive
              onChange={(e, newValue) =>
                setResetFormData({
                  ...resetFormData,
                  resetCode: newValue,
                })
              }
            >
              <AppToggleButton value="1">비밀번호 분실</AppToggleButton>
              <AppToggleButton value="2">IP 불일치</AppToggleButton>
              <AppToggleButton value="3">장기 미사용</AppToggleButton>
            </ToggleButtonGroup>

            <AppTextField
              label="사유를 입력해주세요..."
              onChange={(e) =>
                setResetFormData({
                  ...resetFormData,
                  resetReason: e.target.value,
                })
              }
            ></AppTextField>

            <Row mainAxisAlignment="end" spacing={2} sx={{ m: 2 }}>
              <AppButton
                variant="contained"
                onClick={handleConfirmReset}
                disabled={!resetFormData.resetCode}
              >
                확인
              </AppButton>
            </Row>
          </Column>
        </AppDialog>
      </AppPaper>
    </DashboardLayout>
  );
};

export default UserListPage;
