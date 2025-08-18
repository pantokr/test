// src/hooks/useAuth.ts
import { useContext } from "react";
import { AuthContext } from "@/context/auth/AuthContext";
import type { AuthContextType } from "@/context/auth/AuthContext";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.");
  }
  return context;
};
