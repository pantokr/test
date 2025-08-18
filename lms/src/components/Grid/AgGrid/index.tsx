// AgGrid.tsx
import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  AllCommunityModule,
  ColDef,
  GridOptions,
  themeBalham,
  colorSchemeDark,
} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);
import { Box, Paper } from "@mui/material";
import { useUserSettings } from "@/context";
import { UserSettings } from "@/types";

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
const getAgGridTheme = (isDark: boolean, settings: UserSettings) => {
  const actualFontSize = FONT_SIZE_MAP[settings.fontSize];

  const myTheme = themeBalham.withParams({
    borderColor: "rgba(128, 128, 128, 0.3)",
    wrapperBorder: false,
    headerRowBorder: false,
    rowBorder: { style: "solid", width: 1 },
    columnBorder: { style: "solid" },
    fontSize: actualFontSize,
  });

  return isDark ? myTheme.withPart(colorSchemeDark) : myTheme;
};

const AgGrid: React.FC<AgGridProps> = ({
  columnDefs,
  rowData,
  gridOptions = {},
  elevation = 1,
  sx = { height: "100%", padding: 1 },
}) => {
  const { userSettings } = useUserSettings();

  // userSettings.fontSize에 따라 행/헤더 높이 계산
  const heightSettings = useMemo(() => {
    return ROW_HEIGHT_CONFIG[userSettings.fontSize];
  }, [userSettings.fontSize]);

  const agGridTheme = useMemo(() => {
    return getAgGridTheme(userSettings.darkMode, userSettings);
  }, [userSettings.darkMode, userSettings]);

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
    return `ag-grid-${userSettings.darkMode ? "dark" : "light"}-${
      userSettings.fontSize
    }`;
  }, [userSettings.darkMode, userSettings.fontSize]);

  return (
    <Paper elevation={elevation} sx={sx}>
      <Box width={"100%"} height={"100%"}>
        <AgGridReact
          key={gridKey}
          columnDefs={columnDefs}
          rowData={rowData}
          gridOptions={defaultGridOptions}
        />
      </Box>
    </Paper>
  );
};

export default AgGrid;
