import { Paper, PaperProps } from "@mui/material";
import React from "react";

export interface AppPaperProps extends PaperProps {
  elevation?: number;
  padding?: number | string;
  children?: React.ReactNode;
}

export const AppPaper: React.FC<AppPaperProps> = ({
  elevation = 1,
  padding = 1,
  children,
  ...props
}) => {
  return (
    <Paper
      elevation={elevation}
      sx={{
        height: "100%",
        p: padding,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
};
