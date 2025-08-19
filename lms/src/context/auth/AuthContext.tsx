// src/context/auth/AuthContext.tsx
import type { UserInfo } from "@/types";
import { createContext } from "react";

export interface AuthContextType {
  handleLogin: (credentials: {
    loginID: string;
    passwd: string;
  }) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleSession: (pathname: string) => Promise<void>;
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
