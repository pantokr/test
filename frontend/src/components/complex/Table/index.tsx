import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

export interface AppTableColumn<T = any> {
  key: string; // 데이터 키
  label: string; // 헤더 텍스트
  align?: "left" | "center" | "right";
  width?: number | string;
  render?: (row: T) => React.ReactNode; // ⚡ 템플릿 렌더링
}

interface AppTableProps<T extends Record<string, any> = any> {
  columns: AppTableColumn<T>[];
  data: T[];
  sx?: any;
}

export const AppTable = <T extends Record<string, any>>({
  columns,
  data,
  sx,
}: AppTableProps<T>) => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: "100%", ...sx }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                align={col.align || "left"}
                sx={{ width: col.width }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} hover>
              {columns.map((col) => (
                <TableCell key={col.key} align={col.align || "left"}>
                  {col.render ? col.render(row) : row[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
