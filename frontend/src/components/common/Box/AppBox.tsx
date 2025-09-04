import { Box } from "@mui/material";
import React from "react";
import { AppBoxProps } from "./types";

export const AppBox: React.FC<AppBoxProps> = ({
  padding = 0,
  children,
  ...props
}) => {
  return (
    <Box p={padding} sx={{ backgroundColor: "transparent" }} {...props}>
      {children}
    </Box>
  );
};
