// components/common/AppDialog.tsx
import { Close } from "@mui/icons-material";
import { Dialog, DialogProps, DialogTitle } from "@mui/material";
import React from "react";
import { AppIconButton } from "../Button";
import { Column } from "../Column";
import { Row } from "../Row";

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
  padding = 2,
  ...props
}) => {
  return (
    <Dialog {...props} onClose={onClose}>
      <Column sx={{ p: padding }} spacing={padding}>
        {title && (
          <DialogTitle sx={{ m: 0, p: 0 }}>
            {" "}
            {/* padding 제거 */}
            <Row mainAxisAlignment="spaceBetween">
              {title}
              {showCloseButton && (
                <AppIconButton
                  aria-label="close"
                  onClick={(event) => onClose?.(event, "backdropClick")}
                  sx={{ color: (theme) => theme.palette.grey[500] }}
                >
                  <Close />
                </AppIconButton>
              )}
            </Row>
          </DialogTitle>
        )}

        {children}
      </Column>
    </Dialog>
  );
};

export default AppDialog;
