// src/components/Layout/PreferenceToggle.styles.ts
import { AppBox } from "@/components/common/Box";
import { Fab } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FabButton = styled(Fab)(({}) => ({
  position: "fixed",
  bottom: 24,
  right: 24,
  zIndex: 1000,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)",
  },
  "&:focus": {
    outline: "none",
  },
  "&:active": {
    boxShadow: "none",
  },
}));

export const DrawerContainer = styled(AppBox)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "0 !important", // AppBox의 기본 borderRadius 제거
}));

export const DrawerHeader = styled(AppBox)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

export const DrawerContent = styled(AppBox)(({ theme }) => ({
  flex: 1,
  overflow: "auto",
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
}));

export const DrawerFooter = styled(AppBox)(({ theme }) => ({
  padding: theme.spacing(3),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  display: "flex",
  gap: theme.spacing(2),
}));
