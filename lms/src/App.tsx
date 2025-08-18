// src/App.tsx - 단순화된 구조

import React from "react";
import AppProvider from "@/AppProvider";
import AppRoutes from "./AppRoutes";

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default App;
