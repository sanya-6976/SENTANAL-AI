import { User, MapPin } from 'lucide-react'
import RiskIndicator from './RiskIndicator'
import RelationshipSummary from './RelationshipSummary'
import QuickActions from './QuickActions'

interface SelectedNodeProps {
  name: string
  age: number
  district: string
  status: string
  riskScore: number
  
  // Relationship Summary values
  firs: number
  associates: number
  vehicles: number
  phones: number
  locations: number
  arrests: number
  
  onAction: (actionName: string) => void
}

export function NodeCard({
  name,
  age,
  district,
  status,
  riskScore,
  firs,
  associates,
  vehicles,
  phones,
  locations,
  arrests,
  onAction
}: SelectedNodeProps) {
  return (
    <div className="bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 shadow-sm space-y-6 select-none animate-fade-in self-start w-full">
      
      {/* Title */}
      <div className="border-b border-[rgba(255,255,255,0.06)] pb-3">
        <h2 className="text-sm font-extrabold text-white tracking-widest uppercase font-mono">
          Selected Entity
        </h2>
      </div>

      {/* Suspect Bio Profile */}
      <div className="flex items-start gap-4 font-sans text-xs">
        {/* Biometric avatar */}
        <div className="h-16 w-16 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/25 text-[#EF4444] flex items-center justify-center shrink-0 shadow-inner">
          <User className="h-9 w-9 stroke-1.2 animate-pulse" />
        </div>

        {/* Biodata list */}
        <div className="space-y-1.5 flex-grow">
          <div className="flex flex-col">
            <span className="text-white font-extrabold text-sm tracking-wide">{name}</span>
            <span className="text-[#94A3B8]/60 font-mono text-[9px] uppercase tracking-wider mt-0.5">
              Accused Case Lead • Age {age}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[#94A3B8] text-[10.5px]">
            <MapPin className="h-3.5 w-3.5 text-[#2563EB] shrink-0" />
            <span>{district}</span>
          </div>

          <div>
            <span className="px-2 py-0.5 border border-[#F59E0B]/20 bg-[#F59E0B]/10 text-[#F59E0B] text-[8px] font-mono tracking-wider font-extrabold rounded-full uppercase">
              {status}
            </span>
          </div>
        </div>
      </div>

      {/* Threat progress score */}
      <div className="border-t border-[rgba(255,255,255,0.04)] pt-4">
        <RiskIndicator score={riskScore} />
      </div>

      {/* Relationships counts list */}
      <div className="border-t border-[rgba(255,255,255,0.04)] pt-4">
        <RelationshipSummary
          firs={firs}
          associates={associates}
          vehicles={vehicles}
          phones={phones}
          locations={locations}
          arrests={arrests}
        />
      </div>

      {/* Quick Action Buttons */}
      <div className="border-t border-[rgba(255,255,255,0.04)] pt-4">
        <QuickActions onAction={onAction} />
      </div>

    </div>
  )
}
export default NodeCard
