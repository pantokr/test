import { useMediaQuery, useTheme } from "@mui/material";
import { createContext, ReactNode, useContext } from "react";

// DeviceContext 타입 정의
interface DeviceContextType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isMobileOrTablet: boolean;
}

// DeviceContext 생성
const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

// DeviceProvider Props 타입 정의
interface DeviceProviderProps {
  children: ReactNode;
}

// DeviceProvider 컴포넌트
export const DeviceProvider = ({ children }: DeviceProviderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const value = {
    isMobile,
    isTablet,
    isDesktop,
    isMobileOrTablet,
  };

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
};

// useDevice 커스텀 훅
export const useDevice = (): DeviceContextType => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDevice must be used within DeviceProvider");
  }
  return context;
};
