import { useState } from 'react'
import { FolderUp } from 'lucide-react'
import {
  UploadCard,
  UploadedFilesList,
  PipelineCard,
  SupportedInputsCard,
  GuidelinesCard
} from './components'
import type { UploadedFileItem } from './components/UploadedFilesList'

function ReportsPage() {
  // Mock files array state
  const [files, setFiles] = useState<UploadedFileItem[]>([
    { id: '1', name: 'FIR_1254.pdf', type: 'pdf', size: '1.2 MB', status: 'Processed' },
    { id: '2', name: 'CrimeScene.jpg', type: 'image', size: '3.4 MB', status: 'Processed' },
    { id: '3', name: 'WitnessStatement.pdf', type: 'pdf', size: '820 KB', status: 'Pending Review' },
    { id: '4', name: 'CCTV_Footage.mp4', type: 'video', size: '42.5 MB', status: 'Processing...' }
  ])

  // Delete file callback
  const handleDeleteFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  // Upload Actions
  const handleUploadFIR = () => {
    alert('[UPLOAD DIALOG] Browse local directory to select FIR document records...')
  }

  const handleCapture = () => {
    alert('[CAMERA INTEGRATION] Accessing control room biometric camera scanner...')
  }

  const handleUploadEvidence = () => {
    alert('[UPLOAD DIALOG] Select CCTV video clips, witness voice logs or evidence PDF sheets...')
  }



  return (
    <div className="space-y-6 animate-fade-in select-none">
      
      {/* 1. Page Header Panel with Document Upload Icon */}
      <div className="border-b border-[rgba(255,255,255,0.06)] pb-5 select-none flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-[#2563EB]/10 rounded-lg border border-[#2563EB]/25 text-[#2563EB] shrink-0">
              <FolderUp className="h-5.5 w-5.5 stroke-1.5" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#F8FAFC]">
              FIR Upload & Evidence Ingestion
            </h1>
          </div>
          <p className="text-xs uppercase tracking-widest text-[#94A3B8] font-mono mt-1 pl-10.5">
            Upload FIR documents and supporting evidence for AI-assisted processing.
          </p>
        </div>
      </div>

      {/* 2. Responsive 70/30 Split Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-start">
        
        {/* Left Column (approximately 70% -> col-span-7) */}
        <div className="col-span-1 lg:col-span-7 space-y-6">
          <UploadCard
            onUploadFIR={handleUploadFIR}
            onCapture={handleCapture}
            onUploadEvidence={handleUploadEvidence}
          />
          
          <UploadedFilesList
            files={files}
            onDelete={handleDeleteFile}
          />

          <GuidelinesCard />
        </div>

        {/* Right Column (approximately 30% -> col-span-3) */}
        <div className="col-span-1 lg:col-span-3 space-y-6">
          <PipelineCard />
          <SupportedInputsCard />
        </div>

      </div>

    </div>
  )
}

export default ReportsPage
