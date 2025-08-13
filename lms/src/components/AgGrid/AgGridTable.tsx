// src/components/AgGrid/AgGridTable.tsx

import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { Box, Skeleton } from "@mui/material";

import type { AgGridTableProps } from "@/types/agGrid";
import {
  useAgGridTheme,
  useAgGridResponsive,
  useAgGridApi,
  useAgGridDefaults,
} from "@/hooks/useAgGrid";
import AgGridToolbar from "./AgGridToolbar";

// AG-Grid 모듈 등록 (한 번만)
ModuleRegistry.registerModules([AllCommunityModule]);

const AgGridTable: React.FC<AgGridTableProps> = ({
  rows = [],
  columns,
  fileName = "export",
  pagination = true,
  pageSize = 50,
  height = "500px",
  loading = false,
  showExportButton = true,
  gridOptions = {},
}) => {
  const { theme, className } = useAgGridTheme();
  const { isMobile, shouldUsePagination, getResponsiveMinWidth } =
    useAgGridResponsive();
  const { gridRef, setGridRef, exportToCsv } = useAgGridApi();
  const { defaultColDef, overlayNoRowsTemplate } = useAgGridDefaults();

  // 반응형 컬럼 적용
  const responsiveColumns = useMemo(() => {
    return columns.map((col) => ({
      ...col,
      minWidth: getResponsiveMinWidth(col.minWidth || 100),
    }));
  }, [columns, getResponsiveMinWidth]);

  // 그리드 옵션 통합
  const finalGridOptions = useMemo(
    () => ({
      rowData: rows,
      columnDefs: responsiveColumns,
      defaultColDef,
      pagination: shouldUsePagination && pagination,
      paginationPageSize: pageSize,
      paginationPageSizeSelector: [25, 50, 100, 200],
      rowSelection: { mode: "multiRow" as const },
      overlayNoRowsTemplate,
      suppressCellFocus: true,
      headerHeight: 48,
      rowHeight: 52,
      animateRows: true,
      ...gridOptions,
    }),
    [
      rows,
      responsiveColumns,
      defaultColDef,
      shouldUsePagination,
      pagination,
      pageSize,
      overlayNoRowsTemplate,
      gridOptions,
    ]
  );

  const handleExport = () => {
    exportToCsv(fileName);
  };

  // 로딩 상태 렌더링
  if (loading) {
    return (
      <Box sx={{ height, width: "100%" }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 툴바 */}
      <AgGridToolbar
        onExport={handleExport}
        showExportButton={showExportButton}
        loading={loading}
      />

      {/* AG-Grid */}
      <Box
        className={className}
        sx={{
          flex: 1,
          width: "100%",
          // 다크 모드 스타일 오버라이드
          "& .ag-theme-balham-dark": {
            "--ag-background-color": "var(--mui-palette-background-paper)",
            "--ag-header-background-color":
              "var(--mui-palette-background-default)",
            "--ag-odd-row-background-color": "var(--mui-palette-action-hover)",
          },
          "& .ag-theme-balham": {
            "--ag-background-color": "var(--mui-palette-background-paper)",
            "--ag-header-background-color":
              "var(--mui-palette-background-default)",
          },
        }}
      >
        <AgGridReact {...finalGridOptions} ref={setGridRef} />
      </Box>
    </Box>
  );
};

export default AgGridTable;
