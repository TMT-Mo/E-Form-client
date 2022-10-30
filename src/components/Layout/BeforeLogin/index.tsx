import React from "react";
import { Outlet } from "react-router-dom";
import DesktopOnly from "../DesktopOnly";
import TopBar from "./TopBar";

const Layout: React.FC = () => {
  const { innerWidth } = window;
  return (
    <>
      <TopBar />
      {innerWidth < 1280 ?  <DesktopOnly/>  : <Outlet/> }
    </>
  );
};

export default Layout;
