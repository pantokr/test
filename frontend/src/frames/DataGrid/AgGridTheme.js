import { themeQuartz } from "ag-grid-community";
import { useMemo } from "react";

export default function agGridTheme(colors) {
  const myTheme = useMemo(() => {
    return themeQuartz
      .withParams(
        {
          wrapperBorder: true,
          headerRowBorder: true,
          rowBorder: { style: "solid", width: 2, color: colors.grey[300] },
          columnBorder: { style: "solid", width: 1, color: colors.grey[300] },
          backgroundColor: colors.background.card,
          foregroundColor: colors.text.main,
          browserColorScheme: "light",
        },
        "light-mode"
      )
      .withParams(
        {
          wrapperBorder: true,
          headerRowBorder: true,
          rowBorder: { style: "solid", width: 2, color: colors.grey[700] },
          columnBorder: { style: "solid", width: 1, color: colors.grey[700] },
          backgroundColor: colors.background.card,
          foregroundColor: colors.text.main,
          browserColorScheme: "dark",
        },
        "dark-mode"
      );
  }, [colors]);

  return myTheme;
}
