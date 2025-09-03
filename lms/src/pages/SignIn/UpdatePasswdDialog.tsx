// components/forms/PasswordUpdateDialog.tsx
import { LoginCredentials } from "@/api/types";
import AppDialog from "@/components/common/Dialog";
import AppTypography from "@/components/common/Typography";
import PasswordUpdateForm from "@/components/forms/PasswordUpdateForm";
import React from "react";

interface PasswordUpdateDialogProps {
  loginCredentials: LoginCredentials;
  open: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  warningMessage?: string | null;
}

const PasswordUpdateDialog: React.FC<PasswordUpdateDialogProps> = ({
  loginCredentials,
  open,
  onClose,
  onSuccess,
  warningMessage = null,
}) => {
  const handleSuccess = (message: string) => {
    onSuccess(message);
  };

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title="비밀번호 변경"
      maxWidth="sm"
    >
      {warningMessage && (
        <AppTypography variant="body2" color="warning.main" sx={{ mb: 2 }}>
          {warningMessage}
        </AppTypography>
      )}

      <PasswordUpdateForm
        loginCredentials={loginCredentials}
        onSuccess={handleSuccess}
      />
    </AppDialog>
  );
};

export default PasswordUpdateDialog;
