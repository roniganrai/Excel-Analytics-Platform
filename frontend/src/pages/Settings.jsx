// src/pages/Settings.jsx
import React, { useState } from "react";
import NavbarMain from "../components/NavbarMain";
import SidebarDrawer from "../components/SidebarDrawer";
import Footer from "../components/Footer";

export default function Settings() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div
      className="min-h-screen text-white font-detective relative overflow-x-hidden"
      style={{
        backgroundImage: `url(/src/assets/b.gif)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 🔲 Dimmed background */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-0" />

      {/* 🔗 Navigation */}
      <NavbarMain onToggleDrawer={() => setIsDrawerOpen(true)} />
      <SidebarDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* ⚙️ Settings Content */}
      <main className="relative z-10 px-6 py-10">
        <h2 className="text-4xl text-cyan-300 font-bold text-center mb-10 float-bounce">
          🛠️ User Preferences
        </h2>

        <div className="max-w-3xl mx-auto space-y-10">
          {/* 👤 Profile Info */}
          <section className="bg-black/60 p-6 rounded-lg border border-cyan-500 shadow-md">
            <h3 className="text-2xl text-cyan-200 font-semibold mb-4">
              👤 My Info
            </h3>
            <div className="space-y-2 text-cyan-100">
              <p>
                <strong>Name:</strong> DefaultUser
              </p>
              <p>
                <strong>Email:</strong> user@example.com
              </p>
              <button className="detective-btn mt-3">🔑 Change Password</button>
            </div>
          </section>

          {/* 🛠️ Platform Preferences */}
          <section className="bg-black/60 p-6 rounded-lg border border-cyan-500 shadow-md">
            <h3 className="text-2xl text-cyan-200 font-semibold mb-4">
              🔧 Platform Settings
            </h3>
            <div className="flex flex-col gap-4 text-cyan-100">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="accent-cyan-500" />
                Enable auto-save analytics
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="accent-cyan-500" />
                Subscribe to release updates
              </label>
            </div>
          </section>

          {/* 🎨 Theme Option */}
          <section className="bg-black/60 p-6 rounded-lg border border-cyan-500 shadow-md">
            <h3 className="text-2xl text-cyan-200 font-semibold mb-4">
              🎨 Appearance
            </h3>
            <p className="text-cyan-100 mb-2">
              Current Theme: <strong>Dark Mode</strong>
            </p>
            <button className="detective-btn">🌤️ Switch to Light Mode</button>
          </section>
        </div>
      </main>

      <Footer />

      <style>{`
        .detective-btn {
          background: linear-gradient(135deg, #84cc16, #3f6212);
          padding: 0.5rem 1.25rem;
          border-radius: 9999px;
          font-weight: 600;
          box-shadow: 0 0 12px rgba(132, 204, 22, 0.6);
          transition: all 0.3s ease-in-out;
        }
        .detective-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(163, 230, 53, 0.8);
        }
        .font-detective {
          font-family: 'Courier New', Courier, monospace;
        }
        .float-bounce {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
