import { BoxProps } from "@mui/material";

export interface AppBoxProps extends BoxProps {
  padding?: number | string;
  children?: React.ReactNode;
}
