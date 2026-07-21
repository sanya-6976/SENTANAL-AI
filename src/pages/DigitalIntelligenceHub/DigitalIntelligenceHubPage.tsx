import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  UploadCloud,
  Brain,
  Sparkles,
  Phone,
  MapPin,
  Globe,
  FileText,
  ArrowRight,
  Database,
  Check,
  Share2,
  FileCheck
} from 'lucide-react'

interface EvidenceType {
  id: string
  label: string
  icon: string
}

export function DigitalIntelligenceHubPage() {
  const navigate = useNavigate()
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['cdr', 'gps', 'ip', 'mobile'])
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    'CDR_Bengaluru_North_Oct2025.csv',
    'Phone_Extraction_iPhone13_Mule.ufdr',
    'CellTower_Dump_Indiranagar.pdf'
  ])

  const evidenceTypes: EvidenceType[] = [
    { id: 'cdr', label: 'Call Detail Records', icon: '📞' },
    { id: 'gps', label: 'GPS / Location History', icon: '📍' },
    { id: 'ip', label: 'IP Logs', icon: '🌐' },
    { id: 'mobile', label: 'Mobile Extraction Reports', icon: '📱' },
    { id: 'chat', label: 'Chat Exports', icon: '💬' },
    { id: 'email', label: 'Email Logs', icon: '📧' },
    { id: 'browser', label: 'Browser History', icon: '🔍' },
    { id: 'screenshot', label: 'Screenshots', icon: '📸' },
    { id: 'forensic', label: 'Cyber Forensic Reports', icon: '🔬' }
  ]

  const toggleEvidenceType = (id: string) => {
    if (selectedTypes.includes(id)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== id))
    } else {
      setSelectedTypes([...selectedTypes, id])
    }
  }

  const handleSimulateUpload = () => {
    setUploadedFiles([
      ...uploadedFiles,
      `Evidence_Extraction_Log_${Math.floor(1000 + Math.random() * 9000)}.csv`
    ])
  }

  return (
    <div className="space-y-8 animate-fade-in select-none max-w-[1600px] mx-auto pb-12 font-sans">

      {/* SECTION 1: DIGITAL EVIDENCE UPLOAD */}
      <div className="bg-[#0B1220] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(255,255,255,0.06)] pb-4">
          <div>
            <h2 className="text-base font-extrabold text-white uppercase tracking-wide flex items-center gap-2">
              <UploadCloud className="h-5 w-5 text-[#2563EB]" />
              <span>Digital Evidence Upload</span>
            </h2>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Select evidence types and upload digital extractions for AI analysis.
            </p>
          </div>

          <span className="text-[10px] font-mono text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/30 px-3 py-1 rounded-lg uppercase font-bold self-start sm:self-auto">
            Supported: CDR, GPS, IP, Mobile Extractions, Chats, Emails, Browser, Screenshots, Cyber Reports
          </span>
        </div>

        {/* Evidence Category Selectable Chips */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono uppercase text-[#94A3B8] font-bold block">
            Supported Digital Evidence Types:
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {evidenceTypes.map((item) => {
              const isSelected = selectedTypes.includes(item.id)
              return (
                <button
                  key={item.id}
                  onClick={() => toggleEvidenceType(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 border ${
                    isSelected
                      ? 'bg-[#2563EB]/20 border-[#2563EB] text-white shadow-[0_0_12px_rgba(37,99,235,0.25)]'
                      : 'bg-[#080D1A] border-[rgba(255,255,255,0.06)] text-[#94A3B8] hover:border-[rgba(255,255,255,0.15)] hover:text-white'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                  {isSelected && <Check className="h-3.5 w-3.5 text-[#2563EB] ml-1" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Drag & Drop Upload Dropzone */}
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragOver(true)
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault()
            setIsDragOver(false)
            handleSimulateUpload()
          }}
          className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center space-y-4 transition-all duration-200 cursor-pointer ${
            isDragOver
              ? 'border-[#2563EB] bg-[#2563EB]/10 scale-[1.005]'
              : 'border-[rgba(255,255,255,0.12)] bg-[#080D1A] hover:border-[#2563EB]/50 hover:bg-[#0B1220]'
          }`}
        >
          <div className="h-16 w-16 rounded-2xl bg-[#2563EB]/10 border border-[#2563EB]/30 flex items-center justify-center text-[#2563EB] shadow-lg">
            <UploadCloud className="h-8 w-8 animate-bounce" />
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white tracking-wide">
              Drag & Drop Digital Evidence Files
            </h3>
            <p className="text-xs text-[#94A3B8]">
              or click <span className="text-[#2563EB] font-bold underline">Browse Files</span> from forensic drive
            </p>
          </div>

          <button
            onClick={handleSimulateUpload}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-lg flex items-center gap-2"
          >
            <FileCheck className="h-4 w-4" />
            <span>Browse Files</span>
          </button>
        </div>

        {/* Uploaded Evidence Files List */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2 pt-2">
            <span className="text-[10px] font-mono uppercase text-[#94A3B8] font-bold block">
              Active Evidence Files Loaded ({uploadedFiles.length}):
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
              {uploadedFiles.map((fileName) => (
                <div
                  key={fileName}
                  className="bg-[#080D1A] border border-[rgba(255,255,255,0.06)] rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="h-4 w-4 text-[#2563EB] shrink-0" />
                    <span className="text-white truncate">{fileName}</span>
                  </div>
                  <span className="text-[9px] text-[#10B981] font-bold bg-[#10B981]/15 px-2 py-0.5 rounded shrink-0">
                    PARSED
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: AFTER UPLOAD DISPLAY ONLY REQUIRED SCOPE EXTRACTIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 font-mono text-xs">
        <div className="bg-[#0B1220] border border-[rgba(255,255,255,0.06)] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#94A3B8] font-bold uppercase">Extracted Phone Numbers</span>
            <Phone className="h-4 w-4 text-[#2563EB]" />
          </div>
          <div className="text-xl font-extrabold text-white">1,428 Numbers</div>
          <p className="text-[10px] text-[#94A3B8]">Parsed from CDR & SMS extractions</p>
        </div>

        <div className="bg-[#0B1220] border border-[rgba(255,255,255,0.06)] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#94A3B8] font-bold uppercase">Frequent Contacts</span>
            <Share2 className="h-4 w-4 text-[#F59E0B]" />
          </div>
          <div className="text-xl font-extrabold text-[#F59E0B]">12 Mule Contacts</div>
          <p className="text-[10px] text-[#94A3B8]">High-frequency calling patterns</p>
        </div>

        <div className="bg-[#0B1220] border border-[rgba(255,255,255,0.06)] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#94A3B8] font-bold uppercase">Location Timeline</span>
            <MapPin className="h-4 w-4 text-[#10B981]" />
          </div>
          <div className="text-xl font-extrabold text-[#10B981]">34 GPS Points</div>
          <p className="text-[10px] text-[#94A3B8]">Indiranagar 100ft Road cluster</p>
        </div>

        <div className="bg-[#0B1220] border border-[rgba(255,255,255,0.06)] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#94A3B8] font-bold uppercase">Suspicious IP Patterns</span>
            <Globe className="h-4 w-4 text-[#EF4444]" />
          </div>
          <div className="text-xl font-extrabold text-[#EF4444]">8 VPN Nodes</div>
          <p className="text-[10px] text-[#94A3B8]">Proxy & Tor exit nodes</p>
        </div>

        <div className="bg-[#0B1220] border border-[rgba(255,255,255,0.06)] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#94A3B8] font-bold uppercase">Linked Existing FIRs</span>
            <Database className="h-4 w-4 text-[#8B5CF6]" />
          </div>
          <div className="text-xl font-extrabold text-[#8B5CF6]">FIR 45/2026</div>
          <p className="text-[10px] text-[#94A3B8]">Matched in CCTNS database</p>
        </div>
      </div>

      {/* SECTION 3: AI CYBER INVESTIGATION SUMMARY & RECOMMENDED STEPS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* AI Cyber Investigation Summary (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-[#0B1220] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-3">
                <div className="flex items-center gap-2">
                  <Brain className="h-4.5 w-4.5 text-[#2563EB]" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    AI Cyber Investigation Summary
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/25 px-2 py-0.5 rounded font-bold">
                  VERIFIED
                </span>
              </div>

              <div className="font-mono text-xs text-[#E2E8F0] space-y-3 leading-relaxed bg-[#080D1A] p-4 rounded-xl border border-[rgba(255,255,255,0.04)]">
                <p>
                  <strong className="text-[#2563EB]">[CYBER ANALYSIS REPORT]</strong> Analysis of extracted CDR logs (1,428 calls) and mobile extraction reports confirms active participation in an organized OTP fraud syndicate across Bangalore North.
                </p>
                <p>
                  Primary suspect device registered 84 off-hour calls with mule contact <strong className="text-white">+91 98765 43210</strong>.
                </p>
                <p>
                  Geospatial GPS timeline places suspect at <strong className="text-white">Indiranagar 100ft Road</strong> during the physical ATM cash withdrawal recorded in <strong className="text-[#38BDF8]">FIR 45/2026</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Investigation Steps (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-[#0B1220] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-[rgba(255,255,255,0.06)] pb-3">
                <Sparkles className="h-4.5 w-4.5 text-[#10B981]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Recommended Investigation Steps
                </h3>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                {[
                  { text: 'Review linked FIR 45/2026 record in CCTNS', route: '/crime-database/45' },
                  { text: 'Interrogate mule contact +91 98765 43210', route: '/crime-database' },
                  { text: 'Verify GPS coordinates overlap at Indiranagar', route: '/gis' },
                  { text: 'Issue bank notice for VPN IP extractions', route: '/crime-database' },
                ].map((rec) => (
                  <div
                    key={rec.text}
                    onClick={() => navigate(rec.route)}
                    className="bg-[#080D1A] hover:bg-[#182235]/60 border border-[rgba(255,255,255,0.04)] hover:border-[#10B981]/40 rounded-xl p-3 flex items-center justify-between gap-3 cursor-pointer transition-all duration-150 group"
                  >
                    <span className="text-[#F8FAFC] truncate">{rec.text}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#94A3B8] group-hover:text-white transition-all shrink-0" />
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

export default DigitalIntelligenceHubPage
