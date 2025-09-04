// AppCard.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardProps,
  styled,
} from "@mui/material";
import React from "react";

// Props 정의
export interface AppCardHeaderProps extends CardProps {
  width: string | number;
  height: string | number;
  padding?: number | string;
  title?: string;
  children?: React.ReactNode;
}

// gradient용 Typography
const GradientTitle = styled("h3")<{}>(({ theme }) => ({
  fontWeight: "bold",
  margin: 0,
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 50%, ${theme.palette.primary.main} 100%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));

export const AppCard: React.FC<AppCardHeaderProps> = ({
  title,
  width,
  height,
  padding = 2,
  children,
  elevation = 4,
  ...props
}) => {
  return (
    <Card
      elevation={elevation}
      sx={{
        width,
        height,
        display: "flex",
        flexDirection: "column",
      }}
      {...props}
    >
      {title && (
        <CardHeader
          title={<GradientTitle>{title}</GradientTitle>}
          sx={{
            pb: 0,
            "& .MuiCardHeader-content": { alignItems: "center" },
          }}
        />
      )}
      <CardContent sx={{ flex: 1, p: padding }}>{children}</CardContent>
    </Card>
  );
};
