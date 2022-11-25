import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import DocumentManagement from "../../../pages/DocumentManagement";
import TemplateManagement from "../../../pages/TemplateManagement";
// import DesktopOnly from "../DesktopOnly";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

const Layout: React.FC = () => {
  let { state } = useLocation();
  // const { innerWidth } = window;
  const switchTab = ()  => {
    console.log(state)
    switch (state) {
      case "template":
        return <TemplateManagement /> 
      case "document":
        return <DocumentManagement /> 
      default:
        return <TemplateManagement /> 
    }
  };
  console.log(state)
  return (
    <div className="flex bg-blue-light-config">
      <SideBar />
      <div className="w-full">
        <TopBar />
        {/* <Outlet /> */}
        {switchTab()}
        {/* <TemplateManagement/> */}
      </div>
    </div>

  );
};

export default Layout;
