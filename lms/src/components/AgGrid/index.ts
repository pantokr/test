// src/components/AgGrid/index.ts

export { default } from "./AgGridTable";
export { default as AgGridTable } from "./AgGridTable";
export { default as AgGridToolbar } from "./AgGridToolbar";

// Re-export hooks for convenience
export {
  useAgGridTheme,
  useAgGridResponsive,
  useAgGridApi,
  useAgGridDefaults,
} from "@/hooks/useAgGrid";

// Re-export types
export type {
  AgGridTableProps,
  AgGridColumn,
  UseAgGridThemeReturn,
} from "@/types/agGrid";
