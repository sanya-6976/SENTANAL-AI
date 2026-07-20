import { Bell, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { clearSession } from '../../utils/session'

function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    clearSession()
    navigate('/login')
  }

  return (
    <header className="bg-[#111827] border-b border-[rgba(255,255,255,0.06)] h-[69px] px-6 flex items-center justify-between select-none shrink-0">
      {/* Page Title */}
      <h2 className="text-lg font-bold tracking-tight text-white uppercase font-sans">
        Dashboard
      </h2>

      {/* Header operations controls */}
      <div className="flex items-center gap-4.5">
        
        {/* Notification bell icon with alert count indicator */}
        <button 
          onClick={() => alert("Opening secure operational logs alerts panel...")}
          className="relative p-2 text-[#94A3B8] hover:text-white hover:bg-[#182235] rounded-xl transition-all cursor-pointer duration-150 border border-transparent hover:border-[rgba(255,255,255,0.04)]"
        >
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#EF4444] border border-[#111827]" />
        </button>

        {/* Separator pipe */}
        <div className="h-6 w-[1px] bg-[rgba(255,255,255,0.06)]" />

        {/* Profile Card avatar metadata */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end text-right">
            <span className="text-xs font-bold text-white tracking-wide">DCP Anjan</span>
            <span className="text-[8px] font-mono tracking-widest text-[#94A3B8] uppercase font-bold mt-0.5">
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
          
          <div className="h-9 w-9 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/40 flex items-center justify-center text-white text-xs font-bold select-none cursor-pointer hover:border-[#2563EB]/70 transition-all duration-200">
            <span>DA</span>
          </div>
        </div>

      </div>
    </header>
  )
}

export default Navbar
