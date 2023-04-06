import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "pages/login";
import Unauthorized from "pages/unauthorized";
import Introduction from "pages/introduction";
// import { Roles } from "./utils/constants";
import BeforeLogin from "components/Layout/BeforeLogin";
import NotFound from "pages/not-found";
import AfterLogin from "components/Layout/AfterLogin";
import { useAuth, useSelector } from "hooks";
import Viewer from "components/Layout/Viewer";

function App() {
  const { checkAuthenticated } = useSelector((state) => state.auth);
  const { authenticate } = useAuth();
  const navigate = useNavigate()
  useEffect(() => {
    !checkAuthenticated && authenticate();
  }, [authenticate, checkAuthenticated]);

  // window.addEventListener("popstate", e => {
  //   // Nope, go back to your page
  //   navigate(1);
  // });
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<BeforeLogin />}>
        <Route path="" element={<Introduction />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route path="login" element={<Login />} />
      </Route>

      {/* <Route
        element={<RequireToken />}
      > */}
      <Route path="/user" element={<AfterLogin />}/>
      <Route path="/viewer" element={<Viewer />} />
      {/* </Route> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
