import { AppButton } from "@/components/common";
import { Close } from "@mui/icons-material";
import { ColDef } from "ag-grid-community";
import React from "react";

interface FilterButtonsProps {
  filterModel: Record<string, any>;
  columnDefs: ColDef[];
  onClearColumnFilter: (colId: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  filterModel,
  columnDefs,
  onClearColumnFilter,
}) => {
  // field -> headerName 맵 생성
  const fieldToHeader = columnDefs.reduce<Record<string, string>>(
    (acc, col) => {
      if (col.field && col.headerName) {
        acc[col.field] = col.headerName;
      }
      return acc;
    },
    {}
  );

  return (
    <>
      {Object.keys(filterModel).map((colId) => (
        <AppButton
          key={colId}
          onClick={() => onClearColumnFilter(colId)}
          variantType="transparent"
          size="small"
          sx={{ mr: 1, mb: 1 }}
        >
          {fieldToHeader[colId] || colId} <Close fontSize="small" />
        </AppButton>
      ))}
    </>
  );
};

export default FilterButtons;
