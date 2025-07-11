// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import detectiveBg from "../assets/b.gif";
// import magnifier from "../assets/detective.png";
import NavbarMain from "../components/NavbarMain";
import SidebarDrawer from "../components/SidebarDrawer";
import Footer from "../components/Footer";

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          "https://excel-analytics-platform-akuc.onrender.com/api/user/profile",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.msg || "Failed to get user profile");
        }

        const data = await res.json();
        setUserName(data.name);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div
      className="min-h-screen text-white font-detective relative overflow-x-hidden"
      style={{
        backgroundImage: `url(${detectiveBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-0" />

      <NavbarMain onToggleDrawer={() => setIsDrawerOpen(true)} />
      <SidebarDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <main className="relative z-10 px-8 py-10">
        {/* 🏠 Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-5xl font-bold text-cyan-300 animate-scan">
            {loading
              ? "Loading..."
              : error
              ? "Welcome, Guest!"
              : `Welcome, ${userName}!`}
          </h2>
          <p className="text-cyan-100 mt-3 mb-6 max-w-xl mx-auto">
            Upload Excel. Discover Smart Patterns Instantly.
          </p>
          <Link to="/upload" className="detective-btn inline-block">
            📤 Start Analyzing Data
          </Link>
        </section>

        {/* ✨ Feature Links */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              to: "/upload",
              icon: "🧾",
              title: "Upload File",
              desc: "Start analyzing your file",
            },
            {
              to: "/charts",
              icon: "📊",
              title: "View Charts",
              desc: "Visualize the data easily",
            },
            {
              to: "/history",
              icon: "📁",
              title: "History",
              desc: "Check previous uploads",
            },
            {
              to: "/chat",
              icon: "🧠",
              title: "Ask AI",
              desc: "Let AI help with insights",
            },
          ].map(({ to, icon, title, desc }, i) => (
            <Link
              key={i}
              to={to}
              className="group relative p-6 bg-black/60 border border-cyan-500 rounded-lg shadow-xl transform hover:scale-105 transition"
            >
              <span className="absolute -top-3 -right-3 bg-cyan-500 h-8 w-8 flex items-center justify-center rounded-full text-black font-bold">
                {i + 1}
              </span>
              <div className="text-5xl mb-4">{icon}</div>
              <h4 className="text-xl font-bold text-cyan-200 group-hover:text-white">
                {title}
              </h4>
              <p className="text-cyan-100">{desc}</p>
            </Link>
          ))}
        </section>

        {/* 🧭 Step-by-Step Process */}
        <section className="bg-black/40 p-8 rounded-lg border border-cyan-500 max-w-3xl mx-auto mb-16">
          <h3 className="text-3xl text-cyan-300 font-bold mb-6 text-center">
            📌 How It Works
          </h3>
          <div className="flex flex-col md:flex-row justify-between gap-4 text-cyan-100 text-sm">
            {[
              "Upload Excel",
              "Run Analysis",
              "View Graphs",
              "Export Report",
            ].map((step, i) => (
              <div
                key={i}
                className="flex-1 bg-black/70 p-4 rounded-md text-center hover:bg-cyan-900 transition"
              >
                {`${i + 1}. ${step}`}
              </div>
            ))}
          </div>
        </section>

        {/* 🧠 Why Choose This? */}
        <section className="text-center max-w-4xl mx-auto">
          <h3 className="text-3xl text-cyan-300 font-bold mb-6">
            💡 Why Choose ExcelWeb?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {["Fast Analysis", "User-Friendly", "Report Save"].map(
              (reason, i) => (
                <div
                  key={i}
                  className="bg-black/60 p-4 rounded-lg border border-cyan-500 shadow-md"
                >
                  <div className="text-4xl mb-2">{["⚡", "📊", "💾"][i]}</div>
                  <p className="text-cyan-100">{reason}</p>
                </div>
              )
            )}
          </div>
        </section>
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
          box-shadow: 0 0 22px rgba(163, 230, 53, 0.8);
        }
        .animate-scan {
          animation: scan 3s ease-in-out infinite;
        }
        @keyframes scan {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .font-detective {
          font-family: 'Courier New', Courier, monospace;
        }
      `}</style>
    </div>
  );
}
