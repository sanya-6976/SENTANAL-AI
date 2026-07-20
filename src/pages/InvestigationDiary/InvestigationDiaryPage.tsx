import { useState } from 'react'
import {
  FileText,
  Paperclip,
  Sparkles,
  Video,
  Camera,
  FileSearch,
  Phone,
  MapPin,
  ShieldCheck,
  Briefcase
} from 'lucide-react'

interface LinkedEvidenceItem {
  type: string
  date: string
  status: string
  icon: any
  color: string
}

export function InvestigationDiaryPage() {
  const [selectedCase, setSelectedCase] = useState('FIR 45/2026')
  const [notesInput, setNotesInput] = useState(
    'Recorded witness statement from shopkeeper near ATM booth at 14:30 IST. Verified suspect vehicle registration (KA-04-MB-8921). Hash verification completed for seized SSD hard drive.'
  )

  const linkedEvidence: LinkedEvidenceItem[] = [
    { type: 'FIR Document', date: '14 Jul 2026', status: 'Verified', icon: FileText, color: 'text-[#2563EB]' },
    { type: 'CCTV Footage', date: '15 Jul 2026', status: 'Parsed', icon: Video, color: 'text-[#38BDF8]' },
    { type: 'Photographs', date: '16 Jul 2026', status: 'Cataloged', icon: Camera, color: 'text-[#F59E0B]' },
    { type: 'Forensic Report', date: '18 Jul 2026', status: 'Attached', icon: FileSearch, color: 'text-[#10B981]' },
    { type: 'Call Detail Record', date: '19 Jul 2026', status: 'Extracted', icon: Phone, color: 'text-[#8B5CF6]' },
    { type: 'GPS History', date: '20 Jul 2026', status: 'Analyzed', icon: MapPin, color: 'text-[#EC4899]' }
  ]

  return (
    <div className="space-y-8 animate-fade-in select-none max-w-[1600px] mx-auto pb-12 font-sans">
      
      {/* SECTION 1: LINKED FIRS / CASE SELECTOR */}
      <div className="bg-[#0B1220] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.06)] pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#94A3B8] uppercase font-bold tracking-wider block">
                Linked Case Record
              </span>
              <h2 className="text-sm font-extrabold text-white">Select Active Investigation FIR</h2>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={selectedCase}
              onChange={(e) => setSelectedCase(e.target.value)}
              className="bg-[#080D1A] border border-[rgba(255,255,255,0.1)] text-white text-xs font-mono rounded-xl px-4 py-2.5 outline-none focus:border-[#10B981] w-full md:w-80 cursor-pointer"
            >
              <option value="FIR 45/2026">FIR 45/2026 — Cyber Fraud (Bangalore City)</option>
              <option value="FIR 88/2026">FIR 88/2026 — ATM Heist (Mysore Urban)</option>
              <option value="FIR 102/2026">FIR 102/2026 — Jewellery Theft (Hubballi)</option>
            </select>
          </div>
        </div>

        {/* Selected Case Telemetry */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs pt-1">
          <div className="bg-[#080D1A] p-2.5 rounded-lg border border-[rgba(255,255,255,0.04)]">
            <span className="text-[9px] text-[#94A3B8] uppercase block font-bold">Linked FIR</span>
            <span className="text-[#10B981] font-bold">{selectedCase}</span>
          </div>
          <div className="bg-[#080D1A] p-2.5 rounded-lg border border-[rgba(255,255,255,0.04)]">
            <span className="text-[9px] text-[#94A3B8] uppercase block font-bold">Offense Section</span>
            <span className="text-white font-bold">IPC 420 / IT Act 66D</span>
          </div>
          <div className="bg-[#080D1A] p-2.5 rounded-lg border border-[rgba(255,255,255,0.04)]">
            <span className="text-[9px] text-[#94A3B8] uppercase block font-bold">District Unit</span>
            <span className="text-[#38BDF8] font-bold">Bangalore City (Cyber PS)</span>
          </div>
          <div className="bg-[#080D1A] p-2.5 rounded-lg border border-[rgba(255,255,255,0.04)]">
            <span className="text-[9px] text-[#94A3B8] uppercase block font-bold">Investigating Officer</span>
            <span className="text-white font-bold">DCP Anjan (KSP-SCRB)</span>
          </div>
        </div>
      </div>

      {/* SECTION 2 & 3: INVESTIGATION NOTES & AI ORGANIZED NOTES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Section 2: Officer Investigation Notes (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="bg-[#0B1220] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4.5 w-4.5 text-[#10B981]" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    Officer Investigation Notes
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-[#94A3B8]">Case Journal Entry</span>
              </div>

              <textarea
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Record daily field observation notes, witness statements, and evidence updates..."
                rows={8}
                className="w-full bg-[#080D1A] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 text-xs text-white placeholder-[#94A3B8]/40 focus:outline-none focus:border-[#10B981] font-mono leading-relaxed resize-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: AI Organized Notes (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="bg-[#0B1220] border border-[#10B981]/40 rounded-2xl p-6 space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4.5 w-4.5 text-[#10B981]" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    AI Organized Notes
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-[#10B981]">STRUCTURED AI PARSER</span>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                <div className="bg-[#080D1A] p-3 rounded-xl border border-[rgba(255,255,255,0.04)]">
                  <span className="text-[9.5px] uppercase text-[#10B981] font-bold block">Witness Evidence</span>
                  <p className="text-white text-[11px] mt-0.5">Shopkeeper confirmed suspect presence at ATM booth (22:14 IST)</p>
                </div>

                <div className="bg-[#080D1A] p-3 rounded-xl border border-[rgba(255,255,255,0.04)]">
                  <span className="text-[9.5px] uppercase text-[#38BDF8] font-bold block">Vehicle Details</span>
                  <p className="text-white text-[11px] mt-0.5">Registration verified: KA-04-MB-8921 (Mahindra Scorpio)</p>
                </div>

                <div className="bg-[#080D1A] p-3 rounded-xl border border-[rgba(255,255,255,0.04)]">
                  <span className="text-[9.5px] uppercase text-[#F59E0B] font-bold block">Digital Forensic Match</span>
                  <p className="text-white text-[11px] mt-0.5">Extracted SHA-256 hash match for Kingston SSD drive</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* SECTION 4: LINKED EVIDENCE GRID */}
      <div className="bg-[#0B1220] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-3">
          <div className="flex items-center gap-2">
            <Paperclip className="h-4.5 w-4.5 text-[#10B981]" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Linked Case Evidence
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[#94A3B8]">6 Files Attached</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs select-none">
          {linkedEvidence.map((item) => {
            const EvIcon = item.icon
            return (
              <div
                key={item.type}
                className="bg-[#080D1A] border border-[rgba(255,255,255,0.04)] rounded-xl p-3.5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <EvIcon className={`h-4 w-4 ${item.color}`} />
                  <span className="text-[9px] text-[#10B981] font-bold bg-[#10B981]/15 px-1.5 py-0.5 rounded">
                    {item.status}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white truncate">{item.type}</h4>
                  <span className="text-[9px] text-[#94A3B8] block mt-0.5">{item.date}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* SECTION 5 & 6: DAILY SUMMARY & SUGGESTED NEXT STEPS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Daily Summary (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-[#0B1220] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4.5 w-4.5 text-[#10B981]" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    Daily Investigation Summary
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/30 px-2 py-0.5 rounded font-bold">
                  SUMMARY GENERATED
                </span>
              </div>

              <p className="font-mono text-xs text-[#E2E8F0] leading-relaxed bg-[#080D1A] p-4 rounded-xl border border-[rgba(255,255,255,0.04)]">
                "Today's investigation focused on witness interviews, CCTV review and digital evidence collection. AI recommends verifying vehicle ownership (KA-04-MB-8921) and comparing recovered phone numbers with existing FIRs."
              </p>
            </div>
          </div>
        </div>

        {/* Suggested Next Investigation Steps (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-[#0B1220] border border-[#10B981]/40 rounded-2xl p-6 space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-[rgba(255,255,255,0.06)] pb-3">
                <Sparkles className="h-4.5 w-4.5 text-[#10B981]" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Suggested Next Investigation Steps
                </h3>
              </div>

              <div className="space-y-2 font-mono text-xs">
                {[
                  { text: 'Issue Section 41A CrPC notice to suspect Ramesh Kumar' },
                  { text: 'Verify vehicle registration KA-04-MB-8921 ownership' },
                  { text: 'Request bank ATM camera angle #2 footage extractions' },
                  { text: 'Cross-check recovered phone numbers with CCTNS node' },
                ].map((rec) => (
                  <div
                    key={rec.text}
                    className="bg-[#080D1A] border border-[rgba(255,255,255,0.04)] rounded-xl p-3 flex items-center gap-2.5 text-[#F8FAFC]"
                  >
                    <span className="text-[#10B981] font-bold text-xs">•</span>
                    <span className="text-[11px] truncate">{rec.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default InvestigationDiaryPage
