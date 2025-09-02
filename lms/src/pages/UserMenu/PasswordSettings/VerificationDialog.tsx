// components/dialogs/VerificationDialog/VerificationDialog.tsx
import { AppButton, AppPasswordField } from "@/components/common";
import { AppBox } from "@/components/common/Box";
import AppDialog from "@/components/common/Dialog";
import AppTypography from "@/components/common/Typography";
import { Alert, DialogActions, DialogContent } from "@mui/material";
import React, { useState } from "react";

export interface VerificationDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  onVerify: (password: string) => Promise<void>;
  onCancel: () => void;
  isVerifying?: boolean;
}

const VerificationDialog: React.FC<VerificationDialogProps> = ({
  open,
  title = "본인 확인",
  description = "비밀번호 변경을 위해 현재 비밀번호를 입력해주세요.",
  onVerify,
  onCancel,
  isVerifying = false,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (!currentPassword.trim()) {
      setVerificationError("현재 비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setVerificationError("");

    try {
      await onVerify(currentPassword);
      setCurrentPassword(""); // 성공 시 초기화
    } catch (error) {
      setVerificationError(
        error instanceof Error
          ? error.message
          : "비밀번호 확인 중 오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setCurrentPassword("");
    setVerificationError("");
    onCancel();
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
    setVerificationError(""); // 입력 시 에러 메시지 초기화
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

  const loading = isLoading || isVerifying;

  return (
    <AppDialog
      open={open}
      title={title}
      showCloseButton={false} // ESC나 외부 클릭으로 닫지 못하게
      onClose={() => {}} // ESC나 외부 클릭으로 닫지 못하게
      maxWidth="sm"
      fullWidth
      padding={0} // AppDialog의 기본 padding을 제거
    >
      <AppBox component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <AppBox sx={{ pb: 2 }}>
            <AppTypography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              {description}
            </AppTypography>

            {verificationError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {verificationError}
              </Alert>
            )}

            {/* 접근성을 위한 숨겨진 username 필드 */}
            <input
              type="text"
              name="username"
              autoComplete="username"
              style={{
                position: "absolute",
                left: "-9999px",
                opacity: 0,
                pointerEvents: "none",
              }}
              tabIndex={-1}
              aria-hidden="true"
            />

            <AppPasswordField
              fullWidth
              label="현재 비밀번호"
              value={currentPassword}
              onChange={handlePasswordChange}
              onKeyDown={handleKeyDown}
              autoFocus
              margin="normal"
              name="current-password"
              autoComplete="current-password"
            />
          </AppBox>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <AppButton
            type="button"
            variantType="transparent"
            onClick={handleCancel}
            disabled={loading}
            color="inherit"
          >
            취소
          </AppButton>
          <AppButton
            type="submit"
            variantType="filled"
            disabled={loading || !currentPassword.trim()}
          >
            {loading ? "확인 중..." : "확인"}
          </AppButton>
        </DialogActions>
      </AppBox>
    </AppDialog>
  );
};

export default VerificationDialog;
