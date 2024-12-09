import React from "react";
import "./MainLayout.css";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <div className="main-layout">{children}</div>;
};

export default MainLayout;
