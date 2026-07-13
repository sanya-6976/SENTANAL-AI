import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Database,
  BarChart3,
  Map,
  Briefcase,
  Network,
  Bot,
  FileSpreadsheet,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/crime-database', label: 'Crime Database', icon: Database },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/gis', label: 'GIS Intelligence', icon: Map },
  { to: '/investigation', label: 'Investigation Workspace', icon: Briefcase },
  { to: '/criminal-network', label: 'Criminal Network', icon: Network },
  { to: '/ai-assistant', label: 'AI Assistant', icon: Bot },
  { to: '/reports', label: 'Reports', icon: FileSpreadsheet },
  { to: '/settings', label: 'Settings', icon: Settings },
]

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`bg-[#111827] border-r border-[rgba(255,255,255,0.06)] shrink-0 transition-all duration-300 flex flex-col relative select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.06)] h-[69px]">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="p-1.5 bg-[#2563EB]/15 rounded-lg border border-[#2563EB]/30 shrink-0">
            <ShieldCheck className="h-5 w-5 text-[#2563EB]" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-wider text-white uppercase leading-none">SENTINEL AI</span>
              <span className="text-[9px] font-mono tracking-widest text-[#2563EB] font-bold mt-1 uppercase">KSP INTEL</span>
            </div>
          )}
        </div>

        {/* Collapsible toggle bubble button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-5 bg-[#111827] hover:bg-[#182235] border border-[rgba(255,255,255,0.08)] text-[#94A3B8] hover:text-white rounded-full p-1 shadow-md cursor-pointer transition-colors duration-150 z-10"
        >
          {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
        <ul className="space-y-1.5 px-3">
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-3.5 py-3 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 outline-none ${
                    isActive
                      ? 'bg-[#2563EB]/10 text-white border-l-2 border-[#2563EB]'
                      : 'text-[#94A3B8] hover:bg-[#182235]/60 hover:text-white'
                  }`
                }
                title={collapsed ? label : undefined}
              >
                <Icon className="h-[18px] w-[18px] shrink-0" />
                {!collapsed && (
                  <span className="truncate transition-opacity duration-300">{label}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer / Copyright Tag */}
      {!collapsed && (
        <div className="p-4 border-t border-[rgba(255,255,255,0.06)] text-center">
          <p className="text-[8px] font-mono text-[#94A3B8]/40 uppercase tracking-widest leading-normal">
            CONFIDENTIAL // INTERNAL USE ONLY
          </p>
        </div>
      )}
    </aside>
  )
}

export default Sidebar
