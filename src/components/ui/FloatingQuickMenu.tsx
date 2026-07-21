import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldUser, Mic, ClipboardCheck, Laptop, X } from 'lucide-react'

interface QuickActionItem {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  route: string
  ringColor: string
}

const quickActions: QuickActionItem[] = [
  {
    id: 'voice-search',
    title: 'Voice Search',
    description: 'Capture spoken commands for faster threat discovery.',
    icon: Mic,
    route: '/voice-search',
    ringColor: 'ring-[#38BDF8]/30',
  },
  {
    id: 'investigation-diary',
    title: 'Investigation Diary',
    description: 'Log case notes and officer observations securely.',
    icon: ClipboardCheck,
    route: '/investigation-diary',
    ringColor: 'ring-[#10B981]/30',
  },
  {
    id: 'digital-intelligence',
    title: 'Digital Intelligence',
    description: 'Open the command center for advanced analysis.',
    icon: Laptop,
    route: '/digital-intelligence',
    ringColor: 'ring-[#2563EB]/30',
  },
]

export default function FloatingQuickMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleNavigate = (route: string) => {
    navigate(route)
    setIsOpen(false)
  }

  return (
    <div
      ref={menuRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans"
      aria-label="Dashboard Quick Action Launcher"
    >
      <div className={`transform transition-all duration-300 origin-bottom-right ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <div className="grid gap-3 rounded-[28px] border border-white/10 bg-[#0B1220]/95 p-4 shadow-[0_28px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl w-[320px]">
          <div className="space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <button
                  key={action.id}
                  onClick={() => handleNavigate(action.route)}
                  className={`group flex w-full items-start gap-4 rounded-3xl border border-white/10 bg-[#111827]/95 px-4 py-4 text-left transition hover:-translate-y-0.5 hover:border-[#2563EB]/30 hover:bg-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 ${action.ringColor}`}
                >
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500/10 via-indigo-500/10 to-violet-500/10 border border-white/10 shadow-[0_18px_40px_rgba(56,189,248,0.16)]">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-500/10 via-transparent to-violet-500/10 opacity-70" />
                    <Icon className="relative h-6 w-6 text-sky-300" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#F8FAFC]">{action.title}</p>
                    <p className="mt-1 text-xs leading-5 text-[#94A3B8]">{action.description}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`relative flex h-14 w-14 items-center justify-center rounded-full border transition duration-300 shadow-[0_20px_48px_rgba(37,99,235,0.3)] ${isOpen ? 'bg-[#1E293B] border-[#2563EB]/40 text-white shadow-[0_0_26px_rgba(37,99,235,0.45)]' : 'bg-gradient-to-br from-[#121826] to-[#0F172A] border-[#2563EB]/35 text-[#60A5FA]'}`}
        aria-expanded={isOpen}
        aria-label="Toggle Quick Action Launcher"
      >
        {isOpen ? <X className="h-6 w-6" /> : <ShieldUser className="h-6 w-6" />}
      </button>
    </div>
  )
}
