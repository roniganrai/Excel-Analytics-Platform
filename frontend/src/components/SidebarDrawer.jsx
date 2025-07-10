import React from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarDrawer = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/home" },
    { label: "Upload File", path: "/upload" },
    { label: "Analyze", path: "/charts" },
    { label: "History", path: "/history" },
    { label: "Ask AI", path: "/chat" },
    { label: "Profile", path: "/profile" },
    { label: "Settings", path: "/settings" },
  ];

  return (
    <>
      {/* 🔳 Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* 📁 Sidebar Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Sidebar Navigation"
        className={`fixed top-0 left-0 h-full w-64 bg-black/90 border-r border-cyan-400 shadow-xl transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ❌ Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-cyan-300 text-xl hover:text-white"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        {/* 📚 Content */}
        <div className="p-6 text-cyan-100">
          {/* 🧭 Navigation */}
          <h2 className="text-cyan-300 font-bold mb-4 tracking-wider">
            Quick Access
          </h2>
          {navItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              onClick={onClose}
              className={`block py-2 px-3 rounded transition-all ${
                location.pathname === item.path
                  ? "bg-cyan-700 text-white"
                  : "hover:bg-cyan-700"
              }`}
            >
              📌 {item.label}
            </Link>
          ))}

          {/* 📊 Stats */}
          <div className="mt-6 border-t border-cyan-500 pt-4 text-sm text-cyan-300">
            <p>
              👥 Users: <span className="text-white">1272</span>
            </p>
            <p>
              📂 Files Analyzed: <span className="text-white">34</span>
            </p>
          </div>

          {/* 🕵️‍♂️ Recent Activity */}
          <div className="mt-6 border-t border-cyan-500 pt-4 text-sm">
            <h3 className="text-cyan-300 font-semibold mb-2">Recent</h3>
            <ul className="space-y-1 text-cyan-100">
              <li>🔍 Clue.xlsx scanned</li>
              <li>📊 Trend chart saved</li>
              <li>💾 Report generated</li>
            </ul>
          </div>

          {/* 🆘 Help */}
          <Link
            to="/help"
            onClick={onClose}
            className="block mt-6 text-center text-sm text-cyan-400 underline hover:text-white"
          >
            ❓ Need Help?
          </Link>
        </div>
      </div>
    </>
  );
};

export default SidebarDrawer;
