import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function RequireAdmin({ children }) {
  const [profile, setProfile] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
    setChecking(false);
  }, []);

  if (checking) return <div className="text-white p-4">Checking access...</div>;

  if (!profile || profile.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}
