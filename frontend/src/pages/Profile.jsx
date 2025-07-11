import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarMain from "../components/NavbarMain";
import SidebarDrawer from "../components/SidebarDrawer";
import Footer from "../components/Footer";
import detectiveBg from "../assets/b.gif";
import avatar from "../assets/detective.png";

export default function Profile() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch user profile
  const getProfile = async () => {
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
      if (!res.ok) throw new Error(data.msg || "Could not load profile");

      setProfile(data);
      setNameInput(data.name);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        "https://excel-analytics-platform-430f.onrender.com/api/user/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({ name: nameInput }),
        }
      );

      if (!res.ok) throw new Error("Profile update failed");

      setEditMode(false);
      getProfile();
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen font-detective text-white relative"
      style={{
        backgroundImage: `url(${detectiveBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0" />
      <NavbarMain onToggleDrawer={() => setIsDrawerOpen(true)} />
      <SidebarDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <main className="relative z-10 max-w-3xl mx-auto px-6 py-10">
        <h2 className="text-center text-4xl font-bold text-cyan-300 mb-8">
          👤 Profile Overview
        </h2>

        {loading ? (
          <p className="text-center text-cyan-200">Fetching your data...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="bg-black/60 p-6 rounded-lg border border-cyan-500 shadow-lg">
            <div className="flex items-center gap-6 mb-6">
              <img
                src={avatar}
                alt="User Avatar"
                className="w-20 h-20 rounded-full border-2 border-cyan-400"
              />
              <div>
                {editMode ? (
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="text-black px-3 py-1 rounded focus:outline-none"
                  />
                ) : (
                  <h3 className="text-2xl font-bold text-cyan-200">
                    {profile.name}
                  </h3>
                )}
                <p className="text-cyan-300 text-sm">{profile.email}</p>
                <p className="text-cyan-400 text-xs mt-1">
                  Joined: {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-black/70 p-4 rounded text-center border border-cyan-400">
                <h4 className="text-xl font-semibold text-cyan-200">
                  📂 Uploads
                </h4>
                <p className="text-2xl text-white mt-2">7</p>
              </div>
              <div className="bg-black/70 p-4 rounded text-center border border-cyan-400">
                <h4 className="text-xl font-semibold text-cyan-200">
                  ⏳ Time Spent
                </h4>
                <p className="text-2xl text-white mt-2">22.5 hrs</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={editMode ? handleUpdate : () => setEditMode(true)}
                className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-4 py-2 rounded"
              >
                {editMode ? "💾 Save Changes" : "✏️ Edit Name"}
              </button>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
