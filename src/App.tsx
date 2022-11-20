import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Document from "./components/Document";
import RequireAuth from "./components/RequireAuth";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import Introduction from "./pages/Introduction";
// import { Roles } from "./utils/constants";
import BeforeLogin from "./components/Layout/BeforeLogin";
import NotFound from "./pages/NotFound";
import AfterLogin from "./components/Layout/AfterLogin";
import TemplateManagement from "./pages/TemplateManagement";
import RequireToken from "./components/RequireToken";
import { helpers } from "./utils";

function App() {
  const [token, setToken] = useState<string | undefined>()
  const navigate = useNavigate()
  useEffect(() => {
    const token = helpers.getToken()
    console.log(token)
    setToken(token)
  }, [navigate]);
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<BeforeLogin />}>
        <Route path="" element={<Introduction />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route path="document" element={<Document />} />

        <Route path="login" element={<Login />} />
      </Route>

      <Route
        element={<RequireToken token={token}/>}
      >
      <Route path="/home" element={<AfterLogin />}>
        <Route path="" element={<TemplateManagement />} />
      </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
