import React from "react";
import { Route, Routes } from "react-router-dom";
import Document from "./components/Document";
import RequireAuth from "./components/RequireAuth";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import Introduction from "./pages/Introduction";
import { Roles } from "./utils/constants";
import BeforeLogin from "./components/Layout/BeforeLogin";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<BeforeLogin />}>
        <Route path="" element={<Introduction />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route path="document" element={<Document />} />

        <Route path="login" element={<Login />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={Roles.STUDENT} />}></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
