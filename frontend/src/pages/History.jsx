import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarMain from "../components/NavbarMain";
import SidebarDrawer from "../components/SidebarDrawer";
import Footer from "../components/Footer";
import detectiveBg from "../assests/b.gif";
import excelIcon from "../assests/excel-icon.png";

export default function History() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [uploadHistory, setUploadHistory] = useState([]);

  // 📥 Load upload history from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("uploadHistory")) || [];
    setUploadHistory(saved.slice(0, 10)); // limit to latest 10
  }, []);

  // 🗑️ Delete single upload
  const handleDelete = (index) => {
    const updated = uploadHistory.filter((_, i) => i !== index);
    setUploadHistory(updated);
    localStorage.setItem("uploadHistory", JSON.stringify(updated));
  };

  // 🔥 Clear all uploads
  const clearAll = () => {
    localStorage.removeItem("uploadHistory");
    setUploadHistory([]);
  };

  return (
    <div
      className="min-h-screen text-green-200 font-detective relative overflow-x-hidden"
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
        <h2 className="text-4xl font-bold text-center text-cyan-400 mb-6 animate-typewriter">
          📁 Upload History
        </h2>

        {uploadHistory.length === 0 ? (
          <p className="text-center text-cyan-200">
            No uploads yet. Try uploading a file.
          </p>
        ) : (
          <ul className="space-y-4">
            {uploadHistory.map((item, index) => (
              <li
                key={index}
                className="bg-black/60 p-4 rounded-lg border border-cyan-500 flex justify-between items-center gap-4"
              >
                <div className="flex items-center gap-4">
                  <img src={excelIcon} alt="Excel" className="w-8 h-8" />
                  <div>
                    <p className="text-cyan-100 font-semibold">{item.name}</p>
                    <p className="text-gray-300 text-sm">
                      {(item.size / 1024).toFixed(2)} KB
                    </p>
                    <p className="text-gray-400 text-xs">
                      Uploaded on: {new Date(item.date).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  {item.url ? (
                    <a
                      href={item.url}
                      download
                      className="text-xs bg-cyan-600 text-black font-semibold px-3 py-1 rounded hover:bg-cyan-400 transition"
                    >
                      ⬇️ Download
                    </a>
                  ) : (
                    <span className="text-xs text-gray-400 italic">No URL</span>
                  )}
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-xs bg-red-600 text-white font-semibold px-3 py-1 rounded hover:bg-red-400 transition"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {uploadHistory.length > 0 && (
          <div className="text-center mt-6">
            <button
              onClick={clearAll}
              className="btn-glow px-4 py-2 mt-4 text-sm"
            >
              🧹 Clear All History
            </button>
          </div>
        )}

        {/* ⬅️ Navigation */}
        <div className="text-center mt-10">
          <Link
            to="/upload"
            className="underline hover:text-cyan-300 block mb-2"
          >
            ← Back to Upload
          </Link>
          <Link to="/charts" className="btn-glow inline-block text-sm">
            📊 Go to Charts
          </Link>
        </div>
      </main>

      <Footer />

      <style>{`
        .font-detective {
          font-family: 'Courier New', Courier, monospace;
        }
        .btn-glow {
          background: linear-gradient(135deg, #84cc16, #3f6212);
          padding: 0.5rem 1.25rem;
          border-radius: 9999px;
          font-weight: 600;
          box-shadow: 0 0 15px rgba(132, 204, 22, 0.7);
          transition: all 0.3s ease-in-out;
        }
        .btn-glow:hover {
          transform: scale(1.05);
          box-shadow: 0 0 22px rgba(163, 230, 53, 0.8);
        }
        .animate-typewriter {
          overflow: hidden;
          border-right: .15em solid cyan;
          white-space: nowrap;
          animation:
            typing 3s steps(40, end),
            blink-caret .75s step-end infinite;
        }
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: cyan }
        }
      `}</style>
    </div>
  );
}
