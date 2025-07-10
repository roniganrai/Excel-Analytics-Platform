import React, { useEffect, useState, useRef } from "react";
import {
  Bar,
  Pie,
  Line,
  Radar,
  Doughnut,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Link } from "react-router-dom";

import NavbarMain from "../components/NavbarMain";
import SidebarDrawer from "../components/SidebarDrawer";
import Footer from "../components/Footer";

import detectiveBg from "../assests/b.gif";

// ✅ Chart.js registration
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
  Legend
);

export default function Charts() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState([]);
  const [chartType, setChartType] = useState("Bar");
  const [isDark, setIsDark] = useState(true);
  const chartRef = useRef();

  // ⏬ Load data from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("excelData"));
    if (data?.length) {
      const keys = Object.keys(data[0]);
      setExcelData(data);
      setColumns(keys);
      setXAxis(keys[0]);
      setYAxis([keys[1]]);
    }
  }, []);

  const labels = excelData.map((row) => row[xAxis] ?? "");

  const datasets = yAxis.map((col, idx) => ({
    label: col,
    data: excelData.map((row) =>
      typeof row[col] === "number" ? row[col] : parseFloat(row[col]) || 0
    ),
    backgroundColor: `hsl(${(idx * 360) / yAxis.length}, 70%, 50%)`,
    borderColor: `hsl(${(idx * 360) / yAxis.length}, 70%, 40%)`,
    borderWidth: 1,
    fill: true,
  }));

  const chartData = { labels, datasets };

  const pieDoughnutData = {
    labels,
    datasets: [
      {
        label: yAxis[0],
        data: datasets[0]?.data || [],
        backgroundColor: labels.map(
          (_, i) => `hsl(${(i * 360) / labels.length}, 70%, 50%)`
        ),
        borderColor: labels.map(
          (_, i) => `hsl(${(i * 360) / labels.length}, 70%, 40%)`
        ),
        borderWidth: 1,
      },
    ],
  };

  const ChartComponent = {
    Bar: <Bar data={chartData} />,
    Line: <Line data={chartData} />,
    Radar: <Radar data={chartData} />,
    Pie: <Pie data={pieDoughnutData} />,
    Doughnut: <Doughnut data={pieDoughnutData} />,
  }[chartType];

  // 📥 Save as PNG
  const downloadAsImage = async () => {
    const canvas = await html2canvas(chartRef.current);
    const link = document.createElement("a");
    link.download = "chart.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  // 🧾 Save as PDF
  const downloadAsPDF = async () => {
    const canvas = await html2canvas(chartRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 100);
    pdf.save("chart.pdf");
  };

  return (
    <div
      className={`min-h-screen font-detective relative ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
      style={{
        backgroundImage: isDark ? `url(${detectiveBg})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      {isDark && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-0" />
      )}

      <NavbarMain onToggleDrawer={() => setIsDrawerOpen(true)} />
      <SidebarDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <main className="relative z-10 px-6 py-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-cyan-300">
            📊 Filterable Charts
          </h2>
          <button
            onClick={() => setIsDark(!isDark)}
            className="px-4 py-2 rounded-full border border-cyan-400 text-sm hover:bg-cyan-600"
          >
            Toggle {isDark ? "Light" : "Dark"} Theme
          </button>
        </div>

        {/* 🔁 Navigation */}
        <div className="flex flex-wrap gap-4 mb-10">
          <Link to="/upload" className="btn-glow text-sm">🧾 Upload File</Link>
          <Link to="/history" className="btn-glow text-sm">📁 File History</Link>
          <Link to="/chat" className="btn-glow text-sm">🧠 Interrogate AI</Link>
          <Link to="/home" className="btn-glow text-sm">🏠 Home</Link>
        </div>

        {/* 📊 Chart Config */}
        {excelData.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm mb-1 text-cyan-300">📌 X-Axis</label>
                <select
                  value={xAxis}
                  onChange={(e) => setXAxis(e.target.value)}
                  className="w-full p-2 border rounded text-black"
                >
                  {columns.map((col) => (
                    <option key={col}>{col}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1 text-cyan-300">📈 Y-Axis</label>
                <select
                  multiple
                  value={yAxis}
                  onChange={(e) =>
                    setYAxis(Array.from(e.target.selectedOptions, (o) => o.value))
                  }
                  className="w-full p-2 border rounded text-black h-32"
                >
                  {columns.map((col) => (
                    <option key={col}>{col}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1 text-cyan-300">📊 Chart Type</label>
                <select
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                  className="w-full p-2 border rounded text-black"
                >
                  <option value="Bar">Bar</option>
                  <option value="Line">Line</option>
                  <option value="Radar">Radar</option>
                  <option value="Pie">Pie</option>
                  <option value="Doughnut">Doughnut</option>
                </select>
              </div>
            </div>

            {/* 🖼️ Chart Preview */}
            <div
              ref={chartRef}
              className="bg-black/70 p-6 rounded-lg border border-cyan-500 shadow-lg mb-6"
            >
              <h3 className="text-xl mb-4 text-cyan-300">{chartType} Chart</h3>
              {ChartComponent}
            </div>

            {/* ⬇️ Download Options */}
            <div className="flex gap-4 justify-center mb-8">
              <button onClick={downloadAsImage} className="btn-glow px-4 py-2 text-sm">
                📸 Download Image
              </button>
              <button onClick={downloadAsPDF} className="btn-glow px-4 py-2 text-sm">
                🧾 Download PDF
              </button>
            </div>

            {/* 🧮 Data Table */}
            <div className="overflow-auto bg-black/60 border border-cyan-400 rounded-lg p-4 text-sm max-h-96">
              <h3 className="text-cyan-300 mb-2">🔍 Data Preview</h3>
              <table className="min-w-full text-left">
                <thead className="border-b border-cyan-600">
                  <tr>
                    {columns.map((key) => (
                      <th key={key} className="px-2 py-1">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {excelData.map((row, idx) => (
                    <tr key={idx} className="border-t border-cyan-700">
                      {columns.map((col) => (
                        <td key={col} className="px-2 py-1">{row[col] ?? ""}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-400 text-lg">
            ❌ No Excel data found. Please upload a file first.
          </p>
        )}
      </main>

      <Footer />

      {/* 🌟 Custom Styles */}
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
      `}</style>
    </div>
  );
}
