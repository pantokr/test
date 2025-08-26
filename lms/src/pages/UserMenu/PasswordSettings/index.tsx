// pages/UserMenu/PasswordSettings.tsx
import { PasswdVerificationApi } from "@/api";
import { LoginCredentials } from "@/api/types";
import { AppPaper } from "@/components/common";
import PasswordUpdateForm from "@/components/forms/PasswdUpdateForm";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useAuth } from "@/context";
import { useEffect, useState } from "react";
import VerificationDialog from "./VerificationDialog";

const PasswordSettingsPage = () => {
  const { logout, user } = useAuth();
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState<
    LoginCredentials | undefined
  >(undefined);
  const [isVerifying, setIsVerifying] = useState(false);

  // 페이지 진입 시 바로 인증 모달 열기
  useEffect(() => {
    setIsVerificationOpen(true);
  }, []);

  // 현재 비밀번호 확인 처리
  const handlePasswordVerification = async (currentPassword: string) => {
    setIsVerifying(true);

    try {
      await PasswdVerificationApi({
        loginID: user?.loginID || "",
        passwd: currentPassword,
      });

      // 검증 성공 시 loginCredentials 설정
      setLoginCredentials({
        loginID: user?.loginID || "",
        passwd: currentPassword,
      });

      setIsVerificationOpen(false);
    } catch (error) {
      // VerificationDialog에서 에러 처리하므로 다시 throw
      throw error;
    } finally {
      setIsVerifying(false);
    }
  };

  // 취소 시 이전 페이지로 돌아가기
  const handleCancel = () => {
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
      <VerificationDialog
        open={isVerificationOpen}
        title="본인 확인"
        description="비밀번호 변경을 위해 현재 비밀번호를 입력해주세요."
        onVerify={handlePasswordVerification}
        onCancel={handleCancel}
        isVerifying={isVerifying}
      />

      {/* 비밀번호 변경 폼 (인증 후에만 표시) */}
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
