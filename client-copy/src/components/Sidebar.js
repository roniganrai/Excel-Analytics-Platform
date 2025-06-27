"use client"

import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Button from "./ui/Button"
import MovingBorder from "./MovingBorder"
import { Menu, LayoutDashboard, Upload, BarChart3, Users, Brain } from "lucide-react"

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  const sidebarItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard",
      active: location.pathname === "/dashboard",
    },
    {
      icon: Upload,
      label: "Upload Excel",
      path: "/upload",
      active: location.pathname === "/upload",
    },
    {
      icon: BarChart3,
      label: "Generate Charts",
      path: "/charts",
      active: location.pathname === "/charts",
    },
    {
      icon: Users,
      label: "User Management",
      path: "/admin/users",
      active: location.pathname === "/admin/users",
    },
    {
      icon: Brain,
      label: "AI Insights",
      path: "/ai-insights",
      active: location.pathname === "/ai-insights",
    },
  ]

  const handleNavigation = (path) => {
    navigate(path)
    setSidebarOpen(false) // Close sidebar after navigation on mobile
  }

  return (
    <>
      {/* Hamburger Menu Button - Below navbar on left corner */}
      <div className="fixed left-4 top-20 z-40">
        <div className="relative">
          <MovingBorder color="blue" className="opacity-75" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="relative z-10 bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 text-white hover:bg-slate-700/80 hover:border-slate-600/50 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-110 transition-all duration-300 rounded-xl"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Vertical Icon Sidebar - Centered vertically */}
      <div
        className={`fixed left-4 top-1/2 -translate-y-1/2 w-16 bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl transform transition-all duration-500 ease-in-out z-30 ${
          sidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
        }`}
      >
        <MovingBorder color="purple" />
        <div className="relative z-10 p-3">
          <div className="space-y-3">
            {sidebarItems.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${
                    item.active
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white hover:shadow-lg hover:shadow-slate-500/20"
                  } hover:scale-110`}
                >
                  <item.icon className="w-5 h-5" />
                </button>

                {/* Tooltip on hover - Proper positioning */}
                {hoveredItem === index && (
                  <div className="absolute left-16 top-1/2 -translate-y-1/2 ml-2 px-3 py-2 bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-lg shadow-xl z-[100] whitespace-nowrap pointer-events-none transition-all duration-200">
                    <span className="text-white text-sm font-medium">{item.label}</span>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800 border-l border-t border-slate-700/50 rotate-45"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </>
  )
}

export default Sidebar
