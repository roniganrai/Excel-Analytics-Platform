import Button from "./ui/Button"
import MovingBorder from "./MovingBorder"
import { BarChart3, User, Settings } from "lucide-react"     
const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50  bg-slate-800/80 backdrop-blur-xl border-b border-slate-700/50 shadow-lg overflow-hidden">
      <MovingBorder color="blue" />
      <div className="relative z-10 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                Excel Analytics Platform
              </h1>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600 hover:border-slate-500 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300"
            >
              <User className="w-4 h-4 mr-2" />
              User Mode
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-300 hover:text-white hover:bg-slate-700/50 hover:scale-110 transition-all duration-300"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
