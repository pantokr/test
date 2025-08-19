// src/context/auth/index.tsx
export { AuthContext } from "./AuthContext";
export type { AuthContextType } from "./AuthContext";
export { AuthProvider } from "./AuthProvider";

export { useAuth } from "./hooks";

// Hook은 별도 파일에서 export
// import { useAuth } from "@/hooks/useAuth";
