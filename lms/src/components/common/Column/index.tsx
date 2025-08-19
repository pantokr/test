// src/components/common/Column/Column.tsx
import { Stack, StackProps } from "@mui/material";
import React from "react";

export type MainAxisAlignment =
  | "start"
  | "end"
  | "center"
  | "spaceBetween"
  | "spaceAround"
  | "spaceEvenly";

export type CrossAxisAlignment = "start" | "end" | "center" | "stretch";

export type MainAxisSize = "min" | "max";

interface ColumnProps
  extends Omit<
    StackProps,
    "direction" | "spacing" | "justifyContent" | "alignItems"
  > {
  children?: React.ReactNode;
  mainAxisAlignment?: MainAxisAlignment;
  crossAxisAlignment?: CrossAxisAlignment;
  mainAxisSize?: MainAxisSize;
  gap?: number | string;
  verticalPadding?: number | string;
}

const mapMainAxisAlignment = (alignment: MainAxisAlignment) => {
  switch (alignment) {
    case "start":
      return "flex-start";
    case "end":
      return "flex-end";
    case "center":
      return "center";
    case "spaceBetween":
      return "space-between";
    case "spaceAround":
      return "space-around";
    case "spaceEvenly":
      return "space-evenly";
    default:
      return "flex-start";
  }
};

const mapCrossAxisAlignment = (alignment: CrossAxisAlignment) => {
  switch (alignment) {
    case "start":
      return "flex-start";
    case "end":
      return "flex-end";
    case "center":
      return "center";
    case "stretch":
      return "stretch";
    default:
      return "flex-start";
  }
};

export const Column: React.FC<ColumnProps> = ({
  children,
  mainAxisAlignment = "start",
  crossAxisAlignment = "start",
  mainAxisSize = "max",
  gap = 1,
  verticalPadding = 1,
  sx,
  ...props
}) => {
  return (
    <Stack
      direction="column"
      spacing={gap}
      sx={{
        justifyContent: mapMainAxisAlignment(mainAxisAlignment),
        alignItems: mapCrossAxisAlignment(crossAxisAlignment),
        height: mainAxisSize === "min" ? "auto" : "100%",
        width: "100%",
        py: verticalPadding,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Stack>
  );
};
