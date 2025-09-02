import { AppPaper } from "@/components/common/Paper";
import UserUpdateForm from "@/components/forms/UserUpdateForm";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useAuth } from "@/context";
import { useLocation } from "react-router-dom";

const UserUpdatePage: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();

  // 🔹 이전 페이지에서 전달한 데이터
  const initialData = location.state?.userData || {
    loginId: "",
    empName: "",
    dptName: "",
    officeTel: "",
    mobileTel: "",
  };

  return (
    <DashboardLayout title="사용자 정보 설정">
      <AppPaper title="사용자 정보 설정">
        <UserUpdateForm
          initialData={initialData} // 🔹 전달받은 데이터 사용
          onSuccess={async () => {
            alert("수정되었습니다");
          }}
        />
      </AppPaper>
    </DashboardLayout>
  );
};

export default UserUpdatePage;
