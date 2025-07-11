import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        "https://excel-analytics-platform-430f.onrender.com/api/user/all",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (!res.ok) throw new Error("Unauthorized or failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error.message);
      alert("Access denied or error fetching users.");
      navigate("/home");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen text-white p-8 bg-gradient-to-b from-black to-gray-900">
      <h2 className="text-3xl font-bold text-cyan-300 mb-6 text-center">
        🛠️ Admin Dashboard
      </h2>

      {users.length === 0 ? (
        <p className="text-center text-cyan-100">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-cyan-500">
            <thead className="bg-cyan-700 text-white">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
              </tr>
            </thead>
            <tbody className="bg-black/60 text-cyan-100">
              {users.map((user) => (
                <tr key={user._id} className="border-t border-cyan-500">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 capitalize">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
