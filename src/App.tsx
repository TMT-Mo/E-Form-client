import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import Introduction from "./pages/Introduction";
// import { Roles } from "./utils/constants";
import BeforeLogin from "./components/Layout/BeforeLogin";
import NotFound from "./pages/NotFound";
import AfterLogin from "./components/Layout/AfterLogin";
import { useAuth, useSelector } from "./hooks";
import ViewAddTemplate from "./pages/Template/ViewAddTemplate";

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

        {/* <Route path="document" element={<ViewTemplate />} /> */}

        <Route path="login" element={<Login />} />
      </Route>

      {/* <Route
        element={<RequireToken />}
      > */}
      <Route path="/user" element={<AfterLogin />}>
        {/* <Route path="/user/template" element={<TemplateManagement />} /> */}
      </Route>
        <Route path="/viewDocument" element={<ViewAddTemplate/>}/>
      {/* </Route> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
