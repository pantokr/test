// MainContent.tsx
import React from "react";
import { ContentWrapper } from "./styles";

interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  console.log("MainContent rendered with children:", children);
  return <ContentWrapper>{children}</ContentWrapper>;
};

export default MainContent;
