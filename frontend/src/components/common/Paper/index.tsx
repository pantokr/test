// AppPaperSimple.tsx
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
  children?: React.ReactNode;
}

const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) =>
    !["width", "height", "padding"].includes(prop as string),
})<{
  width?: string | number;
  height?: string | number;
  padding?: number | string;
}>(({ width, height, padding, theme }) => ({
  width,
  height,
  display: "flex",
  flexDirection: "column",
  padding: typeof padding === "number" ? theme.spacing(padding) : padding,
}));

export const AppPaper: React.FC<AppPaperProps> = ({
  width,
  height,
  padding = 2,
  elevation = 4,
  children,
  ...props
}) => {
  return (
    <StyledPaper
      width={width}
      height={height}
      padding={padding}
      elevation={elevation}
      {...props}
    >
      <Column spacing={1}>
        <Row sx={{ height: height }}>{children}</Row>
      </Column>
    </StyledPaper>
  );
};
