// components/dataGrid/QuickFilterInput.tsx
import { AppTextField } from "@/components/common";
import type { GridApi } from "ag-grid-community";
import React from "react";

interface QuickFilterInputProps {
  gridApiRef: React.MutableRefObject<GridApi | null>;
}

const QuickFilterInput: React.FC<QuickFilterInputProps> = ({ gridApiRef }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    gridApiRef.current?.setGridOption("quickFilterText", e.target.value);
  };

  return (
    <AppTextField
      label="빠른 검색 (Quick Filter)"
      variant="standard"
      size="small"
      onChange={handleChange}
      sx={{ width: 300 }}
    />
  );
};

export default QuickFilterInput;
