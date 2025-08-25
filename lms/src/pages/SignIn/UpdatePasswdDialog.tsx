// components/forms/PasswordChangeDialog.tsx
import AppDialog from "@/components/common/Dialog";
import PasswordUpdateForm from "@/components/forms/PasswdUpdateForm";
import React from "react";

interface PasswordChangeDialogProps {
  open: boolean;
  onClose: () => void;
}

const PasswordUpdateDialog: React.FC<PasswordChangeDialogProps> = ({
  open,
  onClose,
}) => {
  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title="비밀번호 변경"
      maxWidth="sm"
    >
      <PasswordUpdateForm
        onSuccess={(msg) => {
          alert(msg);
        }}
      />
    </AppDialog>
  );
};

export default PasswordUpdateDialog;
