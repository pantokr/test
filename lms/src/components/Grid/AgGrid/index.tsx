import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, ColDef, GridOptions } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { styled } from '@mui/material/styles';

ModuleRegistry.registerModules([AllCommunityModule]); import { Box, Paper } from '@mui/material';
import { StyledGridContainer } from './styles';

interface AgGridProps {
  columnDefs: ColDef[];
  rowData: any[];
  height?: string | number;
  width?: string | number;
  gridOptions?: GridOptions;
  elevation?: number;
  sx?: object;
}

const AgGrid: React.FC<AgGridProps> = ({
  columnDefs,
  rowData,
  height = 400,
  width = '100%',
  gridOptions = {},
  elevation = 1,
  sx = {},
}) => {
  const defaultGridOptions: GridOptions = {
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
    },
    pagination: true,
    paginationPageSize: 20,
    animateRows: true,
    suppressCellFocus: true,
    theme: 'legacy', // v32 스타일 테마 사용
    ...gridOptions,
  };

  return (
    <Paper elevation={elevation} sx={sx}>
      <StyledGridContainer>
        <Box
          className="ag-theme-alpine"
          sx={{
            height: typeof height === 'number' ? `${height}px` : height,
            width: typeof width === 'number' ? `${width}px` : width,
          }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            gridOptions={defaultGridOptions}
          />
        </Box>
      </StyledGridContainer>
    </Paper>
  );
};

export default AgGrid;