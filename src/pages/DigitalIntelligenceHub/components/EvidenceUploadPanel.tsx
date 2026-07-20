import React, { useRef, useState } from 'react'
import {
  UploadCloud,
  PhoneCall,
  MapPin,
  Globe,
  Smartphone,
  MessageSquare,
  Mail,
  Compass,
  Image,
  FileText
} from 'lucide-react'

interface EvidenceUploadPanelProps {
  onEvidenceSelected: (fileName: string) => void
  isProcessing: boolean
}

export function EvidenceUploadPanel({ onEvidenceSelected, isProcessing }: EvidenceUploadPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragActive, setIsDragActive] = useState(false)

  const evidenceTypes = [
    { label: 'Call Detail Records', icon: PhoneCall, color: 'text-[#2563EB]/80 bg-[#2563EB]/5 border-[#2563EB]/10' },
    { label: 'GPS History', icon: MapPin, color: 'text-[#10B981]/80 bg-[#10B981]/5 border-[#10B981]/10' },
    { label: 'IP Logs', icon: Globe, color: 'text-[#3B82F6]/80 bg-[#3B82F6]/5 border-[#3B82F6]/10' },
    { label: 'Mobile Extraction Reports', icon: Smartphone, color: 'text-[#8B5CF6]/80 bg-[#8B5CF6]/5 border-[#8B5CF6]/10' },
    { label: 'Chat Exports', icon: MessageSquare, color: 'text-[#EC4899]/80 bg-[#EC4899]/5 border-[#EC4899]/10' },
    { label: 'Email Logs', icon: Mail, color: 'text-[#F59E0B]/80 bg-[#F59E0B]/5 border-[#F59E0B]/10' },
    { label: 'Browser History', icon: Compass, color: 'text-[#14B8A6]/80 bg-[#14B8A6]/5 border-[#14B8A6]/10' },
    { label: 'Screenshots', icon: Image, color: 'text-[#E2E8F0]/80 bg-[#E2E8F0]/5 border-[#E2E8F0]/10' },
    { label: 'Cyber Forensic Reports', icon: FileText, color: 'text-[#EF4444]/80 bg-[#EF4444]/5 border-[#EF4444]/10' },
  ]

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true)
    } else if (e.type === 'dragleave') {
      setIsDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    if (isProcessing) return

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      onEvidenceSelected(file.name)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isProcessing) return
    if (e.target.files && e.target.files[0]) {
      onEvidenceSelected(e.target.files[0].name)
    }
  }

  const triggerBrowse = () => {
    if (isProcessing) return
    fileInputRef.current?.click()
  }

  return (
    <div className="bg-[#121826] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-6 shadow-md transition-all duration-300 hover:border-[rgba(37,99,235,0.15)] flex flex-col h-full justify-between">
      <div>
        {/* Header section of Panel */}
        <div className="flex justify-between items-start mb-5 border-b border-[rgba(255,255,255,0.04)] pb-3">
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-[#F8FAFC]">Upload Evidence</h3>
            <p className="text-[9px] font-mono uppercase tracking-widest text-[#94A3B8] mt-1">Legally Obtained Forensics Ingestion</p>
          </div>
        </div>

        {/* Drag & Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={triggerBrowse}
          className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all min-h-[180px] cursor-pointer group ${
            isDragActive
              ? 'border-[#2563EB] bg-[#2563EB]/5 shadow-[0_0_15px_rgba(37,99,235,0.1)]'
              : 'border-[rgba(255,255,255,0.08)] hover:border-[#2563EB]/40 bg-[#0B1220]/40'
          } ${isProcessing ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <div className="h-12 w-12 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[#2563EB] mb-3 group-hover:scale-105 transition-transform">
            <UploadCloud className={`h-6 w-6 stroke-1.2 ${isProcessing ? 'animate-pulse' : ''}`} />
          </div>

          <h4 className="text-white font-bold text-xs tracking-wide">
            {isProcessing ? 'Processing Forensic File...' : 'Drag & Drop Evidence'}
          </h4>

          <p className="text-[#94A3B8] text-[10px] mt-1 font-medium">
            {isProcessing ? 'Sentinel AI is analyzing contents' : 'or browse supported files'}
          </p>

          <p className="text-[#94A3B8]/30 text-[8px] font-mono tracking-wider uppercase mt-4">
            Authorized Personnel Only • Encrypted Transit
          </p>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        disabled={isProcessing}
        accept=".pdf,.csv,.xlsx,.txt,.log,.xml,.json,.zip,.tar,.db,.sqlite,.png,.jpg,.jpeg"
      />

      {/* Supported Evidence Chips */}
      <div className="mt-6">
        <h5 className="text-[9px] font-mono tracking-widest text-[#94A3B8] font-bold uppercase mb-3">
          Supported Formats & Systems
        </h5>
        
        <div className="grid grid-cols-3 gap-2">
          {evidenceTypes.map((type) => {
            const Icon = type.icon
            return (
              <div
                key={type.label}
                className={`flex items-center gap-1.5 p-2 rounded-lg border text-left transition-colors hover:bg-white/[0.02] ${type.color}`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span className="text-[#94A3B8] font-medium text-[9px] truncate leading-tight select-none" title={type.label}>
                  {type.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default EvidenceUploadPanel
