import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { AgGridReact } from "ag-grid-react";
import { Box, Typography } from "@mui/material";

import { useMaterialUIController } from "context";
import lightColors from "assets/theme/base/colors";
import darkColors from "assets/theme-dark/base/colors";
import agGridTheme from "../AgGridThemeBalham";

const AgGridSimpleTable = ({ title, colCount, rowCount, colDef, rowData }) => {
  const columns = colDef.slice(0, colCount);
  const rows = rowData.slice(0, rowCount);

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

  const defaultColDef = {
    resizable: true,
    flex: 1,
    minWidth: 50,
    sortable: true,
    filter: true,
  };

  const gridOptions = {
    rowData: rows ?? [],
    columnDefs: columns,
    defaultColDef: defaultColDef,
    theme: agTheme,
    overlayNoRowsTemplate: '<span aria-live="polite" aria-atomic="true">데이터가 없습니다.</span>',
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 700, margin: "auto" }}>
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}

      <Box className="ag-theme-alpine" sx={{ height: 200, width: "100%" }}>
        <AgGridReact
          columnDefs={columns}
          rowData={rows}
          gridOptions={gridOptions}
          suppressPaginationPanel={true}
          pagination={false}
          domLayout="autoHeight"
        />
      </Box>
    </Box>
  );
};

AgGridSimpleTable.propTypes = {
  title: PropTypes.string, // 테이블 제목
  colCount: PropTypes.number.isRequired, // 보여줄 컬럼 개수
  rowCount: PropTypes.number.isRequired, // 보여줄 행 개수
  colDef: PropTypes.arrayOf(PropTypes.object).isRequired, // 컬럼 정의 배열
  rowData: PropTypes.arrayOf(PropTypes.object).isRequired, // 행 데이터 배열
};

AgGridSimpleTable.defaultProps = {
  title: "", // 기본값은 빈 문자열
};

export default AgGridSimpleTable;
