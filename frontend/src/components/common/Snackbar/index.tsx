// components/common/AppSnackbar/index.tsx
import { Alert, AlertColor, Snackbar } from "@mui/material";
import React from "react";

interface AppSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  type?: AlertColor; // 'success' | 'info' | 'warning' | 'error'
  duration?: number;
}

const AppSnackbar: React.FC<AppSnackbarProps> = ({
  open,
  onClose,
  message,
  type = "info",
  duration = 4000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={type} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
