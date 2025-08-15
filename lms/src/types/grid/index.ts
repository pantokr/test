// types/grid.types.ts

import { GridColDef } from "@mui/x-data-grid";
import { ColDef, GridOptions } from "ag-grid-community";

export interface BaseGridData {
  id: number | string;
  [key: string]: any;
}