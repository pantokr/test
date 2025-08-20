// src/components/Layout/PreferenceToggle/PreferenceToggle.tsx
import { Settings as SettingsIcon } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React, { useState } from "react";

import { useThemeSettings } from "@/context";
import { PreferenceDrawer } from "./PreferenceDrawer";
import { FabButton } from "./styles";

const PreferenceToggle: React.FC = () => {
  const { themeSettings } = useThemeSettings();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Tooltip title="설정 열기" placement="left">
        <FabButton
          color="primary"
          size="medium"
          onClick={handleOpen}
          aria-label="설정 열기"
          sx={{
            boxShadow: themeSettings.darkMode
              ? "0 8px 16px rgba(255, 255, 255, 0.1)"
              : "0 8px 16px rgba(0, 0, 0, 0.15)",
          }}
        >
          <SettingsIcon />
        </FabButton>
      </Tooltip>

      <PreferenceDrawer open={open} onClose={handleClose} />
    </>
  );
};

export default PreferenceToggle;
