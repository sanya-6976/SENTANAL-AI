import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Database,
  Map,
  Briefcase,
  FolderUp,
  Scan,
  Languages,
  Network,
  GitCompare,
  Mic,
  BookOpen,
  Layers,
  X
} from 'lucide-react'
import kspLogo from '../../assets/ksp-logo.jpg'

interface SidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
}

interface NavItem {
  to: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

interface NavGroup {
  title: string
  items: NavItem[]
}

export function Sidebar({ collapsed, onToggleCollapse, mobileOpen, setMobileOpen }: SidebarProps) {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null)

  // Bind key events: dismiss mobile/tablet drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen, setMobileOpen])

  // Grouped Navigation Items matching exact team architecture
  const navGroups: NavGroup[] = [
    {
      title: '⚡ CORE FEATURES',
      items: [
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/crime-database', label: 'Crime Database', icon: Database },
        { to: '/gis', label: 'GIS Intelligence', icon: Map },
        { to: '/investigation', label: 'Investigation Workspace', icon: Briefcase },
        { to: '/reports', label: 'FIR Upload', icon: FolderUp },
        { to: '/ocr-review', label: 'OCR Review', icon: Scan }
      ]
    },
    {
      title: '✨ SPECIAL FEATURES',
      items: [
        { to: '/multilingual-ai', label: 'Multilingual AI', icon: Languages },
        { to: '/digital-intelligence', label: 'Digital Intelligence Hub', icon: Layers },
        { to: '/criminal-network', label: 'Criminal Network', icon: Network },
        { to: '/crime-pattern-similarity', label: 'AI Crime Pattern Similarity', icon: GitCompare },
        { to: '/voice-search', label: 'Voice Search', icon: Mic },
        { to: '/investigation-diary', label: 'Officer Investigation Diary', icon: BookOpen }
      ]
    }
  ]

  const sidebarWidthClass = mobileOpen ? 'w-[260px]' : collapsed ? 'w-20' : 'w-[260px]'

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 xl:relative xl:z-0 bg-[#0B0F19] border-r border-[rgba(255,255,255,0.06)] shrink-0 transition-all duration-300 ease-in-out flex flex-col justify-between select-none ${sidebarWidthClass} ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'
      }`}
      aria-label="Application Main Sidebar Navigation"
    >
      
      {/* 1. Header Branding Area with KSP Logo Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.06)] h-[69px] shrink-0 overflow-hidden">
        <div className="flex items-center gap-3.5 overflow-hidden">
          
          {/* Karnataka State Police Logo Button (Primary Toggle Control) */}
          <button
            onClick={onToggleCollapse}
            className="h-9.5 w-9.5 rounded-lg overflow-hidden border border-[#2563EB]/40 hover:border-[#2563EB] hover:scale-105 hover:shadow-[0_0_16px_rgba(37,99,235,0.45)] active:scale-95 flex items-center justify-center shrink-0 cursor-pointer transition-all duration-200 outline-none group relative"
            title={collapsed ? "Click KSP Logo to Expand Sidebar" : "Click KSP Logo to Collapse Sidebar"}
            aria-label="Toggle Sidebar via KSP Logo"
          >
            <img 
              src={kspLogo} 
              alt="Karnataka State Police Logo" 
              className="h-full w-full object-cover filter brightness-95 group-hover:brightness-110 transition-all duration-200" 
            />
          </button>
          
          {/* Title & Subtitle (Hides smoothly when collapsed) */}
          <div
            onClick={onToggleCollapse}
            className={`flex flex-col select-none cursor-pointer transition-all duration-300 ease-in-out ${
              collapsed ? 'opacity-0 max-w-0 overflow-hidden pointer-events-none' : 'opacity-100 max-w-[170px]'
            }`}
          >
            <span className="font-extrabold text-sm tracking-wider text-white uppercase leading-none whitespace-nowrap hover:text-[#2563EB] transition-colors">
              SENTINEL AI
            </span>
            <span className="text-[7.5px] font-mono tracking-widest text-[#2563EB] font-bold mt-1.5 uppercase leading-none truncate whitespace-nowrap">
              AI Crime Intelligence OS
            </span>
          </div>
        </div>

        {/* Mobile close toggle button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="xl:hidden p-1 bg-[#121826] hover:bg-[#182235] text-[#94A3B8] hover:text-white rounded border border-[rgba(255,255,255,0.08)] cursor-pointer transition-colors"
          title="Close Sidebar Drawer"
        >
          <X className="h-4.5 w-4.5" />
        </button>
      </div>

      {/* 2. Grouped Navigation Items List */}
      <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden space-y-5 px-3 custom-scrollbar">
        {navGroups.map((group, gIdx) => (
          <div key={group.title} className="space-y-1.5">
            
            {/* Group Title Header */}
            {!collapsed ? (
              <span className="text-[8.5px] font-mono tracking-widest text-[#94A3B8]/50 font-bold uppercase block px-3.5">
                {group.title}
              </span>
            ) : gIdx > 0 ? (
              <div className="h-[1px] bg-[rgba(255,255,255,0.04)] mx-3 my-2" />
            ) : null}

            {/* Nav List Group Items */}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const IconComponent = item.icon
                return (
                  <li key={item.to} className="relative group/item">
                    <NavLink
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      onMouseEnter={() => setHoveredLabel(item.label)}
                      onMouseLeave={() => setHoveredLabel(null)}
                      className={({ isActive }) =>
                        `flex items-center gap-3.5 ${collapsed ? 'justify-center px-0' : 'px-3.5'} py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 outline-none relative cursor-pointer select-none group/btn ${
                          isActive
                            ? 'bg-[#2563EB]/15 text-white border-l-4 border-[#2563EB] shadow-sm'
                            : 'text-[#94A3B8] hover:bg-[#182235]/60 hover:text-white'
                        }`
                      }
                    >
                      <IconComponent className="h-4.5 w-4.5 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                      
                      {/* Label Text (hidden smoothly when collapsed) */}
                      <span
                        className={`truncate select-none transition-all duration-300 ${
                          collapsed ? 'opacity-0 max-w-0 hidden' : 'opacity-100 max-w-[170px]'
                        }`}
                      >
                        {item.label}
                      </span>
                    </NavLink>

                    {/* Hover Tooltip when Collapsed */}
                    {collapsed && hoveredLabel === item.label && (
                      <div className="absolute left-[76px] top-1/2 -translate-y-1/2 bg-[#0F172A] border border-[rgba(255,255,255,0.12)] text-[#F8FAFC] text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl z-50 pointer-events-none whitespace-nowrap backdrop-blur-md flex items-center gap-1.5 animate-fade-in">
                        <span>{item.label}</span>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>

          </div>
        ))}
      </nav>

    </aside>
  )
}

export default Sidebar
