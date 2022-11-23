import React from "react";
import { Outlet } from "react-router-dom";
import BreadcrumbsManagement from "../../Breadcrumbs";
// import DesktopOnly from "../DesktopOnly";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

const Layout: React.FC = () => {
  // const { innerWidth } = window;
  return (
    <div className="flex bg-blue-light-config">
      <SideBar />
      <div className="w-full">
        <TopBar />
        <BreadcrumbsManagement/>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
