import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import detectiveBg from "../assets/b.gif";
import excelIcon from "../assets/excel-icon.png";
import NavbarMain from "../components/NavbarMain";
import SidebarDrawer from "../components/SidebarDrawer";
import Footer from "../components/Footer";

export default function Upload() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const validExtensions = [".xls", ".xlsx"];

  const handleFileChange = (file) => {
    const extension = file.name
      .substring(file.name.lastIndexOf("."))
      .toLowerCase();
    if (!validExtensions.includes(extension)) {
      setErrorMsg("⚠️ Please upload a valid Excel file (.xls or .xlsx)");
      setSelectedFile(null);
      return;
    }
    setErrorMsg("");
    setSelectedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) handleFileChange(file);
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    setIsLoading(true);
    setProgress(0);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
      const previewData = jsonData.slice(0, 100);

      try {
        localStorage.setItem("excelData", JSON.stringify(previewData));
      } catch (err) {
        alert("🛑 File too large. Please try a smaller file.");
        setIsLoading(false);
        return;
      }

      const url = URL.createObjectURL(selectedFile);
      const uploadEntry = {
        name: selectedFile.name,
        size: selectedFile.size,
        date: new Date().toISOString(),
        url,
      };

      const prevHistory =
        JSON.parse(localStorage.getItem("uploadHistory")) || [];
      localStorage.setItem(
        "uploadHistory",
        JSON.stringify([uploadEntry, ...prevHistory])
      );

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsLoading(false);
              navigate("/charts");
            }, 400);
            return 100;
          }
          return prev + 12;
        });
      }, 120);
    };

    reader.readAsArrayBuffer(selectedFile);
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
          Ready for your data mission ?
        </h2>

        {/* Instructions */}
        <div className="bg-black/60 p-4 rounded-md border border-cyan-500 mb-10">
          <h3 className="text-cyan-300 font-semibold text-lg mb-2">
            📋 Upload Rules:
          </h3>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>Only Excel files (.xls, .xlsx) accepted</li>
            <li>Only first 100 rows analyzed</li>
            <li>Drag & drop works too!</li>
            <li>Magic happens instantly ✨</li>
          </ul>
        </div>

        {/* Upload Zone */}
        <div
          className="border-2 border-dashed border-cyan-500 p-8 rounded-xl bg-black/70 text-center"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <p className="mb-4 text-cyan-100">📂 Drag your file here or...</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <label className="btn-glow cursor-pointer">
              Choose File
              <input
                type="file"
                accept=".xls,.xlsx"
                onChange={handleFileInput}
                hidden
              />
            </label>

            <button
              onClick={handleUpload}
              disabled={!selectedFile || isLoading}
              className={`btn-glow px-6 py-2 ${
                isLoading ? "opacity-50 cursor-wait" : ""
              }`}
            >
              {isLoading ? "Processing..." : "📊 Analyze File"}
            </button>
          </div>

          {/* File Info */}
          {selectedFile && (
            <div className="mt-6 bg-black/70 border border-cyan-400 rounded-lg p-4 flex items-center gap-4 justify-center">
              <img src={excelIcon} alt="Excel Icon" className="w-8 h-8" />
              <div>
                <p className="text-cyan-100 text-sm">{selectedFile.name}</p>
                <p className="text-gray-400 text-xs">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          )}

          {/* Error */}
          {errorMsg && <p className="text-red-400 text-sm mt-4">{errorMsg}</p>}

          {/* Progress */}
          {isLoading && (
            <div className="w-full bg-cyan-900/30 rounded-full h-3 mt-6">
              <div
                className="bg-cyan-400 h-full transition-all ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Back link */}
        <div className="text-center mt-8 text-cyan-100 text-sm">
          <Link to="/home" className="underline hover:text-cyan-300">
            ← Go back to dashboard
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
