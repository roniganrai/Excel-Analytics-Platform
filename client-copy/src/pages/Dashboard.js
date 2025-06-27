"use client"
import Button from "../components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import MovingNetwork from "../components/MovingNetwork"
import MovingBorder from "../components/MovingBorder"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { FileText, TrendingUp, Download, UserCheck, Plus, FileSpreadsheet, Upload, BarChart3 } from "lucide-react"

const Dashboard = () => {
  const analyticsCards = [
    {
      title: "Files Uploaded",
      value: "12",
      icon: FileText,
      color: "blue",
      bgColor: "bg-blue-500/20",
      glowColor: "shadow-blue-500/20",
      borderColor: "blue",
    },
    {
      title: "Charts Generated",
      value: "45",
      icon: TrendingUp,
      color: "green",
      bgColor: "bg-green-500/20",
      glowColor: "shadow-green-500/20",
      borderColor: "green",
    },
    {
      title: "Downloads",
      value: "28",
      icon: Download,
      color: "purple",
      bgColor: "bg-purple-500/20",
      glowColor: "shadow-purple-500/20",
      borderColor: "purple",
    },
    {
      title: "Active Users",
      value: "156",
      icon: UserCheck,
      color: "orange",
      bgColor: "bg-orange-500/20",
      glowColor: "shadow-orange-500/20",
      borderColor: "orange",
    },
  ]

  const recentUploads = [
    { name: "Sales_Q4_2024.xlsx", time: "2 hours ago", status: "Processed" },
    { name: "Marketing_Data.xlsx", time: "1 day ago", status: "Processed" },
    { name: "Financial_Report.xlsx", time: "3 days ago", status: "Processed" },
  ]

  const quickActions = [
    { icon: Upload, label: "Upload New Excel File", primary: true },
    { icon: BarChart3, label: "Generate Chart", primary: false },
    { icon: Download, label: "Download Report", primary: false },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Add custom CSS animations */}
      <style jsx>{`
        @keyframes movingBorderTopRight {
          0% {
            clip-path: polygon(80% 0%, 100% 0%, 100% 80%);
            opacity: 0.8;
          }
          50% {
            clip-path: polygon(60% 0%, 100% 0%, 100% 60%);
            opacity: 1;
          }
          100% {
            clip-path: polygon(80% 0%, 100% 0%, 100% 80%);
            opacity: 0.8;
          }
        }

        @keyframes movingBorderBottomLeft {
          0% {
            clip-path: polygon(0% 20%, 20% 100%, 0% 100%);
            opacity: 0.8;
          }
          50% {
            clip-path: polygon(0% 40%, 40% 100%, 0% 100%);
            opacity: 1;
          }
          100% {
            clip-path: polygon(0% 20%, 20% 100%, 0% 100%);
            opacity: 0.8;
          }
        }
      `}</style>

      {/* Moving Network Background */}
      <div className="absolute inset-0 z-0">
        <MovingNetwork />
      </div>

      {/* Main Layout */}
      <div className="relative z-20 min-h-screen">
        {/* Top Navbar */}
        <Navbar />

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
         <div className="relative z-20 pt-16 pl-4 overflow-y-auto" style={{ height: '100vh' }}>
        <div className="p-6 pb-20">
        <main className="p-6 ml-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-2 hover:scale-105 transition-transform duration-300">
                Dashboard
              </h1>
              <p className="text-slate-400 text-lg">Welcome to Excel Analytics Platform</p>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {analyticsCards.map((card, index) => (
                <div key={index} className="relative overflow-hidden rounded-2xl">
                  <MovingBorder color={card.borderColor} />
                  <Card
                    className={`relative z-10 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600/50 hover:shadow-2xl hover:${card.glowColor} hover:-translate-y-2 transition-all duration-500 group cursor-pointer rounded-2xl`}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate-400 text-sm font-medium group-hover:text-slate-300 transition-colors">
                            {card.title}
                          </p>
                          <p className="text-4xl font-bold text-white mt-2 group-hover:scale-110 transition-transform duration-300">
                            {card.value}
                          </p>
                        </div>
                        <div
                          className={`p-4 rounded-2xl ${card.bgColor} group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg`}
                        >
                          <card.icon className={`w-7 h-7 text-${card.color}-400`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Uploads */}
              <div className="lg:col-span-2 relative overflow-hidden rounded-2xl">
                <MovingBorder color="green" />
                <Card className="relative z-10 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center group">
                      <TrendingUp className="w-6 h-6 mr-3 group-hover:scale-110 group-hover:text-blue-400 transition-all duration-300" />
                      <span className="group-hover:text-blue-100 transition-colors">Recent Uploads</span>
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Your latest Excel file uploads and processing status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentUploads.map((upload, index) => (
                        <div key={index} className="relative overflow-hidden rounded-xl">
                          <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/60 hover:shadow-lg hover:shadow-green-500/10 hover:scale-105 transition-all duration-300 group cursor-pointer">
                            <div className="flex items-center space-x-4">
                              <div className="p-3 bg-green-500/20 rounded-xl group-hover:bg-green-500/30 group-hover:scale-110 transition-all duration-300">
                                <FileSpreadsheet className="w-6 h-6 text-green-400" />
                              </div>
                              <div>
                                <p className="text-white font-medium group-hover:text-green-100 transition-colors">
                                  {upload.name}
                                </p>
                                <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">
                                  {upload.time}
                                </p>
                              </div>
                            </div>
                            <span className="px-4 py-2 bg-green-500/20 text-green-300 text-sm rounded-full border border-green-500/30 group-hover:bg-green-500/30 group-hover:scale-105 transition-all duration-300">
                              {upload.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="relative overflow-hidden rounded-2xl">
                <MovingBorder color="purple" />
                <Card className="relative z-10 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center group">
                      <Plus className="w-6 h-6 mr-3 group-hover:scale-110 group-hover:text-purple-400 transition-all duration-300" />
                      <span className="group-hover:text-purple-100 transition-colors">Quick Actions</span>
                    </CardTitle>
                    <CardDescription className="text-slate-400">Common tasks and features</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {quickActions.map((action, index) => (
                        <Button
                          key={index}
                          className={`w-full justify-start h-14 transition-all duration-500 group ${
                            action.primary
                              ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-105"
                              : "bg-slate-700/50 hover:bg-slate-600 border border-slate-600 hover:border-slate-500 text-white hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105"
                          }`}
                          variant={action.primary ? "default" : "outline"}
                        >
                          <action.icon className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                          <span className="font-medium">{action.label}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
</div>
</div>
  )
}

export default Dashboard
