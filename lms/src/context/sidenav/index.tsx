import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDevice } from "../device";

interface SidenavContextType {
  isSidenavOpen: boolean;
  isSidenavPinned: boolean;
  openSidenav: () => void;
  closeSidenav: () => void;
  toggleSidenav: () => void;
  setSidenavPinned: (pinned: boolean) => void;
  // sidenav가 실제로 표시되는지 여부 (모바일에서는 open 상태, 데스크톱에서는 pinned 또는 open)
  shouldShowSidenav: boolean;
}

const SidenavContext = createContext<SidenavContextType | undefined>(undefined);

export const useSidenav = () => {
  const context = useContext(SidenavContext);
  if (!context) {
    throw new Error("useSidenav must be used within SidenavProvider");
  }
  return context;
};

export const SidenavProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isMobile } = useDevice();

  const [isSidenavOpen, setSidenavOpen] = useState(false);
  const [isSidenavPinned, setSidenavPinnedState] = useState(false);

  // 모바일에서는 pinned 상태를 자동으로 false로 설정
  useEffect(() => {
    if (isMobile && isSidenavPinned) {
      setSidenavPinnedState(false);
    }
  }, [isMobile, isSidenavPinned]);

  // 데스크톱에서 pinned 상태일 때는 sidenav를 자동으로 열기
  useEffect(() => {
    if (!isMobile && isSidenavPinned) {
      setSidenavOpen(true);
    }
  }, [isMobile, isSidenavPinned]);

  const openSidenav = useCallback(() => {
    setSidenavOpen(true);
  }, []);

  const closeSidenav = useCallback(() => {
    // pinned 상태가 아닐 때만 닫기
    if (!isSidenavPinned) {
      setSidenavOpen(false);
    }
  }, [isSidenavPinned]);

  const toggleSidenav = useCallback(() => {
    if (isSidenavPinned && !isMobile) {
      // pinned 상태에서는 pinned를 해제
      setSidenavPinnedState(false);
      setSidenavOpen(false);
    } else {
      setSidenavOpen((prev) => !prev);
    }
  }, [isSidenavPinned, isMobile]);

  const setSidenavPinned = useCallback(
    (pinned: boolean) => {
      if (!isMobile) {
        setSidenavPinnedState(pinned);
        if (pinned) {
          setSidenavOpen(true);
        } else {
          setSidenavOpen(false);
        }
      }
    },
    [isMobile]
  );

  // sidenav가 실제로 표시되어야 하는지 계산
  const shouldShowSidenav = useMemo(() => {
    if (isMobile) {
      return isSidenavOpen; // 모바일에서는 open 상태만 확인
    } else {
      return isSidenavPinned || isSidenavOpen; // 데스크톱에서는 pinned 또는 open
    }
  }, [isMobile, isSidenavOpen, isSidenavPinned]);

  const contextValue = useMemo(
    () => ({
      isSidenavOpen,
      isSidenavPinned,
      openSidenav,
      closeSidenav,
      toggleSidenav,
      setSidenavPinned,
      shouldShowSidenav,
    }),
    [
      isSidenavOpen,
      isSidenavPinned,
      openSidenav,
      closeSidenav,
      toggleSidenav,
      setSidenavPinned,
      shouldShowSidenav,
    ]
  );

  return (
    <SidenavContext.Provider value={contextValue}>
      {children}
    </SidenavContext.Provider>
  );
};
