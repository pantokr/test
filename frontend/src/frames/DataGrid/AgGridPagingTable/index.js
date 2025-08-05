import React, { useEffect, useState, useRef, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule, themeBalham } from "ag-grid-community";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import { IconButton, Tooltip } from "@mui/material";
import { FileDownload } from "@mui/icons-material";

import { useMaterialUIController } from "context";
import lightColors from "assets/theme/base/colors";
import darkColors from "assets/theme-dark/base/colors";
import agGridTheme from "../AgGridThemeBalham";

ModuleRegistry.registerModules([AllCommunityModule]);

function AgGridTable({ rows, columns, pageName, pagination = true, pageSize = 50 }) {
  const gridRef = useRef();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  // 반응형 화면 크기 감지
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1200);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.dataset.agThemeMode = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  const colors = darkMode ? darkColors : lightColors;
  const agTheme = agGridTheme(colors);

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      minWidth: 50,
      sortable: true,
      filter: true,
    }),
    []
  );

  const gridOptions = {
    rowData: rows ?? [],
    columnDefs: columns,
    rowSelection: { mode: "multiRow" },
    defaultColDef,
    pagination: isMobile ? false : pagination,
    paginationPageSize: pageSize,
    paginationPageSizeSelector: [25, 50, 100, 500],
    theme: agTheme,
    overlayNoRowsTemplate: '<span aria-live="polite" aria-atomic="true">데이터가 없습니다.</span>',
  };

  const handleExport = (fn) => {
    if (gridRef.current?.api) {
      gridRef.current.api.exportDataAsCsv({ fileName: fn });
    }
  };

  return (
    <MDBox
      sx={{
        flexGrow: 1,
        height: "100%",
        width: "100%",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 엑셀 다운로드 버튼 */}
      <MDBox
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Tooltip title="엑셀 다운로드" arrow>
          <IconButton
            color="default"
            aria-label="엑셀 다운로드"
            onClick={() => handleExport(pageName)}
          >
            <FileDownload />
          </IconButton>
        </Tooltip>
      </MDBox>

      {/* ag-grid 테이블 */}
      <AgGridReact {...gridOptions} ref={gridRef} />
    </MDBox>
  );
}

AgGridTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string,
      sortable: PropTypes.bool,
      filter: PropTypes.bool,
      flex: PropTypes.number,
      minWidth: PropTypes.number,
    })
  ).isRequired,
  pageName: PropTypes.string.isRequired,
  pagination: PropTypes.bool,
  pageSize: PropTypes.number,
};

export default AgGridTable;
