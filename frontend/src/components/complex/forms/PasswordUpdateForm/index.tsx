// components/forms/PasswordUpdateForm.tsx
import { PasswordUpdateApi } from "@/api";
import { LoginCredentials, PasswdUpdate } from "@/api/types";
import { AppButton, Column, Row } from "@/components/common";
import { AppBox } from "@/components/common/Box";
import { AppPasswordField, AppTextField } from "@/components/common/TextField";
import AppTypography from "@/components/common/Typography";
import { validateConfirmPassword, validatePassword } from "@/utils/form";
import React, { useEffect, useState } from "react";

interface PasswordChangeFormProps {
  loginCredentials: LoginCredentials;
  onSuccess?: () => void;
}

const PasswordUpdateForm: React.FC<PasswordChangeFormProps> = ({
  loginCredentials,
  onSuccess,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<PasswdUpdate>({
    loginId: "",
    passwd: "",
    newPasswd: "",
  });
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 초기 데이터 설정
  useEffect(() => {
    setFormData({
      loginId: loginCredentials.loginId,
      passwd: loginCredentials.passwd,
      newPasswd: "",
    });
  }, [loginCredentials]);

  const validatePasswdUpdatedForm = (
    password: string,
    confirmPassword: string
  ): { valid: boolean; error?: string } => {
    let error: string | null = null;

    error = validatePassword(password);
    if (error) return { valid: false, error };

    error = validateConfirmPassword(password, confirmPassword);
    if (error) return { valid: false, error };

    return { valid: true };
  };

  const handleChange =
    (field: keyof PasswdUpdate) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
      // 에러 메시지 초기화
      if (errorMsg) setErrorMsg(null);
    };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmNewPassword(event.target.value);
    // 에러 메시지 초기화
    if (errorMsg) setErrorMsg(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // 전체 폼 검증
    const { valid, error } = validatePasswdUpdatedForm(
      formData.newPasswd,
      confirmNewPassword
    );
    if (!valid && error !== undefined) {
      setErrorMsg(error);
      return;
    }

    if (!confirm("비밀번호를 변경하시겠습니까?")) {
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      console.log(formData);
      await PasswordUpdateApi(formData);

      // 성공 콜백 호출
      onSuccess?.();

      // 폼 초기화
      setFormData((prev) => ({ ...prev, newPasswd: "" }));
      setConfirmNewPassword("");
    } catch (error: any) {
      setErrorMsg(error.message || "비밀번호 변경 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppBox component="form" onSubmit={handleSubmit}>
      <Column spacing={2}>
        {/* 접근성을 위한 username 필드 */}
        <Row>
          <AppTextField
            type="text"
            name="username"
            autoComplete="username"
            label="사용자 ID"
            value={formData.loginId}
            slotProps={{ input: { readOnly: true } }}
            fullWidth
            margin="normal"
            tabIndex={-1}
            variant="outlined"
            sx={{ flex: 1 }}
          />
        </Row>

        <Row>
          <AppPasswordField
            label="새 비밀번호"
            name="new-password"
            id="new-password"
            autoComplete="new-password"
            value={formData.newPasswd}
            required
            sx={{ flex: 1 }}
            onChange={handleChange("newPasswd")}
            disabled={loading}
          />
        </Row>

        <Row>
          <AppPasswordField
            label="비밀번호 확인"
            name="confirm-new-password"
            id="confirm-new-password"
            autoComplete="new-password"
            value={confirmNewPassword}
            required
            sx={{ flex: 1 }}
            onChange={handleConfirmPasswordChange}
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

        {/* 제출 버튼 */}
        <Row mainAxisAlignment="end">
          <AppButton type="submit" variantType="filled">
            {loading ? "변경 중..." : "비밀번호 변경"}
          </AppButton>
        </Row>
      </Column>
    </AppBox>
  );
};

export default PasswordUpdateForm;
