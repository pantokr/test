import React from "react";
import { AgGridReact } from "ag-grid-react";
import { themeQuartz, ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const myTheme = themeQuartz.withParams({
  wrapperBorder: true, // 전체 테두리 표시 여부
  headerRowBorder: true, // 헤더 border
  rowBorder: { style: "solid", width: 2, color: "#dbdbdbff" }, // 행 테두리
  columnBorder: { style: "solid", width: 1, color: "#dbdbdbff" }, // 열 테두리
});

function AgGridTable({ rows, columns, pagination = true, pageSize = 50 }) {
  const defaultColDef = {
    resizable: true,
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
  };

  return (
    <MDBox
      sx={{
        flexGrow: 1,
        height: "100%", // Card 내부 꽉 채우기
        width: "100%",
        overflow: "auto", // 필요 시 내부 스크롤만
        display: "flex",
        flexDirection: "column",
      }}
      className="ag-theme-alpine"
    >
      <AgGridReact
        rowData={rows}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        pagination={pagination}
        paginationPageSize={pageSize}
        paginationPageSizeSelector={[25, 50, 100, 500]}
        theme={myTheme} // ✅ 커스텀 테마 적용
      />
    </MDBox>
  );
}

AgGridTable.propTypes = {
  /** row 데이터 (ag-grid는 key가 id일 필요 없음) */
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,

  /** 컬럼 정의 (field, headerName 등) */
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

  /** 페이지네이션 여부 */
  pagination: PropTypes.bool,

  /** 페이지 크기 */
  pageSize: PropTypes.number,
};

export default AgGridTable;
