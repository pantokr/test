import { useEffect, useState } from "react";

// react-router-dom components
import { useLocation, NavLink, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import Collapse from "@mui/material/Collapse";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import SidenavCollapse from "frames/Sidenav/SidenavCollapse";

// Custom styles for the Sidenav
import SidenavRoot from "frames/Sidenav/SidenavRoot";
import sidenavLogoLabel from "frames/Sidenav/styles/sidenav";

// Material Dashboard 2 React context
import { useMaterialUIController, setMiniSidenav, setWhiteSidenav } from "context";
import { logout } from "api/auth";
import { Box, ListItemIcon } from "@mui/material";
import { collapseIcon, collapseIconBox } from "./styles/sidenavCollapse";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");

  // 각 섹션의 접기/펼치기 상태 관리
  const [collapsedSections, setCollapsedSections] = useState({});

  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const confirmed = window.confirm("정말 로그아웃 하시겠습니까?");
      if (!confirmed) {
        return;
      }
      const data = await logout();
      console.log("로그아웃된 ID:", data.id);
    } catch (error) {
      // 로그아웃 실패 시 에러 처리 생략
    } finally {
      navigate("/authentication/sign-in");
    }
  };

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  // 섹션 토글 함수
  const toggleSection = (sectionKey) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  // 초기 섹션 상태 설정 (모든 섹션을 펼친 상태로 시작)
  useEffect(() => {
    const initialSections = {};
    routes.forEach((route) => {
      if (route.type === "title") {
        initialSections[route.key] = false; // false = 펼친 상태
      }
    });
    setCollapsedSections(initialSections);
  }, [routes]);

  useEffect(() => {
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
    }

    window.addEventListener("resize", handleMiniSidenav);
    handleMiniSidenav();

    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  // routes를 섹션별로 그룹화하는 함수
  const groupRoutesBySection = (routes) => {
    const groups = [];
    let currentGroup = null;

    routes.forEach((route) => {
      if (route.type === "title") {
        // 새로운 섹션 시작
        currentGroup = {
          title: route,
          items: [],
        };
        groups.push(currentGroup);
      } else if (currentGroup && route.type === "collapse") {
        // 현재 섹션에 아이템 추가
        currentGroup.items.push(route);
      } else {
        // 섹션에 속하지 않는 아이템들 (대시보드, 인증 등)
        groups.push({
          title: null,
          items: [route],
        });
      }
    });

    return groups;
  };

  // 그룹화된 routes 렌더링
  const renderGroupedRoutes = () => {
    const groups = groupRoutesBySection(routes);

    return groups.map((group, groupIndex) => {
      if (!group.title) {
        // 섹션이 없는 단독 아이템들
        return group.items.map((route) => renderSingleRoute(route));
      }

      const isCollapsed = collapsedSections[group.title.key];

      return (
        <Box key={group.title.key}>
          {/* 섹션 타이틀 (클릭 가능) */}
          <MDBox
            onClick={() => toggleSection(group.title.key)}
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              py: 1,
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <MDBox display="flex" alignItems="center" gap={1}>
              {/* 섹션 아이콘 */}
              <ListItemIcon
                sx={(theme) => ({
                  ...collapseIconBox?.(theme, {
                    transparentSidenav,
                    whiteSidenav,
                    darkMode,
                    active: false,
                  }),
                  minWidth: "auto",
                  marginRight: 1,
                })}
              >
                {isCollapsed ? (
                  <KeyboardArrowDown
                    sx={{
                      fontSize: "1.2rem",
                      color: textColor,
                      opacity: 0.8,
                      transition: "transform 0.3s ease",
                    }}
                  />
                ) : (
                  <KeyboardArrowUp
                    sx={{
                      fontSize: "1.2rem",
                      color: textColor,
                      opacity: 0.8,
                      transition: "transform 0.3s ease",
                    }}
                  />
                )}
              </ListItemIcon>

              <MDTypography
                color={textColor}
                display="block"
                variant="caption"
                fontWeight="bold"
                textTransform="uppercase"
              >
                {group.title.title}
              </MDTypography>
            </MDBox>
          </MDBox>

          {/* 섹션 아이템들 (접기/펼치기) */}
          <Collapse in={!isCollapsed} timeout="auto" unmountOnExit>
            <MDBox pl={2}>{group.items.map((route) => renderSingleRoute(route))}</MDBox>
          </Collapse>
        </Box>
      );
    });
  };

  // 개별 route 렌더링 함수
  const renderSingleRoute = ({ type, name, icon, title, noCollapse, key, href, route }) => {
    if (type === "collapse") {
      return href ? (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavCollapse
            name={name}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
          />
        </Link>
      ) : (
        <NavLink key={key} to={route}>
          <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
        </NavLink>
      );
    } else if (type === "divider") {
      return (
        <Divider
          key={key}
          light={
            (!darkMode && !whiteSidenav && !transparentSidenav) ||
            (darkMode && !transparentSidenav && whiteSidenav)
          }
        />
      );
    }
    return null;
  };

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && <MDBox component="img" src={brand} alt="Brand" width="2rem" />}
          <MDBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography component="h6" variant="button" fontWeight="medium" color={textColor}>
              {brandName}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderGroupedRoutes()}</List>
      <MDBox p={2} mt="auto">
        <MDButton
          component="button"
          variant="gradient"
          color={sidenavColor}
          fullWidth
          onClick={handleLogout}
        >
          로그아웃
        </MDButton>
      </MDBox>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "primary",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
