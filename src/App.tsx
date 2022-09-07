import React from "react";
import {  Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
