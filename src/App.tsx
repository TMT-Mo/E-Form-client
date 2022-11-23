import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Document from "./components/Document";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import Introduction from "./pages/Introduction";
// import { Roles } from "./utils/constants";
import BeforeLogin from "./components/Layout/BeforeLogin";
import NotFound from "./pages/NotFound";
import AfterLogin from "./components/Layout/AfterLogin";
import TemplateManagement from "./pages/TemplateManagement";
import { useAuth, useSelector } from "./hooks";

function App() {
  const { checkAuthenticated } = useSelector((state) => state.auth);
  const { authenticate } = useAuth();
  useEffect(() => {
    !checkAuthenticated && authenticate();
  }, [authenticate, checkAuthenticated]);
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<BeforeLogin />}>
        <Route path="" element={<Introduction />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route path="document" element={<Document />} />

        <Route path="login" element={<Login />} />
      </Route>

      {/* <Route
        element={<RequireToken />}
      > */}
      <Route path="/user" element={<AfterLogin />}>
        <Route path="/user/template" element={<TemplateManagement />} />
      </Route>
      {/* </Route> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
