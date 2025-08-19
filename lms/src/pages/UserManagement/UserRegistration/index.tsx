// pages/LogManagement/LoginHistory.tsx

import {
  AppButton,
  AppPaper,
  AppTextField,
  Column,
  Row,
} from "@/components/common";
import { AppBox } from "@/components/common/Box";
import { AppPasswordField } from "@/components/common/TextField";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";

const UserRegistrationPage: React.FC = () => {
  return (
    <DashboardLayout title="사용자 등록">
      <AppPaper>
        <AppBox>
          <Row>
            <Column>
              <Row mainAxisAlignment="start">
                <AppTextField label="ID" sx={{ flex: 1, marginRight: 1 }} />
                <AppTextField label="이름" sx={{ flex: 1 }} />
              </Row>
              <Row>
                <AppPasswordField
                  label="비밀번호"
                  sx={{ flex: 1, marginRight: 1 }}
                />
                <AppPasswordField label="비밀번호 확인" sx={{ flex: 1 }} />
              </Row>
              <Row mainAxisAlignment="end">
                <AppButton>등록</AppButton>
              </Row>
            </Column>
          </Row>
        </AppBox>
      </AppPaper>
    </DashboardLayout>
  );
};

export default UserRegistrationPage;
