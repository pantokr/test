import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { DeviceContext, DeviceContextType } from "../context/device";
import { SidenavContext } from "../context/sidenav";
import { ThemeContext } from "../context/theme";

// 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

// 훅을 컴포넌트 뒤에서 내보내기
export const useSidenav = () => {
  const context = useContext(SidenavContext);
  if (!context) {
    throw new Error("useSidenav must be used within SidenavProvider");
  }
  return context;
};

export const useThemeSettings = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeSettings must be used within ThemeProvider");
  }
  return context;
};

// useDevice 커스텀 훅
export const useDevice = (): DeviceContextType => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDevice must be used within DeviceProvider");
  }
  return context;
};
