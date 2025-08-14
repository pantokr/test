// components/Grid/AgGrid/index.tsx
import React from "react";
import { AgGridReact } from "ag-grid-react";
import { Box, Paper, Typography, Alert, CircularProgress } from "@mui/material";
import { AgGridProps } from "@/types/grid";
import {
  useAgGridConfig,
  useProcessedColumnDefs,
  useGridEventHandlers,
} from "@/hooks/useAgGrid";
import {
  paperStyles,
  loadingStyles,
  titleStyles,
  errorStyles,
  emptyStateStyles,
  getGridContainerStyles,
} from "./styles";

// AG-Grid CSS imports (필요한 경우)
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

const AgGrid: React.FC<AgGridProps> = ({
  columnDefs,
  data,
  title,
  loading = false,
  error,
  height = 600,
  pageSize = 25,
  showRowCount = true,
  enableCheckbox = true,
  enablePagination = true,
  gridOptions = {},
}) => {
  // 공용 훅 사용
  const defaultGridOptions = useAgGridConfig({
    enablePagination,
    pageSize,
    enableCheckbox,
    gridOptions,
  });

  const processedColumnDefs = useProcessedColumnDefs(columnDefs);
  const { onGridReady } = useGridEventHandlers();

  return (
    <Paper sx={paperStyles}>
      {/* 로딩 중일 때 */}
      {loading && (
        <Box sx={loadingStyles}>
          <CircularProgress />
        </Box>
      )}

      {/* 로딩이 끝났을 때만 표시 */}
      {!loading && (
        <>
          {/* 제목 및 카운트 */}
          {title && (
            <Typography variant="h6" gutterBottom sx={titleStyles}>
              {title} {showRowCount && `(총 ${data.length}건)`}
            </Typography>
          )}

          {/* 에러 메시지 */}
          {error && (
            <Alert severity="error" sx={errorStyles}>
              {error}
            </Alert>
          )}

          {/* 데이터가 있을 때 그리드 표시 */}
          {data.length > 0 && (
            <Box sx={getGridContainerStyles(data.length)}>
              <div
                className="ag-theme-alpine"
                style={{ width: "100%", height: "100%" }}
              >
                <AgGridReact
                  rowData={data}
                  columnDefs={processedColumnDefs}
                  gridOptions={defaultGridOptions}
                  onGridReady={onGridReady}
                  suppressLoadingOverlay={true}
                />
              </div>
            </Box>
          )}

          {/* 데이터가 없을 때 */}
          {!error && data.length === 0 && (
            <Box sx={emptyStateStyles}>
              <Typography color="text.secondary" variant="h6" gutterBottom>
                조회된 데이터가 없습니다
              </Typography>
              <Typography color="text.secondary" variant="body2">
                현재 표시할 데이터가 없습니다.
              </Typography>
            </Box>
          )}
        </>
      )}
    </Paper>
  );
};

export default AgGrid;

// 타입들 re-export
export type { AgGridProps, BaseGridData } from "@/types/grid";
export type { ColDef, GridOptions, GridReadyEvent } from "ag-grid-community";
