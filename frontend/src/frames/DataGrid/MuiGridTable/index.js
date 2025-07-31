import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import MDBox from "components/MDBox";
import PropTypes from "prop-types";

function MuiGridTable({ rows, columns, pageSize = 5, rowsPerPageOptions = [5, 10] }) {
  const [containerSize, setContainerSize] = useState(null);

  const handleResize = (newContainerSize, event, details) => {
    setContainerSize(newContainerSize);
  };
  return (
    <MDBox pt={6} pb={3}>
      <DataGrid
        rows={rows}
        columns={columns}
        onResize={handleResize}
        pageSize={pageSize}
        showCellVerticalBorder={true}
        rowsPerPageOptions={rowsPerPageOptions}
        // sx={{
        //   border: 1,
        //   borderColor: "divider",
        //   "& .MuiDataGrid-columnSeparator": {
        //     display: "none", // 컬럼 구분선 제거
        //   },
        //   "& .MuiDataGrid-columnHeader": {
        //     borderRight: "none", // 헤더 border 제거
        //   },
        //   "& .MuiDataGrid-cell": {
        //     borderRight: "1px solid #e0e0e0", // 셀만 border 적용
        //   },
        // }}
      />
    </MDBox>
  );
}

MuiGridTable.propTypes = {
  /** row 데이터 (MUI DataGrid는 반드시 id 필드 필요) */
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,

  /** 컬럼 정의 */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string,
      flex: PropTypes.number,
      type: PropTypes.string,
    })
  ).isRequired,

  /** 한 페이지에 보여줄 row 개수 */
  pageSize: PropTypes.number,

  /** 선택 가능한 페이지 크기 옵션 */
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
};

export default MuiGridTable;
