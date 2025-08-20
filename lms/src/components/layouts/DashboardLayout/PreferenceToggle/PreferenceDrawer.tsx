// src/components/Layout/PreferenceToggle/PreferenceDrawer.tsx
import {
  Close as CloseIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Menu as MenuIcon,
  Palette as PaletteIcon,
  RestartAlt as RestartAltIcon,
  TextFields as TextFieldsIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";

import { Column } from "@/components/common";
import AppDrawer from "@/components/common/Drawer";
import { useDevice, useSidenav, useThemeSettings } from "@/context";
import { DrawerContent, DrawerFooter, DrawerHeader } from "./styles";

interface PreferenceDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const PreferenceDrawer: React.FC<PreferenceDrawerProps> = ({
  open,
  onClose,
}) => {
  const {
    themeSettings,
    toggleDarkMode,
    resetThemeSettings,
    updateThemeSettings,
  } = useThemeSettings();

  const { isMobile } = useDevice();
  const { setSidenavPinned, isSidenavPinned } = useSidenav();

  const handleReset = () => resetThemeSettings();

  const drawerWidth = isMobile ? "100%" : 400;

  return (
    <AppDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: drawerWidth,
            maxWidth: drawerWidth,
            backgroundColor: "background.default",
            backgroundImage: "none",
          },
        },
      }}
      variant="temporary"
    >
      <Column crossAxisAlignment="stretch">
        {/* 헤더 */}
        <DrawerHeader>
          <Typography variant="h5" component="div" fontWeight="medium">
            환경 설정
          </Typography>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: "text.secondary",
              "&:hover": { backgroundColor: "action.hover" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DrawerHeader>

        {/* 콘텐츠 */}
        <DrawerContent>
          {/* 다크 모드 */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              {themeSettings.darkMode ? (
                <DarkModeIcon sx={{ mr: 1, color: "primary.main" }} />
              ) : (
                <LightModeIcon sx={{ mr: 1, color: "primary.main" }} />
              )}
              <Typography variant="h6" fontWeight="medium">
                테마
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={themeSettings.darkMode}
                  onChange={toggleDarkMode}
                  color="primary"
                />
              }
              label={
                <Box>
                  <Typography variant="body1">다크 모드</Typography>
                  <Typography variant="body2" color="text.secondary">
                    어두운 테마를 사용합니다
                  </Typography>
                </Box>
              }
              sx={{ ml: 0, width: "100%" }}
            />
          </Box>

          {/* 색상 스키마 */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <PaletteIcon sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="h6">색상 스키마</Typography>
            </Box>
            <FormControl fullWidth>
              <InputLabel>색상 테마</InputLabel>
              <Select
                value={themeSettings.colorScheme}
                label="색상 테마"
                onChange={(e) =>
                  updateThemeSettings({
                    colorScheme: e.target.value as any,
                  })
                }
              >
                <MenuItem value="blueGrey">블랙</MenuItem>
                <MenuItem value="blue">블루</MenuItem>
                <MenuItem value="green">그린</MenuItem>
                <MenuItem value="deepPurple">퍼플</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* 폰트 */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <TextFieldsIcon sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="h6" fontWeight="medium">
                텍스트
              </Typography>
            </Box>
            <FormControl fullWidth>
              <InputLabel>폰트 크기</InputLabel>
              <Select
                value={themeSettings.fontSize}
                label="폰트 크기"
                onChange={(e) =>
                  updateThemeSettings({ fontSize: e.target.value as any })
                }
              >
                <MenuItem value="small">작게</MenuItem>
                <MenuItem value="medium">보통</MenuItem>
                <MenuItem value="large">크게</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* 사이드바 설정 - 데스크톱에서만 표시 */}
          {!isMobile && (
            <>
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <MenuIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="h6" fontWeight="medium">
                    사이드바
                  </Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isSidenavPinned}
                      onChange={(e) => setSidenavPinned(e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1">사이드바 고정</Typography>
                      <Typography variant="body2" color="text.secondary">
                        사이드바를 항상 표시합니다
                      </Typography>
                    </Box>
                  }
                  sx={{ ml: 0, width: "100%" }}
                />
              </Box>
            </>
          )}
        </DrawerContent>

        {/* 하단 버튼 */}
        <DrawerFooter flexDirection={isMobile ? "column" : "row"}>
          <Button
            onClick={handleReset}
            color="secondary"
            variant="outlined"
            startIcon={<RestartAltIcon />}
            fullWidth={isMobile}
            sx={{ flex: isMobile ? undefined : 1 }}
          >
            초기화
          </Button>
          <Button
            onClick={onClose}
            color="primary"
            variant="contained"
            fullWidth={isMobile}
            sx={{ flex: isMobile ? undefined : 1 }}
          >
            확인
          </Button>
        </DrawerFooter>
      </Column>
    </AppDrawer>
  );
};
