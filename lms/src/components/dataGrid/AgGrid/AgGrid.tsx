// AgGrid.tsx
import { Column, Row } from "@/components/common";
import { useThemeSettings } from "@/context";
import { ThemeSettings } from "@/context/types";
import {
  AllCommunityModule,
  ColDef,
  colorSchemeDark,
  GridApi,
  GridOptions,
  ModuleRegistry,
  themeBalham,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterButtons from "./Filters/FilterButtons";
import QuickFilterInput from "./Filters/QuickFilterInput";

ModuleRegistry.registerModules([AllCommunityModule]);

interface AgGridProps {
  columnDefs: ColDef[];
  rowData: any[];
  initialFilterModel?: any;
  loading?: boolean;
  elevation?: number;
  sx?: object;
  gridOptions?: GridOptions;
  gridApiRef?: React.RefObject<GridApi | null>; // 부모에서 전달
}

// fontSize에 따른 설정 매핑
const FONT_SIZE_MAP = {
  small: "11px",
  medium: "13px",
  large: "15px",
};

const ROW_HEIGHT_CONFIG = {
  small: { rowHeight: 24, headerHeight: 28 },
  medium: { rowHeight: 28, headerHeight: 32 },
  large: { rowHeight: 32, headerHeight: 36 },
};

// AG Grid 테마 생성 함수
const getAgGridTheme = (themeSettings: ThemeSettings) => {
  const actualFontSize = FONT_SIZE_MAP[themeSettings.fontSize];

  const myTheme = themeBalham.withParams({
    borderColor: "rgba(128, 128, 128, 0.3)",
    wrapperBorder: false,
    headerRowBorder: false,
    rowBorder: { style: "solid", width: 1 },
    columnBorder: { style: "solid" },
    fontSize: actualFontSize,
  });

  return themeSettings.darkMode ? myTheme.withPart(colorSchemeDark) : myTheme;
};

const AgGrid: React.FC<AgGridProps> = ({
  columnDefs,
  rowData,
  loading = false,
  initialFilterModel,
  gridOptions = {},
  gridApiRef, // 부모에서 전달
}) => {
  const navigate = useNavigate();
  const { themeSettings } = useThemeSettings();

  // 내부 ref는 부모에서 안보내주면 fallback 용도로만 사용
  const internalGridApiRef = useRef<GridApi | null>(null);

  const [filterModel, setFilterModel] = useState<any>({});

  const agGridTheme = useMemo(
    () => getAgGridTheme(themeSettings),
    [themeSettings]
  );
  const heightSettings = useMemo(
    () => ROW_HEIGHT_CONFIG[themeSettings.fontSize],
    [themeSettings.fontSize]
  );

  const gridKey = useMemo(
    () =>
      `ag-grid-${themeSettings.darkMode ? "dark" : "light"}-${
        themeSettings.fontSize
      }`,
    [themeSettings.darkMode, themeSettings.fontSize]
  );

  const applyFilterModel = (model: any) => {
    const ref = gridApiRef?.current ?? internalGridApiRef.current;
    if (ref) {
      ref.setFilterModel(model);
      ref.onFilterChanged();
    }
  };

  const clearFilterForColumn = (colId: string) => {
    const ref = gridApiRef?.current ?? internalGridApiRef.current;
    if (ref) {
      const currentModel = ref.getFilterModel();
      const newModel = { ...currentModel };
      delete newModel[colId];
      applyFilterModel(newModel);
    }
  };

  const defaultGridOptions: GridOptions = useMemo(
    () => ({
      theme: agGridTheme,
      rowHeight: heightSettings.rowHeight,
      headerHeight: heightSettings.headerHeight,

      defaultColDef: {
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
      },
      rowSelection: {
        mode: "singleRow",
        checkboxes: false,
        enableClickSelection: true,
      },
      pagination: true,
      paginationPageSize: 50,
      paginationPageSizeSelector: [25, 50, 100],
      animateRows: true,
      suppressCellFocus: true,
      onGridReady: (params) => {
        if (gridApiRef) {
          gridApiRef.current = params.api; // 부모 ref 초기화
        } else {
          internalGridApiRef.current = params.api; // 내부 ref fallback
        }

        if (initialFilterModel) {
          applyFilterModel(initialFilterModel);
        }

        gridOptions?.onGridReady?.(params);
      },
      onFilterChanged: (event) => {
        const ref = gridApiRef?.current ?? internalGridApiRef.current;
        const model = ref?.getFilterModel();
        setFilterModel(model);
        gridOptions?.onFilterChanged?.(event);
      },
      ...(loading && {
        loading: true,
        suppressLoadingOverlay: false,
        loadingOverlayComponent: "agLoadingOverlay",
      }),
      ...gridOptions,
    }),
    [agGridTheme, heightSettings, gridOptions, loading]
  );

  return (
    <Column width="100%" height="100%" spacing={1}>
      <Row crossAxisAlignment="end" spacing={1}>
        <QuickFilterInput gridApiRef={gridApiRef ?? internalGridApiRef} />
        <FilterButtons
          filterModel={filterModel}
          columnDefs={columnDefs}
          onClearColumnFilter={clearFilterForColumn}
        />
      </Row>
      <AgGridReact
        key={gridKey}
        columnDefs={columnDefs}
        rowData={rowData}
        gridOptions={defaultGridOptions}
      />
    </Column>
  );
};

export default AgGrid;
