// pages/UserMenu/PasswordSettings.tsx
import { LoginCredentials } from "@/api/types";
import { AppPaper } from "@/components/common";
import AppDialog from "@/components/common/Dialog";
import PasswordUpdateForm from "@/components/forms/PasswordUpdateForm";
import PasswordVerificationForm from "@/components/forms/PasswordVerificationForm";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useAuth } from "@/context";
import { useEffect, useState } from "react";

const PasswordSettingsPage: React.FC = () => {
  const { logout } = useAuth();
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>();
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);

  // 페이지 진입 시 바로 인증 모달 열기
  useEffect(() => {
    setIsVerificationOpen(true);
  }, []);

  const handlePasswordVerificationSuccess = async (cred: LoginCredentials) => {
    setLoginCredentials(cred);
    setIsVerificationOpen(false);
  };

  // 취소 시 이전 페이지로 돌아가기
  const handleCancel = () => {
    alert("비밀번호 확인이 취소되었습니다.");
    setIsVerificationOpen(false);
    window.history.back();
  };

  // 비밀번호 변경 성공 시
  const handleUpdateSuccess = async () => {
    alert("비밀번호가 성공적으로 변경되었습니다.");
    await logout();
  };

  return (
    <DashboardLayout title="비밀번호 설정">
      {/* 현재 비밀번호 확인 다이얼로그 */}
      <AppDialog
        open={isVerificationOpen}
        title={"현재 비밀번호 확인"}
        maxWidth="sm"
        onClose={handleCancel}
      >
        <PasswordVerificationForm
          onSuccess={handlePasswordVerificationSuccess}
        />
      </AppDialog>

      {loginCredentials && (
        <AppPaper title="비밀번호 설정">
          <PasswordUpdateForm
            onSuccess={handleUpdateSuccess}
            loginCredentials={loginCredentials}
          />
        </AppPaper>
      )}
    </DashboardLayout>
  );
};

export default PasswordSettingsPage;
