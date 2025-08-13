// src/components/AgGrid/AgGridToolbar.tsx

import React from "react";
import { Box, IconButton, Tooltip, Stack } from "@mui/material";
import {
  FileDownload as FileDownloadIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

interface AgGridToolbarProps {
  /**
   * 엑셀 다운로드 콜백
   */
  onExport?: () => void;
  /**
   * 새로고침 콜백
   */
  onRefresh?: () => void;
  /**
   * 설정 콜백
   */
  onSettings?: () => void;
  /**
   * 엑셀 다운로드 버튼 표시 여부
   */
  showExportButton?: boolean;
  /**
   * 새로고침 버튼 표시 여부
   */
  showRefreshButton?: boolean;
  /**
   * 설정 버튼 표시 여부
   */
  showSettingsButton?: boolean;
  /**
   * 로딩 상태
   */
  loading?: boolean;
}

const AgGridToolbar: React.FC<AgGridToolbarProps> = ({
  onExport,
  onRefresh,
  onSettings,
  showExportButton = true,
  showRefreshButton = false,
  showSettingsButton = false,
  loading = false,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        mb: 1,
        minHeight: 40,
      }}
    >
      <Stack direction="row" spacing={1}>
        {showRefreshButton && (
          <Tooltip title="새로고침" arrow>
            <IconButton
              color="default"
              onClick={onRefresh}
              disabled={loading}
              size="small"
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        )}

        {showExportButton && (
          <Tooltip title="CSV 다운로드" arrow>
            <IconButton
              color="default"
              onClick={onExport}
              disabled={loading}
              size="small"
            >
              <FileDownloadIcon />
            </IconButton>
          </Tooltip>
        )}

        {showSettingsButton && (
          <Tooltip title="설정" arrow>
            <IconButton
              color="default"
              onClick={onSettings}
              disabled={loading}
              size="small"
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
    </Box>
  );
};

export default AgGridToolbar;
