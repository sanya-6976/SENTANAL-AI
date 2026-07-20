import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Database } from 'lucide-react'
import {
  DocumentPreview,
  ExtractedForm
} from './components'
import type { ExtractedFormData } from './components'

function OCRReviewPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const stateData = location.state as { extractedText?: string; fileName?: string } | null

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
    description: stateData?.extractedText || 'A residential burglary was reported at JC Nagar. Rear entry was forced. Cash and jewellery worth 4.5 Lakhs were stolen. CCTV footage is under analysis.'
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

  const [showSaveDialog, setShowSaveDialog] = useState(false)

  const handleDialogClose = () => {
    setShowSaveDialog(false)
    navigate('/crime-database')
  }

  return (
    <div className="space-y-6 animate-fade-in select-none">

      {/* 2. Responsive 40/60 Split Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-stretch">
        
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
        </div>

      </div>

      {showSaveDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#111827] border border-[rgba(255,255,255,0.1)] rounded-xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4 border border-green-500/20">
              <Database className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Saved Successfully</h3>
            <p className="text-sm text-[#94A3B8] mb-6">
              FIR {formData.firNumber} has been successfully parsed and saved into the Crime Database.
            </p>
            <button
              onClick={handleDialogClose}
              className="w-full py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Continue to Database
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default OCRReviewPage
