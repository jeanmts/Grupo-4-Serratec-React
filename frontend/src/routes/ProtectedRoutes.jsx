import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ redirecTo }) => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? <Outlet /> : <Navigate to={redirecTo} />;
};

export default ProtectedRoutes;