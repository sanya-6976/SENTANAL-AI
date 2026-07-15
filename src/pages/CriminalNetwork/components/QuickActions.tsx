import { FolderOpen, FileText, Download, Sparkles } from 'lucide-react'

interface QuickActionsProps {
  onAction: (actionName: string) => void
}

export function QuickActions({ onAction }: QuickActionsProps) {
  const actionsList = [
    { name: 'Open Investigation', icon: FolderOpen },
    { name: 'View FIR History', icon: FileText },
    { name: 'Generate Report', icon: Download },
    { name: 'Ask AI Assistant', icon: Sparkles, isAi: true }
  ]

  return (
    <div className="space-y-4 select-none font-sans text-xs pt-1.5">
      
      {/* Title */}
      <div className="text-[10px] font-mono tracking-widest text-[#94A3B8] font-bold uppercase border-b border-[rgba(255,255,255,0.06)] pb-2.5 mb-1.5">
        Quick Actions
      </div>

      <div className="flex flex-col gap-2">
        {actionsList.map((act) => {
          const Icon = act.icon
          return (
            <button
              key={act.name}
              onClick={() => onAction(act.name)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[9.5px] tracking-widest uppercase font-bold transition-all duration-150 cursor-pointer outline-none focus:ring-1 focus:ring-[#2563EB] group ${
                act.isAi
                  ? 'bg-gradient-to-r from-[#2563EB] to-indigo-600 hover:from-[#1D4ED8] hover:to-indigo-700 text-white hover:shadow-[0_4px_16px_rgba(37,99,235,0.25)]'
                  : 'bg-[#0B1220] border border-[rgba(255,255,255,0.06)] text-white hover:border-[#2563EB]/40 hover:bg-[#182235]/40'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${act.isAi ? 'text-white' : 'text-[#2563EB]'}`} />
                <span>{act.name}</span>
              </div>
            </button>
          )
        })}
      </div>

    </div>
  )
}
export default QuickActions
