import React from "react";
import { Outlet } from "react-router-dom";
import AlertPopup from "components/AlertPopup";
import TopBar from "./TopBar";

const Layout: React.FC = () => {
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
