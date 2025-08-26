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
  /**
   * 자식 요소들이 전체 높이를 차지하도록 설정
   */
  fullHeight?: boolean;
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
  crossAxisAlignment = "center", // Row는 center가 더 자연스러움
  mainAxisSize = "max",
  fullHeight = false,
  sx,
  ...props
}) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        backgroundColor: "transparent",
        justifyContent: mapMainAxisAlignment(mainAxisAlignment),
        alignItems: mapCrossAxisAlignment(crossAxisAlignment),
        width: mainAxisSize === "min" ? "auto" : "100%",
        height: "auto",
        py: 1,
        // 자식 요소들에 전체 높이 적용
        ...(fullHeight && {
          "& > *": {
            height: "100% !important",
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
