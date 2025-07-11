import { Link } from "react-router-dom";
import React, { useState } from "react";
import NavbarMain from "../components/NavbarMain";
import SidebarDrawer from "../components/SidebarDrawer";
import Footer from "../components/Footer";
import detectiveBg from "../assests/b.gif";

export default function Chat() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = () => {
    const lowered = query.toLowerCase();
    const data = JSON.parse(localStorage.getItem("excelData"));

    if (
      lowered.includes("highest") ||
      lowered.includes("maximum") ||
      lowered.includes("greatest")
    ) {
      if (data && data.length > 0) {
        const keys = Object.keys(data[0]);
        const labelKey = keys[0];
        const valueKey = keys[1]; // assumes numeric

        const highest = data.reduce((max, row) =>
          parseFloat(row[valueKey]) > parseFloat(max[valueKey]) ? row : max
        );

        setResponse(
          `🔍 Highest ${valueKey} is ${highest[valueKey]} (Label: ${highest[labelKey]})`
        );
      } else {
        setResponse("⚠️ No data found. Please upload your Excel file first.");
      }
    } else {
      setResponse(
        "🤖 I'm still learning. Try: 'What is the highest value?' or 'Maximum sales?'"
      );
    }
  };

  const handleReset = () => {
    setQuery("");
    setResponse("");
  };

  const handleExample = () => {
    setQuery("What is the highest value?");
  };

  return (
    <div
      className="min-h-screen font-detective relative text-white"
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

      <main className="relative z-10 px-6 py-12 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-cyan-300 mb-6 text-center">
          🧠 Ask Excel AI
        </h2>
        <p className="text-cyan-100 mb-6 text-center">
          Ask smart questions based on your uploaded Excel file.
        </p>

        {/* 📥 Input Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="e.g., What is the highest value?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md text-black"
          />
          <button onClick={handleAsk} className="btn-glow px-4 py-2 text-sm">
            Ask
          </button>
          <button
            onClick={handleReset}
            className="btn-glow bg-red-600 hover:bg-red-400 px-4 py-2 text-sm"
          >
            Reset
          </button>
        </div>

        {/* 💡 Example & Navigation */}
        <div className="flex gap-4 flex-wrap justify-center mb-6">
          <button
            onClick={handleExample}
            className="bg-cyan-700 hover:bg-cyan-500 text-black px-3 py-1 text-xs rounded font-semibold"
          >
            💡 Try: Highest?
          </button>
          <a href="/upload" className="btn-glow text-sm px-4 py-1">
            📁 Upload
          </a>
          <Link to="/charts" className="btn-glow text-sm px-4 py-1">
            📊 Charts
          </Link>
        </div>

        {/* 🧠 Response Area */}
        {response && (
          <div className="bg-black/60 border border-cyan-400 p-4 rounded-lg">
            <p className="text-cyan-200">{response}</p>
          </div>
        )}
      </main>

      <Footer />

      {/* 💫 Custom Glow Button & Font Style */}
      <style>{`
        .btn-glow {
          background: linear-gradient(135deg, #84cc16, #3f6212);
          padding: 0.5rem 1.25rem;
          border-radius: 9999px;
          font-weight: 600;
          box-shadow: 0 0 15px rgba(132, 204, 22, 0.7);
          transition: all 0.3s ease-in-out;
          color: black;
        }
        .btn-glow:hover {
          transform: scale(1.05);
          box-shadow: 0 0 22px rgba(163, 230, 53, 0.8);
        }
        .font-detective {
          font-family: 'Courier New', Courier, monospace;
        }
      `}</style>
    </div>
  );
}
