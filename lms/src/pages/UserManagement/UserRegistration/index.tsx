// pages/UserManagement/UserRegistration/index.tsx
import { UserRegistration } from "@/api/types/user";
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
import {
  validateConfirmPassword,
  validateLoginID,
  validatePassword,
} from "@/utils/validator";
import React, { useState } from "react";

const UserRegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState<UserRegistration>({
    loginID: "",
    passwd: "",
    empName: "",
    deptName: "",
    officeTel: "",
    mobileTel: "",
    email: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  const handleChange =
    (field: keyof UserRegistration) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
      // 에러 메시지 초기화
      if (error) setError(null);
    };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // ID 검증
    const loginIDError = validateLoginID(formData.loginID);
    if (loginIDError) {
      setError(loginIDError);
      return;
    }

    // 비밀번호 검증
    const passwordError = validatePassword(formData.passwd);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // 비밀번호 확인 검증
    const confirmPasswordError = validateConfirmPassword(
      formData.passwd,
      confirmPassword
    );
    if (confirmPasswordError) {
      setError(confirmPasswordError);
      return;
    }
  };

  return (
    <DashboardLayout title="사용자 등록">
      <AppPaper>
        <AppBox component="form" onSubmit={handleSubmit}>
          <Row>
            <Column>
              <Row mainAxisAlignment="start">
                <AppTextField
                  label="ID"
                  name="username"
                  id="username"
                  autoComplete="username"
                  value={formData.loginID}
                  required={true}
                  sx={{ flex: 1 }}
                  onChange={handleChange("loginID")}
                />
                <AppTextField
                  label="이름"
                  name="name"
                  id="name"
                  autoComplete="name"
                  required={true}
                  sx={{ flex: 1 }}
                  onChange={handleChange("empName")}
                />
              </Row>
              <Row>
                <AppPasswordField
                  label="비밀번호"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  sx={{ flex: 1 }}
                  onChange={handleChange("passwd")}
                />
                <AppPasswordField
                  label="비밀번호 확인"
                  name="confirmPassword"
                  id="confirmPassword"
                  autoComplete="new-password"
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  sx={{ flex: 1 }}
                />
              </Row>
              <Row>{error && <p style={{ color: "red" }}>{error}</p>}</Row>
              <Row mainAxisAlignment="end">
                <AppButton type="submit">등록</AppButton>
              </Row>
            </Column>
          </Row>
        </AppBox>
      </AppPaper>
    </DashboardLayout>
  );
};

export default UserRegistrationPage;
