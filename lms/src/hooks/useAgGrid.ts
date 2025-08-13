// src/hooks/useAgGrid.ts

import { useState, useEffect, useMemo, useRef } from "react";
import type { GridApi, ColDef } from "ag-grid-community";
import { useMediaQuery, useTheme } from "@mui/material";

import { useMaterialUIController } from "@/context";
import type { UseAgGridThemeReturn } from "@/types/agGrid";

/**
 * AG-Grid 테마 관리 훅
 */
export const useAgGridTheme = (): UseAgGridThemeReturn => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  useEffect(() => {
    document.body.dataset.agThemeMode = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  return {
    theme: darkMode ? "ag-theme-balham-dark" : "ag-theme-balham",
    className: darkMode ? "ag-theme-balham-dark" : "ag-theme-balham",
  };
};

/**
 * AG-Grid 반응형 관리 훅
 */
export const useAgGridResponsive = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return {
    isMobile,
    isTablet,
    // 모바일에서는 페이지네이션 비활성화
    shouldUsePagination: !isMobile,
    // 반응형 컬럼 너비
    getResponsiveMinWidth: (baseWidth: number) => {
      if (isMobile) return Math.min(baseWidth, 120);
      if (isTablet) return Math.min(baseWidth, 150);
      return baseWidth;
    },
  };
};

/**
 * AG-Grid API 관리 훅
 */
export const useAgGridApi = () => {
  const gridRef = useRef<{ api: GridApi | null }>({ api: null });

  const exportToCsv = (fileName: string = "export") => {
    if (gridRef.current?.api) {
      gridRef.current.api.exportDataAsCsv({
        fileName: `${fileName}_${new Date().toISOString().split("T")[0]}.csv`,
      });
    }
  };

  const exportToExcel = (fileName: string = "export") => {
    if (gridRef.current?.api) {
      // Excel export는 Enterprise 버전에서만 가능
      console.warn("Excel export requires AG-Grid Enterprise license");
      // CSV로 대체
      exportToCsv(fileName);
    }
  };

  const refreshGrid = () => {
    if (gridRef.current?.api) {
      gridRef.current.api.refreshCells();
    }
  };

  const getSelectedRows = () => {
    if (gridRef.current?.api) {
      return gridRef.current.api.getSelectedRows();
    }
    return [];
  };

  const setGridRef = (ref: any) => {
    gridRef.current = ref;
  };

  return {
    gridRef,
    setGridRef,
    exportToCsv,
    exportToExcel,
    refreshGrid,
    getSelectedRows,
  };
};

/**
 * AG-Grid 기본 설정 훅
 */
export const useAgGridDefaults = () => {
  const defaultColDef = useMemo(
    (): ColDef => ({
      resizable: true,
      sortable: true,
      filter: true,
      minWidth: 100,
      flex: 1,
    }),
    []
  );

  const overlayNoRowsTemplate =
    '<div class="ag-overlay-panel"><div class="ag-overlay-wrapper ag-overlay-no-rows-wrapper"><span class="ag-overlay-no-rows-center">데이터가 없습니다.</span></div></div>';

  return {
    defaultColDef,
    overlayNoRowsTemplate,
  };
};
