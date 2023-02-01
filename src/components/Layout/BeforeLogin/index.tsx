import React from "react";
import { Outlet } from "react-router-dom";
import AlertPopup from "../../AlertPopup";
import DesktopOnly from "../DesktopOnly";
import TopBar from "./TopBar";

const Layout: React.FC = () => {
  const { innerWidth } = window;
  return (
    <>
      <TopBar />
      <Outlet />
      <AlertPopup
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
      />
    </>
  );
};

export default Layout;
