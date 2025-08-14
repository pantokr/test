// components/Grid/MuiDatagrid.tsx
import React from "react";
import { DataGrid, DataGridProps, GridColDef } from "@mui/x-data-grid";
import { Box, Paper, Typography, Alert, CircularProgress } from "@mui/material";
import { MuiDataGridProps } from "@/types";

const MuiDataGrid: React.FC<
  MuiDataGridProps & Omit<DataGridProps, "rows" | "columns">
> = ({
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
  ...props
}) => {
  return (
    <Paper
      sx={{
        p: 2,
        width: "100%",
        height: "100%",
        maxHeight: "100%",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: "0",
        overflow: "hidden",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      {/* 로딩 중일 때 */}
      {loading && (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            flex: 1,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* 로딩이 끝났을 때만 표시 */}
      {!loading && (
        <>
          {/* 제목 및 카운트 */}
          {title && (
            <Typography variant="h6" gutterBottom sx={{ flexShrink: 0 }}>
              {title} {showRowCount && `(총 ${data.length}건)`}
            </Typography>
          )}

          {/* 에러 메시지 */}
          {error && (
            <Alert severity="error" sx={{ mb: 2, flexShrink: 0 }}>
              {error}
            </Alert>
          )}

          {/* 데이터가 있을 때 그리드 표시 */}
          {data.length > 0 && (
            <Box
              sx={{
                width: "100%",
                minHeight: 0,
                position: "relative",
              }}
            >
              <DataGrid
                rows={data}
                columns={columnDefs}
                loading={false}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize },
                  },
                }}
                pageSizeOptions={[10, 25, 50, 100]}
                checkboxSelection={enableCheckbox}
                disableRowSelectionOnClick
                hideFooter={!enablePagination}
                // 페이지네이션을 상단으로 이동
                slots={{
                  ...props.slots,
                }}
                slotProps={{
                  pagination: {
                    showFirstButton: true,
                    showLastButton: true,
                  },
                  ...props.slotProps,
                }}
                {...props}
              />
            </Box>
          )}

          {/* 데이터가 없을 때 */}
          {!error && data.length === 0 && (
            <Box>
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

export default MuiDataGrid;
