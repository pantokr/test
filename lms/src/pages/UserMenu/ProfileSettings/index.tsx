// pages/UserManagement/ProfileEdit/index.tsx
import { AppPaper } from "@/components/common/Paper";
import UserUpdateForm from "@/components/forms/UserUpdateForm";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useAuth } from "@/context";

const ProfileSettingsPage = () => {
  const { logout } = useAuth();

  return (
    <DashboardLayout title="사용자 정보 설정">
      <AppPaper title="사용자 정보 설정">
        <UserUpdateForm
          onSuccess={async () => {
            alert("수정되었습니다");
            await logout();
          }}
        />
      </AppPaper>
    </DashboardLayout>
  );
};

export default ProfileSettingsPage;
