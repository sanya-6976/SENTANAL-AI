import { CheckCircle2, Circle, Loader2, ShieldCheck } from 'lucide-react'

interface AIProcessingPanelProps {
  currentStepIndex: number
  uploadedFileName: string | null
  isProcessing: boolean
}

export function AIProcessingPanel({ currentStepIndex, uploadedFileName, isProcessing }: AIProcessingPanelProps) {
  const steps = [
    { label: 'OCR Extraction', desc: 'Scan document text and handwriting assets' },
    { label: 'Metadata Analysis', desc: 'Examine timestamps, GPS tags, headers' },
    { label: 'Entity Recognition', desc: 'Identify names, phone numbers, locations' },
    { label: 'Timeline Reconstruction', desc: 'Assemble chronologically aligned timeline events' },
    { label: 'Network Analysis', desc: 'Link communication entities and device links' },
    { label: 'Criminal Matching', desc: 'Cross-reference KSP databases for intelligence' },
    { label: 'AI Summary Generation', desc: 'Synthesize observations for investigators' },
  ]

  return (
    <div className="bg-[#121826] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-6 shadow-md transition-all duration-300 hover:border-[rgba(37,99,235,0.15)] flex flex-col h-full justify-between">
      <div>
        {/* Header section of Panel */}
        <div className="flex justify-between items-start mb-5 border-b border-[rgba(255,255,255,0.04)] pb-3">
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-[#F8FAFC]">AI Processing</h3>
            <p className="text-[9px] font-mono uppercase tracking-widest text-[#94A3B8] mt-1">Forensic Pipeline Status</p>
          </div>
          {isProcessing && (
            <div className="flex items-center gap-1.5 bg-[#2563EB]/15 border border-[#2563EB]/30 px-2 py-0.5 rounded text-[8px] font-mono text-white animate-pulse">
              <Loader2 className="h-2 w-2 animate-spin" />
              <span>RUNNING</span>
            </div>
          )}
        </div>

        {/* Current target info */}
        <div className="bg-[#0B1220]/80 border border-[rgba(255,255,255,0.04)] rounded-lg p-3 mb-6 select-none">
          <div className="text-[9px] font-mono text-[#94A3B8] uppercase tracking-wider">Active Target</div>
          <div className="flex items-center gap-2 mt-1">
            <ShieldCheck className={`h-4.5 w-4.5 shrink-0 ${uploadedFileName ? 'text-[#10B981]' : 'text-[#94A3B8]/30'}`} />
            <span className={`text-[11px] font-bold ${uploadedFileName ? 'text-white' : 'text-[#94A3B8]/40'}`}>
              {uploadedFileName ? uploadedFileName : 'SYSTEM IDLE // AWAITING EVIDENCE'}
            </span>
          </div>
        </div>

        {/* Steps List vertical layout with connectors */}
        <div className="relative pl-1 py-1 font-sans text-xs">
          <div className="space-y-4">
            {steps.map((step, idx) => {
              const isCompleted = isProcessing ? idx < currentStepIndex : (uploadedFileName ? true : false)
              const isCurrent = isProcessing && idx === currentStepIndex

              return (
                <div key={idx} className="flex items-start gap-3.5 relative group">
                  {/* Vertical Connector Line */}
                  {idx < steps.length - 1 && (
                    <div className={`absolute left-3 top-6 w-[1.5px] h-4.5 -translate-x-1/2 transition-colors duration-300 ${
                      isCompleted ? 'bg-[#2563EB]' : 'bg-[rgba(255,255,255,0.08)]'
                    }`} />
                  )}

                  {/* Step node icon */}
                  <div className="relative shrink-0 mt-0.5">
                    {isCompleted ? (
                      <CheckCircle2 className="h-6 w-6 text-[#2563EB] bg-[#2563EB]/10 rounded-full stroke-2" />
                    ) : isCurrent ? (
                      <div className="h-6 w-6 rounded-full bg-[#F59E0B]/10 border-2 border-[#F59E0B] flex items-center justify-center animate-pulse">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                      </div>
                    ) : (
                      <Circle className="h-6 w-6 text-[#94A3B8]/20 bg-[#0B1220] rounded-full stroke-1.5" />
                    )}
                  </div>

                  {/* Step details */}
                  <div className="flex flex-col select-none">
                    <span className={`text-[11.5px] font-bold tracking-wide transition-colors ${
                      isCompleted ? 'text-white/90' : isCurrent ? 'text-[#F59E0B] font-extrabold' : 'text-[#94A3B8]/40'
                    }`}>
                      {step.label}
                    </span>
                    <span className={`text-[9px] mt-0.5 ${
                      isCompleted ? 'text-[#94A3B8]/60' : isCurrent ? 'text-[#F59E0B]/70' : 'text-[#94A3B8]/20'
                    }`}>
                      {step.desc}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      
      {/* Footer system details */}
      <div className="border-t border-[rgba(255,255,255,0.04)] pt-3.5 mt-5">
        <div className="flex justify-between items-center text-[8px] font-mono text-[#94A3B8]/40">
          <span>PIPELINE ENGINE V2.4-SEC</span>
          <span>GPU ENGINE RUNNING</span>
        </div>
      </div>
    </div>
  )
}

export default AIProcessingPanel
