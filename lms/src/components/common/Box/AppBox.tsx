import { Box } from "@mui/material";
import React from "react";
import { AppBoxProps } from "./types";

export const AppBox: React.FC<AppBoxProps> = ({
  padding = 0.25,
  children,
  ...props
}) => {
  return (
    <Box p={padding} {...props}>
      {children}
    </Box>
  );
};
