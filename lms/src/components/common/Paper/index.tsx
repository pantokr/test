import { Paper, PaperProps } from "@mui/material";
import React from "react";
import { AppBox } from "../Box";
import { Column } from "../Column";
import { Row } from "../Row";
import AppTypography from "../Typography";

export interface AppPaperProps extends PaperProps {
  width?: string | number;
  height?: string | number;
  elevation?: number;
  padding?: number | string;
  title?: string;
  titleVariant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2";
  children?: React.ReactNode;
}

// 스타일 상수들
const GRADIENT_BACKGROUND = "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)";

const titleBoxStyles = {
  textAlign: "left" as const,
  width: "100%",
};

const titleStyles = {
  fontWeight: "bold",
  background: GRADIENT_BACKGROUND,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  position: "relative" as const,
  pb: 1,
  "&::after": {
    content: '""',
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    width: "60px",
    height: "3px",
    background: GRADIENT_BACKGROUND,
    borderRadius: "2px",
  },
};

const getPaperStyles = (
  width?: string | number,
  height?: string | number,
  padding?: number | string,
  hasTitle?: boolean
) => ({
  height: height || undefined,
  width: width || undefined,
  p: padding,
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center" as const,
  justifyContent: hasTitle ? ("flex-start" as const) : ("center" as const),
});

export const AppPaper: React.FC<AppPaperProps> = ({
  elevation = 4,
  padding = 2,
  width,
  height,
  title,
  titleVariant = "h4",
  children,
  ...props
}) => {
  const hasTitle = Boolean(title);

  return (
    <Paper
      elevation={elevation}
      sx={{
        ...getPaperStyles(width, height, padding, hasTitle),
        ...props.sx,
      }}
      {...props}
    >
      <Column>
        <Row>
          <AppBox sx={titleBoxStyles}>
            {title && (
              <AppTypography
                variant={titleVariant}
                component="h2"
                sx={titleStyles}
              >
                {title}
              </AppTypography>
            )}
          </AppBox>
        </Row>
        <Row sx={{ height: height }}>{children}</Row>
      </Column>
    </Paper>
  );
};
