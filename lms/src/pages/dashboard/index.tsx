// pages/dashboard.tsx

import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout title="대시보드">
      {/* 여기에 대시보드 컨텐츠를 넣으세요 */}
      <div style={{ padding: 24, minHeight: "80vh" }}>
        <h1>환영합니다, 대시보드 페이지입니다.</h1>
        <p>여기에 필요한 컴포넌트나 위젯들을 추가하세요.</p>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
