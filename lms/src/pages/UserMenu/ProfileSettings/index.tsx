// pages/UserManagement/ProfileEdit/index.tsx
import UserUpdateForm from "@/components/forms/UserUpdateForm";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useAuth } from "@/context";

const ProfileSettingsPage = () => {
  const { logout } = useAuth();

  return (
    <DashboardLayout title="프로필 수정">
      <UserUpdateForm
        onSuccess={async () => {
          alert("수정되었습니다");
          await logout();
        }}
      />
    </DashboardLayout>
  );
};

export default ProfileSettingsPage;
