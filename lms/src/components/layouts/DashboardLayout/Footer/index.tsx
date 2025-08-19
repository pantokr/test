// src/layouts/DashboardLayout/Footer.tsx

import { Box, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { FooterProps } from "../types";

// 스타일드 컴포넌트 내부 정의 - fixed 제거
const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2, 3),
  // fixed 제거하고 일반 블록 요소로 변경
}));

const FooterContent = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  maxWidth: theme.breakpoints.values.xl,
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

const Footer: React.FC<FooterProps> = ({
  company = {
    href: "https://www.creative-tim.com",
    name: "Creative Tim",
  },
  links = [
    { href: "#", name: "회사 소개" },
    { href: "#", name: "블로그" },
    { href: "#", name: "라이센스" },
  ],
}) => {
  return (
    <FooterContainer>
      <FooterContent>
        {/* 저작권 정보 */}
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()}, made with ❤️ by{" "}
          <Link
            href={company.href}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            sx={{ textDecoration: "none" }}
          >
            {company.name}
          </Link>{" "}
          for a better web.
        </Typography>

        {/* 링크들 */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              color="text.secondary"
              variant="body2"
              sx={{
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {link.name}
            </Link>
          ))}
        </Box>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
