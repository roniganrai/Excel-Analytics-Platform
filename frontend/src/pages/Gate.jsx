import React from "react";
import { useNavigate } from "react-router-dom";
import gateBg from "../assets/b.gif";

export default function Gate() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative text-white font-detective"
      style={{
        backgroundImage: `url(${gateBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 🔲 Dim overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0" />

      {/* 🧠 Gate content */}
      <div className="z-10 text-center px-6 max-w-3xl">
        <h1 className="text-6xl font-black text-cyan-300 animate-scan tracking-wide">
          Excel Insights Portal
        </h1>
        <p className="text-cyan-100 mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Upload Excel. Get Smart Insights Instantly.
        </p>
        <button
          onClick={handleStart}
          className="mt-8 gate-btn px-10 py-3 text-lg inline-block"
        >
          Start Analyzing
        </button>
      </div>

      {/* 💫 Floating Lights */}
      <div className="absolute top-24 right-12 w-24 h-24 bg-cyan-400 rounded-full opacity-10 animate-pulse-slow blur-2xl" />
      <div className="absolute bottom-24 left-16 w-32 h-32 bg-cyan-600 rounded-full opacity-10 animate-pulse-slow blur-2xl" />

      <style>{`
        .gate-btn {
          background: linear-gradient(135deg, #22c55e, #15803d);
          border-radius: 9999px;
          color: white;
          font-weight: 700;
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.5);
          transition: all 0.3s ease-in-out;
        }
        .gate-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 0 32px rgba(74, 222, 128, 0.7);
        }

        @keyframes scan {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }

        .animate-scan {
          animation: scan 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 6s infinite ease-in-out;
        }

        .font-detective {
          font-family: 'Courier New', Courier, monospace;
        }
      `}</style>
    </div>
  );
}
