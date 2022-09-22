import React from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import Welcome from "./pages/Welcome";
import { Roles } from "./utils/constants";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Welcome />} />

      <Route path="unauthorized" element={<Unauthorized />} />

      <Route element={<RequireAuth allowedRoles={Roles.STUDENT} />}>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
