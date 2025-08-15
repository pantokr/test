import { Box, styled } from "@mui/material";

export const StyledGridContainer = styled(Box)(({ theme }) => ({
    '& .ag-theme-alpine': {
        '--ag-header-background-color': theme.palette.grey[50],
        '--ag-header-foreground-color': theme.palette.text.primary,
        '--ag-border-color': theme.palette.divider,
        '--ag-row-hover-color': theme.palette.action.hover,
        '--ag-selected-row-background-color': theme.palette.action.selected,
        fontFamily: theme.typography.fontFamily,
    }
}));