// components/Dialog.js
import React, { useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import AgGridSimpleTable from "frames/DataGrid/AgGridSimpleTable"; // 경로는 프로젝트 구조에 맞게 수정하세요

import { useMaterialUIController } from "context";
import lightColors from "assets/theme/base/colors";
import darkColors from "assets/theme-dark/base/colors";
import { useTheme } from "@emotion/react";

function LoanReviewBriefDialog({ open, title, onClose }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  useEffect(() => {
    document.body.dataset.agThemeMode = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  const theme = useTheme(); // 현재 MUI 테마 받아오기
  const colors = darkMode ? darkColors : lightColors; // 샘플 컬럼/데이터

  const colDef = [
    { field: "make", headerName: "제조사" },
    { field: "model", headerName: "모델" },
    { field: "price", headerName: "가격" },
  ];

  const rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          backgroundColor: colors.background.card,
          color: theme.palette.text.primary,
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {title}
        <IconButton aria-label="close" onClick={onClose} edge="end" color="default" sx={{ ml: 2 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* 첫 번째 테이블 */}
          <AgGridSimpleTable
            title="테이블 1"
            colCount={3}
            rowCount={2}
            colDef={colDef}
            rowData={rowData}
          />

          {/* 두 번째 테이블 */}
          <AgGridSimpleTable
            title="테이블 2"
            colCount={3}
            rowCount={3}
            colDef={colDef}
            rowData={rowData}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}

LoanReviewBriefDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default LoanReviewBriefDialog;
