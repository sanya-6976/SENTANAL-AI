import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  UploadCard,
  UploadedFilesList,
  PipelineCard,
  SupportedInputsCard,
  GuidelinesCard
} from './components'
import type { UploadedFileItem } from './components/UploadedFilesList'
import { parseImageOCR } from '../../api/ai.api'

function ReportsPage() {
  const navigate = useNavigate()


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
  const handleUploadFIR = async () => {
    try {
      const res = await parseImageOCR({ image_path: "datasets/raw/images/sample_fir.jpg" })
      
      const newFile: UploadedFileItem = {
        id: `fir-${Date.now()}`,
        name: 'sample_fir.jpg',
        type: 'image',
        size: '1.8 MB',
        status: 'Processed'
      }
      setFiles(prev => [newFile, ...prev])
      
      navigate('/ocr-review', { state: { extractedText: res.extracted_text, fileName: 'sample_fir.jpg' } })
    } catch (err) {
      console.error(err)
      alert('Failed to parse document text via OCR. Redirecting to review details.')
      navigate('/ocr-review')
    }
  }

  const handleCapture = () => {
    alert('[CAMERA INTEGRATION] Accessing control room biometric camera scanner...')
  }

  const handleUploadEvidence = () => {
    alert('[UPLOAD DIALOG] Select CCTV video clips, witness voice logs or evidence PDF sheets...')
  }



  return (
    <div className="space-y-6 animate-fade-in select-none">

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
