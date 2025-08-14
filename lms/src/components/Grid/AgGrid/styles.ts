// components/Grid/AgGrid/styles.ts
import { SxProps, Theme } from "@mui/material";

export const paperStyles: SxProps<Theme> = {
  p: 2,
  width: "100%",
  height: "100%",
  maxHeight: "100%",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: "0",
  overflow: "hidden",
  alignContent: "center",
  justifyContent: "center",
};

export const loadingStyles: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  flex: 1,
};

export const titleStyles: SxProps<Theme> = {
  flexShrink: 0,
};

export const errorStyles: SxProps<Theme> = {
  mb: 2,
  flexShrink: 0,
};

export const emptyStateStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  height: "100%",
};

export const getGridContainerStyles = (dataLength: number): SxProps<Theme> => ({
  width: "100%",
  minHeight: 0,
  flex: 1,
  // AG-Grid 컨테이너 스타일
  "& .ag-theme-alpine": {
    height: dataLength <= 10 ? "auto" : "100%",
    minHeight: dataLength <= 10 ? "auto" : "400px",
    fontSize: "14px",
  },
  // 페이지네이션을 상단으로 이동
  "& .ag-paging-panel": {
    order: -1,
    borderTop: "none",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    minHeight: "52px",
    backgroundColor: "rgba(0, 0, 0, 0.02)",
  },
  "& .ag-root-wrapper": {
    display: "flex",
    flexDirection: "column",
  },
  "& .ag-root": {
    display: "flex",
    flexDirection: "column",
  },
  "& .ag-body-viewport": {
    order: 1,
    flex: 1,
  },
  // 헤더 스타일 (MUI와 유사하게)
  "& .ag-header": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    borderBottom: "2px solid rgba(224, 224, 224, 1)",
  },
  "& .ag-header-cell": {
    borderRight: "1px solid rgba(224, 224, 224, 1)",
    padding: "4px 8px",
  },
  // 셀 스타일
  "& .ag-cell": {
    borderRight: "1px solid rgba(224, 224, 224, 1)",
    padding: "4px 8px",
    display: "flex",
    alignItems: "center",
  },
  // 행 호버 효과
  "& .ag-row:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04) !important",
  },
  // 페이지네이션 스타일
  "& .ag-paging-page-summary-panel": {
    order: 1,
  },
  "& .ag-paging-button": {
    padding: "4px 8px",
    margin: "0 2px",
  },
});
