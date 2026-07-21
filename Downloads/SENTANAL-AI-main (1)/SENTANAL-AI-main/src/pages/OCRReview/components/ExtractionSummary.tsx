import { ListTodo, Clock, Award } from 'lucide-react'

export function ExtractionSummary() {
  const stats = [
    { label: 'Fields Extracted', value: '14 / 14', icon: ListTodo, color: 'text-[#2563EB] bg-[#2563EB]/10 border-[#2563EB]/20' },
    { label: 'Confidence Score', value: '98%', icon: Award, color: 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20' },
    { label: 'Processing Time', value: '3.2 seconds', icon: Clock, color: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20' }
  ]

  return (
    <div className="bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 shadow-sm space-y-4 select-none animate-fade-in w-full">
      
      {/* Title */}
      <div className="border-b border-[rgba(255,255,255,0.06)] pb-3">
        <h2 className="text-xs font-extrabold text-white tracking-widest uppercase font-mono">
          AI Extraction Summary
        </h2>
      </div>

      {/* Grid displays */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className={`p-4 border rounded-xl flex items-center gap-3.5 shadow-sm ${stat.color}`}
            >
              <div className="h-8.5 w-8.5 rounded bg-black/15 flex items-center justify-center shrink-0">
                <Icon className="h-4.5 w-4.5" />
              </div>

              <div>
                <span className="text-[9px] font-mono tracking-wider font-bold opacity-75 uppercase block">
                  {stat.label}
                </span>
                <span className="text-white font-extrabold text-xs tracking-wide block mt-0.5">
                  {stat.value}
                </span>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
export default ExtractionSummary
