import { Eye, Download, CheckCircle2 } from 'lucide-react'

interface PreviewProps {
  fileName: string
  uploadTime: string
  docType: string
  onView: () => void
  onDownload: () => void
}

export function DocumentPreview({ fileName, uploadTime, docType, onView, onDownload }: PreviewProps) {
  return (
    <div className="bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 shadow-sm space-y-5 select-none animate-fade-in">
      
      {/* Title */}
      <div className="border-b border-[rgba(255,255,255,0.06)] pb-3">
        <h2 className="text-xs font-extrabold text-white tracking-widest uppercase font-mono">
          Uploaded Document Preview
        </h2>
      </div>

      {/* Styled Scanned Document Visual Placeholder */}
      <div className="relative border border-[rgba(255,255,255,0.06)] bg-[#0B1220] rounded-xl p-4 flex flex-col items-center justify-center text-center h-[260px] overflow-hidden group shadow-inner">
        {/* Mock Scanned Document Shape with Yellow Bounding Boxes */}
        <div className="w-[140px] h-[190px] bg-slate-900 border border-slate-700/65 rounded shadow-lg p-2.5 relative flex flex-col justify-between select-none">
          {/* Header Lines */}
          <div className="space-y-1.5">
            <div className="h-1.5 w-12 bg-slate-700 rounded" />
            <div className="h-1 w-20 bg-slate-800 rounded" />
          </div>

          {/* Yellow Highlight OCR Bounding Box overlays */}
          <div className="absolute top-[45px] left-3 right-3 h-4 border border-yellow-500/50 bg-yellow-500/10 rounded animate-pulse" />
          <div className="absolute top-[70px] left-3 right-6 h-3 border border-yellow-500/50 bg-yellow-500/10 rounded animate-pulse" />
          <div className="absolute top-[90px] left-3 right-4 h-3.5 border border-yellow-500/40 bg-yellow-500/5 rounded" />
          <div className="absolute top-[115px] left-3 right-3 h-3 border border-yellow-500/40 bg-yellow-500/5 rounded" />

          {/* Body Lines */}
          <div className="space-y-2 mt-4">
            <div className="h-1.5 w-full bg-slate-800 rounded" />
            <div className="h-1.5 w-[85%] bg-slate-800 rounded" />
            <div className="h-1.5 w-[90%] bg-slate-800 rounded" />
          </div>

          {/* Footer stamp */}
          <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-800">
            <div className="h-1 w-6 bg-slate-800 rounded" />
            <div className="h-2 w-6 rounded bg-[#2563EB]/40 border border-[#2563EB]/45 shrink-0" />
          </div>
        </div>

        {/* Hover inspect glass icon */}
        <div className="absolute inset-0 bg-[#0B1220]/75 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-150">
          <div className="h-9 w-9 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-lg">
            <Eye className="h-4.5 w-4.5" />
          </div>
        </div>
      </div>

      {/* Document metadata info table */}
      <div className="grid grid-cols-1 gap-2.5 font-sans text-xs border-b border-[rgba(255,255,255,0.04)] pb-4">
        
        {/* Name */}
        <div className="flex justify-between items-center">
          <span className="text-[#94A3B8] font-semibold">File Name</span>
          <span className="text-white font-bold font-mono">{fileName}</span>
        </div>

        {/* Upload Time */}
        <div className="flex justify-between items-center">
          <span className="text-[#94A3B8] font-semibold">Upload Time</span>
          <span className="text-white font-bold">{uploadTime}</span>
        </div>

        {/* Doc Type */}
        <div className="flex justify-between items-center">
          <span className="text-[#94A3B8] font-semibold">Document Type</span>
          <span className="text-[#94A3B8]/60 font-bold">{docType}</span>
        </div>

        {/* Status Badge */}
        <div className="flex justify-between items-center">
          <span className="text-[#94A3B8] font-semibold">OCR Status</span>
          <span className="px-2.5 py-0.5 border border-[#10B981]/20 bg-[#10B981]/10 text-[#10B981] text-[8px] font-mono tracking-wider font-extrabold rounded-full uppercase flex items-center gap-1.5">
            <CheckCircle2 className="h-2.5 w-2.5" />
            <span>Completed</span>
          </span>
        </div>

      </div>

      {/* Button controls */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onView}
          className="flex items-center justify-center gap-2 bg-[#0B1220] border border-[rgba(255,255,255,0.06)] hover:border-[#2563EB]/40 text-white font-bold text-[10px] tracking-widest uppercase py-3 rounded-lg transition-all duration-150 cursor-pointer outline-none hover:bg-[#182235]/40"
        >
          <Eye className="h-3.5 w-3.5 text-[#2563EB]" />
          <span>View Full</span>
        </button>

        <button
          onClick={onDownload}
          className="flex items-center justify-center gap-2 bg-[#0B1220] border border-[rgba(255,255,255,0.06)] hover:border-[#2563EB]/40 text-white font-bold text-[10px] tracking-widest uppercase py-3 rounded-lg transition-all duration-150 cursor-pointer outline-none hover:bg-[#182235]/40"
        >
          <Download className="h-3.5 w-3.5 text-[#2563EB]" />
          <span>Download</span>
        </button>
      </div>

    </div>
  )
}
export default DocumentPreview
