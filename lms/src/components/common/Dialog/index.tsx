// components/common/AppDialog.tsx
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogProps, DialogTitle } from "@mui/material";
import React from "react";
import { AppBox } from "../Box";
import { AppIconButton } from "../Button";

export interface AppDialogProps extends DialogProps {
  /** 다이얼로그 제목 */
  title?: string;

  /** 닫기 버튼 표시 여부 */
  showCloseButton?: boolean;

  /** AppBox 기본 padding */
  padding?: number | string;
}

const AppDialog: React.FC<AppDialogProps> = ({
  title,
  showCloseButton = true,
  onClose,
  children,
  padding = 4,
  ...props
}) => {
  return (
    <Dialog {...props} onClose={onClose}>
      {title && (
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {title}
          {showCloseButton && onClose && (
            <AppIconButton
              aria-label="close"
              onClick={(event) => onClose(event, "backdropClick")}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </AppIconButton>
          )}
        </DialogTitle>
      )}

      {/* 기본 padding 적용 */}
      <AppBox sx={{ p: padding }}>{children}</AppBox>
    </Dialog>
  );
};

export default AppDialog;
