/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// react-github-btn
import GitHubButton from "react-github-btn";

// @mui material components
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// @mui icons
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Custom styles for the Configurator
import ConfiguratorRoot from "frames/Configurator/ConfiguratorRoot";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setOpenConfigurator,
  setWhiteSidenav,
  setSidenavColor,
  setDarkMode,
} from "context";

function Configurator() {
  const [controller, dispatch] = useMaterialUIController();
  const { openConfigurator, sidenavColor, whiteSidenav, darkMode } = controller;
  const [disabled, setDisabled] = useState(false);
  const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];

  // 🔹 localStorage에서 불러오기
  useEffect(() => {
    const savedConfig = localStorage.getItem("md2-config");
    if (savedConfig) {
      const { sidenavColor, whiteSidenav, darkMode } = JSON.parse(savedConfig);

      if (sidenavColor) setSidenavColor(dispatch, sidenavColor);
      if (typeof whiteSidenav === "boolean") setWhiteSidenav(dispatch, whiteSidenav);
      if (typeof darkMode === "boolean") setDarkMode(dispatch, darkMode);
    }
  }, [dispatch]);

  // 🔹 상태 저장
  useEffect(() => {
    localStorage.setItem(
      "md2-config",
      JSON.stringify({
        sidenavColor,
        whiteSidenav,
        darkMode,
      })
    );
  }, [sidenavColor, whiteSidenav, darkMode]);

  // 🔹 윈도우 크기 감지 (기존 코드 유지)
  useEffect(() => {
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }
    window.addEventListener("resize", handleDisabled);
    handleDisabled();
    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
  const handleWhiteSidenav = () => setWhiteSidenav(dispatch, true);
  const handleDarkSidenav = () => setWhiteSidenav(dispatch, false);
  const handleDarkMode = () => setDarkMode(dispatch, !darkMode);

  // sidenav type buttons styles
  const sidenavTypeButtonsStyles = ({
    functions: { pxToRem },
    palette: { white, dark, background },
    borders: { borderWidth },
  }) => ({
    height: pxToRem(39),
    background: darkMode ? background.sidenav : white.main,
    color: darkMode ? white.main : dark.main,
    border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,

    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode ? background.sidenav : white.main,
      color: darkMode ? white.main : dark.main,
      border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,
    },
  });

  // sidenav type active button styles
  const sidenavTypeActiveButtonStyles = ({
    functions: { pxToRem, linearGradient },
    palette: { white, gradients, background },
  }) => ({
    height: pxToRem(39),
    background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
    color: darkMode ? background.sidenav : white.main,

    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
      color: darkMode ? background.sidenav : white.main,
    },
  });

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}
      >
        <MDBox>
          <MDTypography variant="h5">테마 설정</MDTypography>
        </MDBox>

        <Icon
          sx={({ typography: { size }, palette: { dark, white } }) => ({
            fontSize: `${size.lg} !important`,
            color: darkMode ? white.main : dark.main,
            stroke: "currentColor",
            strokeWidth: "2px",
            cursor: "pointer",
            transform: "translateY(5px)",
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </MDBox>

      <Divider />

      <MDBox pt={0.5} pb={3} px={3}>
        <MDBox>
          <MDTypography variant="h6">좌측 탭 색상</MDTypography>

          <MDBox mb={0.5}>
            {sidenavColors.map((color) => (
              <IconButton
                key={color}
                sx={({
                  borders: { borderWidth },
                  palette: { white, dark, background },
                  transitions,
                }) => ({
                  width: "24px",
                  height: "24px",
                  padding: 0,
                  border: `${borderWidth[1]} solid ${darkMode ? background.sidenav : white.main}`,
                  borderColor: () => {
                    let borderColorValue = sidenavColor === color && dark.main;

                    if (darkMode && sidenavColor === color) {
                      borderColorValue = white.main;
                    }

                    return borderColorValue;
                  },
                  transition: transitions.create("border-color", {
                    easing: transitions.easing.sharp,
                    duration: transitions.duration.shorter,
                  }),
                  backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) =>
                    linearGradient(gradients[color].main, gradients[color].state),

                  "&:not(:last-child)": {
                    mr: 1,
                  },

                  "&:hover, &:focus, &:active": {
                    borderColor: darkMode ? white.main : dark.main,
                  },
                })}
                onClick={() => setSidenavColor(dispatch, color)}
              />
            ))}
          </MDBox>
        </MDBox>

        <MDBox mt={3} lineHeight={1}>
          <MDTypography variant="h6">좌측 탭 색상 타입</MDTypography>

          <MDBox
            sx={{
              display: "flex",
              mt: 2,
              mr: 1,
            }}
          >
            <MDButton
              color="dark"
              variant="gradient"
              onClick={handleDarkSidenav}
              disabled={disabled}
              fullWidth
              sx={(theme) => ({
                mr: 1, // 버튼 간격 추가
                ...(!whiteSidenav
                  ? sidenavTypeActiveButtonStyles(theme)
                  : sidenavTypeButtonsStyles(theme)),
              })}
            >
              다크
            </MDButton>
            <MDButton
              color="dark"
              variant="gradient"
              onClick={handleWhiteSidenav}
              disabled={disabled}
              fullWidth
              sx={(theme) => ({
                ...(whiteSidenav
                  ? sidenavTypeActiveButtonStyles(theme)
                  : sidenavTypeButtonsStyles(theme)),
              })}
            >
              화이트
            </MDButton>
          </MDBox>
        </MDBox>

        <Divider />
        <MDBox display="flex" justifyContent="space-between" alignItems="center" lineHeight={1}>
          <MDTypography variant="h6">라이트 / 다크 모드</MDTypography>

          <Switch checked={darkMode} onChange={handleDarkMode} />
        </MDBox>
        <Divider />
      </MDBox>
    </ConfiguratorRoot>
  );
}

export default Configurator;
