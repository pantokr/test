// AgGridMini.tsx
import { AppPaper } from "@/components/common";
import { AppBox } from "@/components/common/Box";
import { useThemeSettings } from "@/context";
import { ThemeSettings } from "@/context/types";
import {
  AllCommunityModule,
  ColDef,
  colorSchemeDark,
  GridOptions,
  ModuleRegistry,
  themeBalham,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import React, { useMemo } from "react";

ModuleRegistry.registerModules([AllCommunityModule]);

interface AgGridMiniProps {
  columnDefs: ColDef[];
  rowData: any[];
  maxRows?: number;
  showHeader?: boolean;
  elevation?: number;
  sx?: object;
}

// fontSize에 따른 설정 매핑 (미니 버전용)
const MINI_FONT_SIZE_MAP = {
  small: "11px",
  medium: "12px",
  large: "14px",
};

const MINI_ROW_HEIGHT_CONFIG = {
  small: { rowHeight: 20, headerHeight: 24 },
  medium: { rowHeight: 24, headerHeight: 28 },
  large: { rowHeight: 28, headerHeight: 32 },
};

// AG Grid 테마 생성 함수 (미니 버전)
const getMiniAgGridTheme = (themeSettings: ThemeSettings) => {
  const actualFontSize = MINI_FONT_SIZE_MAP[themeSettings.fontSize];

  const myTheme = themeBalham.withParams({
    borderColor: "rgba(128, 128, 128, 0.2)",
    wrapperBorder: false,
    headerRowBorder: false,
    rowBorder: { style: "solid", width: 1 },
    columnBorder: { style: "none" },
    fontSize: actualFontSize,
    spacing: 4, // 간격 줄임
  });

  return themeSettings.darkMode ? myTheme.withPart(colorSchemeDark) : myTheme;
};

const AgGridMini: React.FC<AgGridMiniProps> = ({
  columnDefs,
  rowData,
  maxRows = 5,
  showHeader = true,
  elevation = 0,
  sx,
}) => {
  const { themeSettings } = useThemeSettings();

  // 최대 행수에 따라 표시할 데이터 제한
  const limitedRowData = useMemo(() => {
    return rowData.slice(0, maxRows);
  }, [rowData, maxRows]);

  // userSettings.fontSize에 따라 행/헤더 높이 계산
  const heightSettings = useMemo(() => {
    return MINI_ROW_HEIGHT_CONFIG[themeSettings.fontSize];
  }, [themeSettings.fontSize]);

  const agGridTheme = useMemo(() => {
    return getMiniAgGridTheme(themeSettings);
  }, [themeSettings]);

  // 그리드 높이 계산 (헤더 + 행들)
  const gridHeight = useMemo(() => {
    const headerHeight = showHeader ? heightSettings.headerHeight : 0;
    const rowsHeight = limitedRowData.length * heightSettings.rowHeight;
    return headerHeight + rowsHeight + 2; // 2px는 보더용
  }, [limitedRowData.length, heightSettings, showHeader]);

  const miniGridOptions: GridOptions = useMemo(
    () => ({
      theme: agGridTheme,
      rowHeight: heightSettings.rowHeight,
      headerHeight: heightSettings.headerHeight,
      defaultColDef: {
        sortable: false,
        filter: false,
        resizable: false,
        flex: 1,
        cellStyle: {
          padding: "2px 8px",
          fontSize: MINI_FONT_SIZE_MAP[themeSettings.fontSize],
        },
      },
      // 미니 그리드 전용 설정
      suppressHorizontalScroll: true,
      suppressVerticalScroll: true,
      suppressRowClickSelection: true,
      suppressCellFocus: true,
      suppressMovableColumns: true,
      suppressMenuHide: true,
      suppressRowHoverHighlight: false,
      animateRows: false,

      // 페이지네이션 및 기타 기능 비활성화
      pagination: false,
      domLayout: "autoHeight",

      // 헤더 표시 여부
      suppressColumnMoveAnimation: true,
    }),
    [agGridTheme, heightSettings, showHeader, themeSettings.fontSize]
  );

  const gridKey = useMemo(() => {
    return `ag-grid-mini-${themeSettings.darkMode ? "dark" : "light"}-${
      themeSettings.fontSize
    }-${maxRows}`;
  }, [themeSettings.darkMode, themeSettings.fontSize, maxRows]);

  return (
    <AppPaper elevation={elevation} sx={{ overflow: "hidden", ...sx }}>
      <AppBox width="100%" height={gridHeight}>
        <AgGridReact
          key={gridKey}
          columnDefs={columnDefs}
          rowData={limitedRowData}
          gridOptions={miniGridOptions}
        />
      </AppBox>
    </AppPaper>
  );
};

export default AgGridMini;
