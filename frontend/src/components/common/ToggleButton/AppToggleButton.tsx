// components/common/AppToggleButton.tsx
import { ToggleButton, ToggleButtonProps } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import React from "react";

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  border: "none !important", // ✅ 모든 상태에서 테두리 제거
  borderRadius: parseFloat(theme.shape.borderRadius as string) * 2,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),

  padding: theme.spacing(1.2, 2),
  textTransform: "none",
  "&.Mui-selected": {
    border: "none !important", // ✅ 선택 상태에서도 강제로 제거
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const AppToggleButton: React.FC<ToggleButtonProps> = (props) => {
  return <StyledToggleButton {...props} />;
};

export default AppToggleButton;
