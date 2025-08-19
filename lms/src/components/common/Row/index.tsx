// src/components/common/Row/Row.tsx
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

interface RowProps
  extends Omit<
    StackProps,
    "direction" | "spacing" | "justifyContent" | "alignItems"
  > {
  children?: React.ReactNode;
  mainAxisAlignment?: MainAxisAlignment;
  crossAxisAlignment?: CrossAxisAlignment;
  mainAxisSize?: MainAxisSize;
  gap?: number | string;
  horizontalPadding?: number | string;
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

export const Row: React.FC<RowProps> = ({
  children,
  mainAxisAlignment = "start",
  crossAxisAlignment = "start",
  mainAxisSize = "max",
  gap = 1,
  horizontalPadding = 1,
  sx,
  ...props
}) => {
  return (
    <Stack
      direction="row"
      spacing={gap}
      sx={{
        justifyContent: mapMainAxisAlignment(mainAxisAlignment),
        alignItems: mapCrossAxisAlignment(crossAxisAlignment),
        width: mainAxisSize === "min" ? "auto" : "100%",
        height: "auto",
        px: horizontalPadding,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Stack>
  );
};
