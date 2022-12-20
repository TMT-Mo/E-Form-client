import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "../../hooks";

interface Props {
  allowedRoles: string;
}

const RequireAuth: React.FC<Props> = ({ allowedRoles }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();
  return userInfo?.roleName === allowedRoles ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

export default RequireAuth;
