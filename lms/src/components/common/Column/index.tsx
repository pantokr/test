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
  /**
   * 자식 요소들이 전체 너비를 차지하도록 설정
   */
  fullWidth?: boolean;
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
  crossAxisAlignment = "stretch",
  mainAxisSize = "max",
  fullWidth = false,
  sx,
  ...props
}) => {
  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{
        backgroundColor: "transparent",
        justifyContent: mapMainAxisAlignment(mainAxisAlignment),
        alignItems: mapCrossAxisAlignment(crossAxisAlignment),
        height: mainAxisSize === "min" ? "auto" : "100%",
        width: "100%",
        // 자식 요소들에 전체 너비 적용
        ...(fullWidth && {
          "& > *": {
            width: "100% !important",
          },
        }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Stack>
  );
};
