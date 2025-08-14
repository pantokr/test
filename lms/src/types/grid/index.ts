// types/grid.types.ts

import { GridColDef } from "@mui/x-data-grid";
import { ColDef, GridOptions } from "ag-grid-community";

export interface BaseGridData {
  id: number | string;
  [key: string]: any;
}

export interface AgDataGridProps {
  columnDefs: ColDef[];
  data: BaseGridData[];
  title?: string;
  loading?: boolean;
  error?: string;
  height?: number;
  pageSize?: number;
  showRowCount?: boolean;
  enableCheckbox?: boolean;
  enablePagination?: boolean;
  gridOptions?: GridOptions;
}

export interface MuiGridColumn {
  field: string;
  headerName: string;
  width?: number;
  type?: "string" | "number" | "date" | "dateTime" | "boolean" | "singleSelect";
  sortable?: boolean;
  filterable?: boolean;
  hide?: boolean;
  flex?: number;
}

export interface MuiDataGridProps {
  columnDefs: GridColDef[];
  data: BaseGridData[];
  title?: string;
  loading?: boolean;
  error?: string;
  height?: number;
  pageSize?: number;
  showRowCount?: boolean;
  enableCheckbox?: boolean;
  enablePagination?: boolean;
}
