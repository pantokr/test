// src/components/Layout/PreferenceToggle.tsx - Drawer 버전
import React, { useState } from "react";
import {
  Fab,
  Tooltip,
  Drawer,
  Box,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  Close as CloseIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Palette as PaletteIcon,
  TextFields as TextFieldsIcon,
  RestartAlt as RestartAltIcon,
} from "@mui/icons-material";

import { useUserSettings } from "@/context/theme";

const PreferenceToggle: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    isDark,
    toggleDarkMode,
    userSettings,
    updateUserSettings,
    resetUserSettings,
  } = useUserSettings();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReset = () => {
    resetUserSettings();
  };

  const drawerWidth = isMobile ? "100%" : 400;

  return (
    <>
      <Tooltip title="설정 열기" placement="left">
        <Fab
          color="primary"
          size="medium"
          onClick={handleOpen}
          disableRipple
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1000,
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
            },
            "&:focus": {
              outline: "none",
            },
            "&:active": {
              boxShadow: "none",
            },
            boxShadow: isDark
              ? "0 8px 16px rgba(255, 255, 255, 0.1)"
              : "0 8px 16px rgba(0, 0, 0, 0.15)",
          }}
          aria-label="설정 열기"
        >
          <SettingsIcon />
        </Fab>
      </Tooltip>

      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: drawerWidth,
            maxWidth: drawerWidth,
            height: "100%",
            backgroundColor: "background.default",
            backgroundImage: "none", // Material-UI의 기본 그라데이션 제거
          },
        }}
        // 모바일에서는 전체 화면 모달로
        variant={isMobile ? "temporary" : "temporary"}
        ModalProps={{
          keepMounted: true, // 성능 최적화
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* 헤더 */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 3,
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "background.paper",
            }}
          >
            <Typography variant="h5" component="div" fontWeight="medium">
              환경 설정
            </Typography>
            <IconButton
              onClick={handleClose}
              size="small"
              sx={{
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* 콘텐츠 영역 */}
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              p: 3,
            }}
          >
            {/* 다크 모드 설정 */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                {isDark ? (
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
                    checked={isDark}
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
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PaletteIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">색상 스키마</Typography>
              </Box>
              <FormControl fullWidth>
                <InputLabel>색상 테마</InputLabel>
                <Select
                  value={userSettings.colorScheme}
                  label="색상 테마"
                  onChange={(e) =>
                    updateUserSettings({ colorScheme: e.target.value as any })
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

            {/* 폰트 설정 */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TextFieldsIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6" fontWeight="medium">
                  텍스트
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <FormControl fullWidth size="medium">
                  <InputLabel>폰트 크기</InputLabel>
                  <Select
                    value={userSettings.fontSize}
                    label="폰트 크기"
                    onChange={(e) =>
                      updateUserSettings({ fontSize: e.target.value as any })
                    }
                  >
                    <MenuItem value="small">작게</MenuItem>
                    <MenuItem value="medium">보통</MenuItem>
                    <MenuItem value="large">크게</MenuItem>
                  </Select>
                </FormControl>

                {/* <FormControl fullWidth size="medium">
                  <InputLabel>폰트 패밀리</InputLabel>
                  <Select
                    value={userSettings.fontFamily}
                    label="폰트 패밀리"
                    onChange={(e) =>
                      updateUserSettings({ fontFamily: e.target.value as any })
                    }
                  >
                    <MenuItem value="default">기본 폰트</MenuItem>
                    <MenuItem value="malgun">맑은 고딕</MenuItem>
                  </Select>
                </FormControl> */}
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />
          </Box>

          {/* 하단 액션 버튼 */}
          <Box
            sx={{
              p: 3,
              borderTop: 1,
              borderColor: "divider",
              backgroundColor: "background.paper",
              display: "flex",
              gap: 2,
              flexDirection: isMobile ? "column" : "row",
            }}
          >
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
              onClick={handleClose}
              color="primary"
              variant="contained"
              fullWidth={isMobile}
              sx={{ flex: isMobile ? undefined : 1 }}
            >
              확인
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default PreferenceToggle;
