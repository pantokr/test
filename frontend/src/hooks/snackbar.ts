// Hook으로 더 간단하게 사용
import { AlertColor } from "@mui/material";
import { useState } from "react";

export const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<AlertColor>("info");

  const show = (msg: string, severity: AlertColor = "info") => {
    setMessage(msg);
    setType(severity);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  // 편의 메서드들
  const success = (msg: string) => show(msg, "success");
  const error = (msg: string) => show(msg, "error");
  const warning = (msg: string) => show(msg, "warning");
  const info = (msg: string) => show(msg, "info");

  return {
    snackbarProps: { open, onClose: close, message, type },
    show,
    success,
    error,
    warning,
    info,
    close,
  };
};
