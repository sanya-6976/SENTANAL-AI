import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Scan, ArrowLeft, Pencil, Database } from 'lucide-react'
import {
  DocumentPreview,
  ExtractedForm,
  ExtractionSummary
} from './components'
import type { ExtractedFormData } from './components'

function OCRReviewPage() {
  const navigate = useNavigate()

  // Form fields state
  const [formData, setFormData] = useState<ExtractedFormData>({
    firNumber: 'FIR123456',
    crimeType: 'Theft',
    date: '12 May 2025',
    time: '14:30',
    district: 'Bengaluru Urban',
    policeStation: 'JC Nagar',
    officer: 'Inspector Ramesh',
    victimName: 'Suresh Babu',
    accusedName: 'Ravi Kumar',
    vehicleNumber: 'KA01AB1234',
    weaponUsed: 'Iron Rod',
    location: '12th Cross, JC Nagar',
    description: 'A residential burglary was reported at JC Nagar. Rear entry was forced. Cash and jewellery worth 4.5 Lakhs were stolen. CCTV footage is under analysis.'
  })

  // Handle individual field edits
  const handleFieldChange = (field: keyof ExtractedFormData, val: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: val
    }))
  }

  // Document action triggers
  const handleViewDocument = () => {
    alert('[SYSTEM SCANNER] Opening full high-resolution PDF preview scan...')
  }

  const handleDownloadCopy = () => {
    alert('[SYSTEM SECURE DOWNLOAD] Exporting encrypted local copy of FIR_1254.pdf...')
  }

  // Bottom action bar controls
  const handleReject = () => {
    alert('[SYSTEM ALERT] OCR extraction rejected. Returning to Ingestion workspace...')
    navigate('/reports')
  }

  const handleEdit = () => {
    alert('[SYSTEM NOTICE] Form fields enabled. Focus inputs to correct values.')
  }

  const handleSave = () => {
    alert(`[DATABASE CALL] FIR ${formData.firNumber} successfully saved to the Karnataka State Crime Database!`)
    navigate('/crime-database')
  }

  return (
    <div className="space-y-6 animate-fade-in select-none">
      
      {/* 1. Page Header Panel */}
      <div className="border-b border-[rgba(255,255,255,0.06)] pb-5 select-none">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-[#2563EB]/10 rounded-lg border border-[#2563EB]/25 text-[#2563EB] shrink-0">
            <Scan className="h-5.5 w-5.5 stroke-1.5" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#F8FAFC]">
            OCR Review & Verification
          </h1>
        </div>
        <p className="text-xs uppercase tracking-widest text-[#94A3B8] font-mono mt-1 pl-10.5">
          Review AI-extracted FIR information before adding it to the Crime Database.
        </p>
      </div>

      {/* 2. Responsive 40/60 Split Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-start">
        
        {/* Left Column (approximately 40% -> col-span-4) */}
        <div className="col-span-1 lg:col-span-4">
          <DocumentPreview
            fileName="FIR_1254.pdf"
            uploadTime="13 May 2025, 10:45 AM"
            docType="FIR Report (PDF)"
            onView={handleViewDocument}
            onDownload={handleDownloadCopy}
          />
        </div>

        {/* Right Column (approximately 60% -> col-span-6) */}
        <div className="col-span-1 lg:col-span-6 space-y-6">
          <ExtractedForm
            data={formData}
            onChange={handleFieldChange}
          />
          
          <ExtractionSummary />

          {/* Action Buttons Row - Align right on desktop, stack on mobile */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2 font-sans text-xs">
            <button
              onClick={handleReject}
              className="w-full sm:w-auto px-5 py-3 bg-[#0B1220] border border-[rgba(255,255,255,0.06)] hover:border-white/10 text-[#94A3B8] hover:text-white rounded-lg text-[10px] tracking-widest font-bold uppercase transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 outline-none"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Upload</span>
            </button>

            <button
              onClick={handleEdit}
              className="w-full sm:w-auto px-5 py-3 bg-[#111827] border border-[rgba(255,255,255,0.06)] hover:border-white/10 text-[#94A3B8] hover:text-white rounded-lg text-[10px] tracking-widest font-bold uppercase transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 outline-none"
            >
              <Pencil className="h-3.5 w-3.5 text-[#2563EB]" />
              <span>Edit Extracted Data</span>
            </button>

            <button
              onClick={handleSave}
              className="w-full sm:w-auto px-5 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-[10px] tracking-widest font-bold uppercase transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 outline-none hover:shadow-[0_2px_12px_rgba(37,99,235,0.25)]"
            >
              <Database className="h-3.5 w-3.5" />
              <span>Save to Crime Database</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default OCRReviewPage
