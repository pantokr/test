// src/layouts/CoverLayout/index.tsx

import { alpha } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

// 배경 이미지 import
import bgSignIn from "@/assets/images/bg_sign_in.jpg";
import { AppBox } from "@/components/common/Box";

interface CoverLayoutProps {
  children: React.ReactNode;
  image?: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

const CoverContainer = styled(AppBox, {
  shouldForwardProp: (prop) => prop !== "backgroundImage",
})<{ backgroundImage?: string }>(({ theme, backgroundImage }) => ({
  minHeight: "100vh",
  minWidth: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",

  // 모바일에서 fixed 문제 해결
  [theme.breakpoints.down("md")]: {
    backgroundAttachment: "scroll",
  },
}));

const Overlay = styled(AppBox)<{ opacity: number }>(({ theme, opacity }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: alpha(theme.palette.common.black, opacity),
  zIndex: 1,
}));

const ContentWrapper = styled(AppBox)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  padding: theme.spacing(3),

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const CoverLayout: React.FC<CoverLayoutProps> = ({
  children,
  overlay = true,
  overlayOpacity = 0.3,
}) => {
  return (
    <CoverContainer backgroundImage={bgSignIn}>
      {/* 오버레이 */}
      {overlay && <Overlay opacity={overlayOpacity} />}

      {/* 컨텐츠 */}
      <ContentWrapper maxWidth="sm">{children}</ContentWrapper>
    </CoverContainer>
  );
};

export default CoverLayout;
