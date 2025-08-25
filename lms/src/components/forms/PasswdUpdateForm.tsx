// components/forms/PasswordUpdateForm.tsx
import { AppButton, AppPaper, Column, Row } from "@/components/common";
import { AppBox } from "@/components/common/Box";
import { AppPasswordField } from "@/components/common/TextField";
import AppTypography from "@/components/common/Typography";
import React, { useState } from "react";
import { validatePasswdUpdatedForm } from "./utils";

interface PasswordChangeFormProps {
  onSuccess?: (message: string) => void;
  onSubmit?: (password: string, confirmPassword: string) => Promise<void>;
}

interface PasswordFormData {
  password: string;
  confirmPassword: string;
}

const PasswordUpdateForm: React.FC<PasswordChangeFormProps> = ({
  onSuccess,
  onSubmit,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<PasswordFormData>({
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleChange =
    (field: keyof PasswordFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
      // 에러 메시지 초기화
      if (errorMsg) setErrorMsg(null);
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // 전체 폼 검증
    const { valid, error } = validatePasswdUpdatedForm(formData);
    if (!valid && error !== undefined) {
      setErrorMsg(error);
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      // 외부에서 전달받은 onSubmit 함수가 있으면 사용
      if (onSubmit) {
        await onSubmit(formData.password, formData.confirmPassword);
      } else {
        // 기본 처리 (실제로는 API 호출)
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 시뮬레이션
      }

      // 성공 처리
      const successMessage = "비밀번호가 성공적으로 변경되었습니다.";
      setSuccessMsg(successMessage);

      // 성공 콜백 호출
      onSuccess?.(successMessage);

      // 폼 초기화
      setFormData({
        password: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      setErrorMsg(error.message || "비밀번호 변경 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppPaper elevation={0}>
      <AppBox component="form" onSubmit={handleSubmit}>
        <Column>
          <Row>
            <AppPasswordField
              label="새 비밀번호"
              name="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              required
              sx={{ flex: 1 }}
              onChange={handleChange("password")}
            />
          </Row>

          <Row>
            <AppPasswordField
              label="비밀번호 확인"
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              required
              sx={{ flex: 1 }}
              onChange={handleChange("confirmPassword")}
            />
          </Row>

          <Row>
            <AppTypography variant="body2" color="text.secondary">
              비밀번호는 8자 이상이어야 합니다.
            </AppTypography>
          </Row>

          {/* 메시지 표시 */}
          {errorMsg && (
            <Row>
              <AppTypography style={{ color: "red" }}>{errorMsg}</AppTypography>
            </Row>
          )}

          {successMsg && (
            <Row>
              <AppTypography style={{ color: "green" }}>
                {successMsg}
              </AppTypography>
            </Row>
          )}

          {/* 제출 버튼 */}
          <Row mainAxisAlignment="end">
            <AppButton type="submit" disabled={loading}>
              {loading ? "변경 중..." : "비밀번호 변경"}
            </AppButton>
          </Row>
        </Column>
      </AppBox>
    </AppPaper>
  );
};

export default PasswordUpdateForm;
