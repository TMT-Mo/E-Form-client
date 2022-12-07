import React, {useEffect, useState} from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "../../hooks";
import { LoginResponse } from "../../models/auth";
import { helpers } from "../../utils";

const RequireToken: React.FC = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();
  return userInfo ? (
    <Navigate to="/home" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireToken;
