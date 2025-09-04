// components/forms/PasswordVerificationForm.tsx
import { PasswordVerificationApi } from "@/api";
import { LoginCredentials } from "@/api/types";
import {
  AppButton,
  AppPasswordField,
  AppTextField,
  Row,
} from "@/components/common";
import { AppBox } from "@/components/common/Box";
import AppTypography from "@/components/common/Typography";
import { useAuth } from "@/context";
import { Alert } from "@mui/material";
import React, { useState } from "react";
// 실제 API 함수 (예시)

export interface PasswordVerificationFormProps {
  description?: string;
  onSuccess: (credentials: LoginCredentials) => void;
}

const PasswordVerificationForm: React.FC<PasswordVerificationFormProps> = ({
  description = "현재 비밀번호를 입력해주세요.",
  onSuccess,
}) => {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<LoginCredentials>({
    loginId: user?.loginId || "",
    passwd: "",
  });

  const handleCurrentPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      passwd: event.target.value,
    }));
  };

  const handleVerify = async () => {
    setIsLoading(true);
    setError("");

    try {
      // ✅ 내부에서 API 직접 호출
      await PasswordVerificationApi(formData);

      onSuccess(formData);
      setFormData((prev) => ({
        ...prev,
        passwd: "",
      }));
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "비밀번호 확인 중 오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleVerify();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleVerify();
    }
  };

  return (
    <AppBox component="form" onSubmit={handleSubmit}>
      <AppTypography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {description}
      </AppTypography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* 접근성을 위한 숨겨진 username 필드 */}
      <Row>
        <AppTextField
          type="text"
          name="username"
          autoComplete="username"
          label="사용자 ID"
          value={user?.loginId || ""} // TODO: props로 받아올 수도 있음
          slotProps={{ input: { readOnly: true } }}
          fullWidth
          margin="normal"
          tabIndex={-1}
          variant="outlined"
          sx={{ flex: 1 }}
        />
      </Row>

      <AppPasswordField
        fullWidth
        label="현재 비밀번호"
        value={formData.passwd}
        onChange={handleCurrentPasswordChange}
        onKeyDown={handleKeyDown}
        autoFocus
        margin="normal"
        name="current-password"
        autoComplete="current-password"
      />

      <AppBox display="flex" justifyContent="flex-end" gap={2} sx={{ mt: 3 }}>
        <AppButton type="submit" variantType="filled" disabled={isLoading}>
          {isLoading ? "확인 중..." : "확인"}
        </AppButton>
      </AppBox>
    </AppBox>
  );
};

export default PasswordVerificationForm;
