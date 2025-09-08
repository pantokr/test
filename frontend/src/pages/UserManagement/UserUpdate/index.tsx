import { AppCard } from "@/components/common/Card";
import UserUpdateForm from "@/components/complex/forms/UserUpdateForm";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useLocation } from "react-router-dom";

const UserUpdatePage: React.FC = () => {
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
    <DashboardLayout title="사용자 정보 수정">
      <AppCard title="사용자 정보 수정" width={"100%"} height={"100%"}>
        <UserUpdateForm
          initialData={initialData} // 🔹 전달받은 데이터 사용
          onSuccess={async () => {
            alert("수정되었습니다");
          }}
        />
      </AppCard>
    </DashboardLayout>
  );
};

export default UserUpdatePage;
