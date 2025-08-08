// src/context/index.ts - 깔끔한 통합 Export

// Auth 관련 (context/auth/index.tsx에서)
export { AuthProvider, useAuth } from "./auth";

// Theme 관련 (context/theme/index.tsx에서)
export {
  ThemeProvider,
  useMaterialUIController, // 기존 호환성
  useTheme as useAppTheme, // 이름 충돌 방지
  setDarkMode, // 기존 호환성
  setSidenavColor, // 기존 호환성
  setLayout, // 기존 호환성
} from "./theme";

// 타입들
export type {
  MaterialUIControllerState,
  MaterialUIControllerAction,
  SidenavColor,
  LayoutType,
} from "@/types/context";
