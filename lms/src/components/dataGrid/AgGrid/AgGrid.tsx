// AgGrid.tsx
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

interface AgGridProps {
  columnDefs: ColDef[];
  rowData: any[];
  gridOptions?: GridOptions;
  elevation?: number;
  sx?: object;
}

// fontSize에 따른 설정 매핑
const FONT_SIZE_MAP = {
  small: "12px",
  medium: "14px",
  large: "16px",
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
  gridOptions = {},
}) => {
  const { themeSettings } = useThemeSettings();
  // userSettings.fontSize에 따라 행/헤더 높이 계산
  const heightSettings = useMemo(() => {
    return ROW_HEIGHT_CONFIG[themeSettings.fontSize];
  }, [themeSettings.fontSize]);

  const agGridTheme = useMemo(() => {
    return getAgGridTheme(themeSettings);
  }, [themeSettings]);

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
      pagination: true,
      paginationPageSize: 50,
      paginationPageSizeSelector: [25, 50, 100],
      animateRows: true,
      suppressCellFocus: true,
      ...gridOptions,
    }),
    [agGridTheme, heightSettings, gridOptions]
  );

  const gridKey = useMemo(() => {
    return `ag-grid-${themeSettings.darkMode ? "dark" : "light"}-${
      themeSettings.fontSize
    }`;
  }, [themeSettings.darkMode, themeSettings.fontSize]);

  return (
    <AppBox width={"100%"} height={"100%"}>
      <AgGridReact
        key={gridKey}
        columnDefs={columnDefs}
        rowData={rowData}
        gridOptions={defaultGridOptions}
      />
    </AppBox>
  );
};

export default AgGrid;
