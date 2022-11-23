import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth, useSelector } from "../../../hooks";
import Notification from "../../Notification";
import DesktopOnly from "../DesktopOnly";
import TopBar from "./TopBar";

const Layout: React.FC = () => {
  const { innerWidth } = window;
  
  return (
    <>
      <TopBar />
      {innerWidth < 1280 ?  <DesktopOnly/>  : <Outlet/> }
      <Notification anchorOrigin={{vertical: "top", horizontal:"right"}} autoHideDuration={3000}/>
    </>
  );
};

export default Layout;
