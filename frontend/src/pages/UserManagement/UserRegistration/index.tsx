// pages/UserManagement/UserRegistration/index.tsx
import { AppCard } from "@/components/common/Card";
import UserRegistrationForm from "@/components/complex/forms/UserRegistrationForm";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";

const UserRegistrationPage: React.FC = () => {
  const handleSuccess = (message: string) => {
    // 성공 시 추가 작업이 필요하면 여기서 처리

    // 예: 사용자 목록 페이지로 이동
    // navigate('/user-list');

    // 예: 페이지 새로고침 (현재 구현과 동일)
    alert(message);
  };

  return (
    <DashboardLayout title="사용자 등록">
      <AppCard title="사용자 등록">
        <UserRegistrationForm onSuccess={handleSuccess} />
      </AppCard>
    </DashboardLayout>
  );
};

export default UserRegistrationPage;
