// src/context/auth/AuthContext.tsx
import React, { createContext } from "react";
import type { ReactNode } from "react";
import type { UserInfo } from "@/types";

export interface AuthContextType {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  handleLogin: (credentials: {
    loginID: string;
    passwd: string;
  }) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleSession: (pathname: string) => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
