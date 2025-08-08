// src/hooks/useSidenav.ts

import { useState, useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

interface UseSidenavReturn {
  open: boolean; // 상태값
  toggle: () => void;
  close: () => void;
  openSidenav: () => void; // 함수명을 변경
  isMobile: boolean;
}
/**
 * 사이드바 상태 관리 커스텀 훅
 */
export const useSidenav = (initialOpen: boolean = true): UseSidenavReturn => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen);

  // 모바일에서는 기본적으로 닫힌 상태
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(initialOpen);
    }
  }, [isMobile, initialOpen]);

  const toggle = (): void => {
    setIsOpen((prev) => !prev);
  };

  const close = (): void => {
    setIsOpen(false);
  };

  const openSidenav = (): void => {
    setIsOpen(true);
  };

  return {
    open: isOpen,
    toggle,
    close,
    openSidenav: openSidenav,
    isMobile,
  };
};
