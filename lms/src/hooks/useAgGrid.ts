// hooks/useAgGrid.ts
import { useMemo } from "react";
import { ColDef, GridOptions, GridReadyEvent } from "ag-grid-community";

interface UseAgGridConfigProps {
  enablePagination: boolean;
  pageSize: number;
  enableCheckbox: boolean;
  gridOptions?: GridOptions;
}

export const useAgGridConfig = ({
  enablePagination,
  pageSize,
  enableCheckbox,
  gridOptions = {},
}: UseAgGridConfigProps) => {
  return useMemo(
    (): GridOptions => ({
      // 기본 설정
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        resizable: true,
        sortable: true,
        filter: true,
        ...gridOptions.defaultColDef,
      },

      // 페이지네이션 설정
      pagination: enablePagination,
      paginationPageSize: pageSize,
      paginationPageSizeSelector: enablePagination ? [10, 25, 50, 100] : false,

      // 체크박스 선택 설정
      rowSelection: enableCheckbox ? "multiple" : undefined,

      // 행 높이 설정
      rowHeight: 36,
      headerHeight: 40,

      // 그리드 동작
      suppressCellFocus: true,
      suppressRowClickSelection: true,
      animateRows: true,
      suppressPaginationPanel: false,

      // 사용자 커스텀 옵션
      ...gridOptions,
    }),
    [enablePagination, pageSize, enableCheckbox, gridOptions]
  );
};

export const useProcessedColumnDefs = (columnDefs: ColDef[]) => {
  return useMemo(() => {
    return columnDefs.map((col) => ({
      ...col,
      checkboxSelection:
        col.checkboxSelection !== undefined ? col.checkboxSelection : false,
    }));
  }, [columnDefs]);
};

export const useGridEventHandlers = () => {
  const onGridReady = (params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  };

  return {
    onGridReady,
  };
};
