import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function RequireAdmin({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch(
          "https://excel-analytics-platform-430f.onrender.com/api/user/profile",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        const data = await res.json();
        setIsAdmin(data.role === "admin");
      } catch (err) {
        console.error("Admin check error:", err.message);
      } finally {
        setChecked(true);
      }
    };

    checkAdmin();
  }, []);

  if (!checked) return <div className="text-white p-4">Checking access...</div>;

  if (!isAdmin) return <Navigate to="/home" replace />;

  return children;
}
