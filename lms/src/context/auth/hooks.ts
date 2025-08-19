// src/hooks/useAuth.ts
import type { AuthContextType } from "@/context/auth/AuthContext";
import { AuthContext } from "@/context/auth/AuthContext";
import { useContext } from "react";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.");
  }
  return context;
};
