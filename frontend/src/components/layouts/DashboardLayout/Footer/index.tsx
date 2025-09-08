// src/layouts/DashboardLayout/Footer.tsx

import AppTypography from "@/components/common/Typography";
import React from "react";
import { FooterProps } from "../types";
import { FooterContainer, FooterContent } from "./styles";

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
