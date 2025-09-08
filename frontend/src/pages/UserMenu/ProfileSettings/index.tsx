// pages/UserManagement/ProfileEdit/index.tsx
import { AppCard } from "@/components/common/Card";
import UserUpdateForm from "@/components/complex/forms/UserUpdateForm";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useAuth } from "@/context";

const ProfileSettingsPage: React.FC = () => {
  const { logout } = useAuth();

  return (
    <DashboardLayout title="사용자 정보 설정">
      <AppCard title="사용자 정보 설정">
        <UserUpdateForm
          onSuccess={async () => {
            alert("수정되었습니다");
            await logout();
          }}
        />
      </AppCard>
    </DashboardLayout>
  );
};

export default ProfileSettingsPage;
