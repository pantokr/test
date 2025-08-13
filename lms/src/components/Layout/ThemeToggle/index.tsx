// src/components/Layout/ThemeToggle.tsx

import React from "react";
import { Fab, Tooltip } from "@mui/material";
import {
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";

import { useMaterialUIController, setDarkMode } from "@/context";

const ThemeToggle: React.FC = () => {
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;

  const handleToggle = () => {
    setDarkMode(dispatch, !darkMode);
  };

  return (
    <Tooltip
      title={darkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
      placement="left"
    >
      <Fab
        color="primary"
        size="medium"
        onClick={handleToggle}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)",
          },
          boxShadow: darkMode
            ? "0 8px 16px rgba(255, 255, 255, 0.1)"
            : "0 8px 16px rgba(0, 0, 0, 0.15)",
        }}
        aria-label={darkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
      >
        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </Fab>
    </Tooltip>
  );
};

export default ThemeToggle;
