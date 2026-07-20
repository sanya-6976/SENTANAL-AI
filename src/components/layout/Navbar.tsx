<<<<<<< Updated upstream
import { Bell, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { clearSession } from '../../utils/session'

function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    clearSession()
    navigate('/login')
  }

=======
import { useState, useEffect } from 'react'
import { Bell, Menu } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { getHeaderForPath } from '../../config/pageHeaders'

interface NavbarProps {
  onToggleSidebar: () => void
}

function Navbar({ onToggleSidebar }: NavbarProps) {
  const location = useLocation()
  const header = getHeaderForPath(location.pathname)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).toUpperCase()
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
  }

>>>>>>> Stashed changes
  return (
    <header className="bg-[#111827] border-b border-[rgba(255,255,255,0.06)] h-[69px] px-6 flex items-center justify-between select-none shrink-0 font-sans">
      
      {/* 1. Left Side: Mobile Drawer Toggle + Dynamic Active Page Title & Subtitle */}
      <div className="flex items-center gap-3.5 overflow-hidden min-w-0">
        <button
          onClick={onToggleSidebar}
          className="xl:hidden p-1.5 text-[#94A3B8] hover:text-white hover:bg-[#182235] rounded-lg transition-all cursor-pointer outline-none border border-transparent hover:border-[rgba(255,255,255,0.04)] active:scale-95 shrink-0"
          title="Open Mobile Navigation Drawer"
          aria-label="Open Mobile Navigation Drawer"
        >
          <Menu className="h-5.5 w-5.5" />
        </button>

        {/* Dynamic Page Header Title & Subtitle */}
        <div className="flex flex-col min-w-0 select-none animate-fade-in truncate">
          <h1 className="text-base md:text-lg font-extrabold tracking-tight text-[#F8FAFC] leading-none truncate">
            {header.title}
          </h1>
          <p className="text-[11px] font-medium tracking-wide text-[#94A3B8] mt-2.5 leading-none truncate hidden sm:block">
            {header.subtitle}
          </p>
        </div>
      </div>

      {/* 2. Right Side: Balanced Operational Telemetry */}
      <div className="flex items-center gap-4.5">
        
        {/* Live Date & Time counter */}
        <div className="hidden md:flex items-center gap-3 text-right font-mono select-none">
          <div className="text-[#F8FAFC] text-[11px] font-bold tracking-wider">{formatDate(time)}</div>
          <div className="h-3 w-[1px] bg-[rgba(255,255,255,0.08)]" />
          <div className="text-[#2563EB] text-[10px] font-bold tracking-widest uppercase">{formatTime(time)}</div>
        </div>

        {/* Separator pipe */}
        <div className="hidden md:block h-6 w-[1px] bg-[rgba(255,255,255,0.06)]" />

        {/* Status Badge */}
        <div className="flex items-center gap-2 bg-[#121826]/80 border border-[#2563EB]/35 px-3 py-1 rounded-lg shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] animate-pulse shrink-0" />
          <span className="text-[9px] font-mono font-bold tracking-widest text-[#F8FAFC] uppercase whitespace-nowrap">
            {header.role || 'SCRB Analyst'}
          </span>
        </div>

        {/* Separator pipe */}
        <div className="hidden sm:block h-6 w-[1px] bg-[rgba(255,255,255,0.06)]" />

        {/* System Notifications */}
        <button 
          onClick={() => alert("Opening secure operational logs alerts panel...")}
          className="relative p-2 text-[#94A3B8] hover:text-white hover:bg-[#182235] rounded-xl transition-all cursor-pointer duration-150 border border-transparent hover:border-[rgba(255,255,255,0.04)]"
          title="System Notifications"
        >
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#EF4444] border border-[#111827]" />
        </button>

        {/* Separator pipe */}
        <div className="hidden sm:block h-6 w-[1px] bg-[rgba(255,255,255,0.06)]" />

        {/* Officer Profile Metadata */}
        <div className="flex items-center gap-3">
<<<<<<< Updated upstream
          <div className="flex flex-col items-end text-right">
            <span className="text-xs font-bold text-white tracking-wide">DCP Anjan</span>
            <span className="text-[8px] font-mono tracking-widest text-[#94A3B8] uppercase font-bold mt-0.5">
=======
          <div className="hidden sm:flex flex-col text-right select-none">
            <span className="text-xs font-bold text-white tracking-wide leading-none">DCP Anjan</span>
            <span className="text-[7.5px] font-mono tracking-widest text-[#94A3B8]/60 uppercase font-bold mt-1.5 leading-none">
>>>>>>> Stashed changes
              Karnataka Police
            </span>
            <button 
              onClick={handleLogout}
              className="mt-1 flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-[#EF4444] hover:text-[#FCA5A5] transition-colors cursor-pointer"
            >
              <LogOut className="h-2.5 w-2.5" />
              <span>Log out</span>
            </button>
          </div>
          
          <div className="h-9 w-9 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/40 flex items-center justify-center text-white text-xs font-bold select-none cursor-pointer hover:border-[#2563EB]/70 transition-all duration-200" title="DCP Anjan Profile">
            <span>DA</span>
          </div>
        </div>

      </div>

    </header>
  )
}

export default Navbar
