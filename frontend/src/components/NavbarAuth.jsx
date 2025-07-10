import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assests/detective.png"; // Custom avatar image
import logo from "../assests/excel-icon.png";

const NavbarAuth = () => {
  return (
    <nav className="w-full z-50 relative flex items-center justify-between px-6 py-4 bg-black/80 border-b border-white/20 shadow-md">
      {/* 🔷 Brand / Logo */}
      <Link
        to="/"
        className="flex items-center gap-3 text-cyan-300 text-2xl font-bold tracking-wider"
      >
        <img src={logo} alt="Logo" className="w-8 h-8 rounded" />
        Excel Web
      </Link>

      {/* 👤 Avatar Section */}
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-cyan-400">
        <img
          src={avatar}
          alt="User Avatar"
          className="w-8 h-8 rounded-full border border-cyan-300"
        />
        <span className="text-sm font-medium text-cyan-100 tracking-tight">
          Agent
        </span>
      </div>
    </nav>
  );
};

export default NavbarAuth;
