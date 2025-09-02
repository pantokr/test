// AppPaper.tsx
import { Paper, PaperProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { Column } from "../Column";
import { Row } from "../Row";

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
  titleGradient?: boolean; // title gradient 여부
}

const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) =>
    !["width", "height", "padding", "hasTitle"].includes(prop as string),
})<{
  width?: string | number;
  height?: string | number;
  padding?: number | string;
  hasTitle?: boolean;
}>(({ width, height, padding, hasTitle, theme }) => ({
  width,
  height,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: hasTitle ? "flex-start" : "center",
  padding: typeof padding === "number" ? theme.spacing(padding) : padding,
}));

const TitleBox = styled("div")({
  textAlign: "left",
  width: "100%",
});

// AppTypography를 styled로 분리
interface StyledTypographyProps {
  gradient?: boolean;
  baseColor?: string;
}

const StyledTypography = styled("h2")<StyledTypographyProps>(
  ({ gradient = false, baseColor, theme }) => ({
    fontWeight: "bold",
    position: "relative",
    paddingBottom: "4px",
    ...(gradient
      ? {
          background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }
      : {
          color: baseColor || theme.palette.primary.main,
        }),
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "60px",
      height: "3px",
      borderRadius: "2px",
      background: gradient
        ? "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)"
        : baseColor || theme.palette.primary.main,
    },
  })
);

export const AppPaper: React.FC<AppPaperProps> = ({
  elevation = 4,
  padding = 2,
  width,
  height,
  title,
  titleVariant = "h4",
  children,
  titleGradient = false,
  ...props
}) => {
  const hasTitle = Boolean(title);

  return (
    <StyledPaper
      elevation={elevation}
      width={width}
      height={height}
      padding={padding}
      hasTitle={hasTitle}
      {...props}
    >
      <Column spacing={1}>
        {title && (
          <Row>
            <TitleBox>
              <StyledTypography gradient={titleGradient}>
                {title}
              </StyledTypography>
            </TitleBox>
          </Row>
        )}
        <Row sx={{ height: height }}>{children}</Row>
      </Column>
    </StyledPaper>
  );
};
