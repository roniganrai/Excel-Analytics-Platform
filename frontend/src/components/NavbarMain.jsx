import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import userAvatar from "../assets/detective.png";
import logo from "../assets/excel-icon.png";

const NavbarMain = ({ onToggleDrawer }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // Fetch current user profile
  const fetchProfile = async () => {
    try {
      const res = await fetch(
        "https://excel-analytics-platform-akuc.onrender.com/api/user/profile",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (!res.ok) throw new Error("Unable to fetch user");
      const data = await res.json();
      console.log("PROFILE:", data);
      setUserName(data.name);
    } catch (error) {
      console.warn("Profile fetch error:", error.message);
      setUserName("Agent");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="relative z-10 flex justify-between items-center px-6 py-4 bg-black/80 border-b border-white/20 shadow-md">
      {/* ☰ Sidebar Toggle + Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleDrawer}
          className="text-cyan-300 text-3xl hover:text-white transition"
        >
          ☰
        </button>
        <Link
          to="/home"
          className="flex items-center gap-3 text-cyan-300 hover:text-white transition"
        >
          <img
            src={logo}
            alt="Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded"
          />
          <span className="text-2xl sm:text-3xl font-bold tracking-wide">
            Excel Web
          </span>
        </Link>
      </div>

      {/* 🔍 Center Search Bar */}
      <div className="hidden sm:block flex-1 mx-6">
        <input
          type="text"
          placeholder="Search data..."
          className="w-full p-2 bg-black/40 border border-cyan-400 rounded placeholder-cyan-300 text-cyan-100 focus:outline-none"
        />
      </div>

      {/* 👤 Avatar + Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <img
            src={userAvatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-cyan-400 shadow-md"
          />
          <span className="text-cyan-200 font-medium hidden sm:inline">
            {loading ? "..." : userName}
          </span>
        </div>

        {/* ▼ Dropdown Menu */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-black/90 border border-cyan-400 rounded-md shadow-lg z-50">
            <ul className="text-cyan-200 text-sm">
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-cyan-700 transition"
                  onClick={() => setShowDropdown(false)}
                >
                  👤 View Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="block px-4 py-2 hover:bg-cyan-700 transition"
                  onClick={() => setShowDropdown(false)}
                >
                  ⚙️ Settings
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-cyan-700 transition"
                >
                  🚪 Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarMain;
