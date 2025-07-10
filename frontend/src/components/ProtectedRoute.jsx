import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // 🚫 No token? Redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Authenticated? Show the protected component
  return children;
};

export default ProtectedRoute;
