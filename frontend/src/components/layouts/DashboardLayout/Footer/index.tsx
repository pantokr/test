// src/layouts/DashboardLayout/Footer.tsx

import { AppBox } from "@/components/common/Box";
import AppTypography from "@/components/common/Typography";
import { styled } from "@mui/material/styles";
import React from "react";
import { FooterProps } from "../types";

// 스타일드 컴포넌트 내부 정의 - fixed 제거
const FooterContainer = styled(AppBox)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  width: "100%",
  padding: theme.spacing(1),
  // fixed 제거하고 일반 블록 요소로 변경
}));

const FooterContent = styled(AppBox)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "0 auto",
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 0,

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: theme.spacing(1),
    textAlign: "center",
  },
}));

const Footer: React.FC<FooterProps> = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <AppTypography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()}{" "}
          <AppTypography component="span" fontWeight={"bold"}>
            Mirae Credit
          </AppTypography>
          . All rights reserved.
        </AppTypography>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
