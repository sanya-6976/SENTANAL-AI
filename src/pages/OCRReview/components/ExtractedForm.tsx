import { CheckCircle2, Shield } from 'lucide-react'

export interface ExtractedFormData {
  firNumber: string
  crimeType: string
  date: string
  time: string
  district: string
  policeStation: string
  officer: string
  victimName: string
  accusedName: string
  vehicleNumber: string
  weaponUsed: string
  location: string
  description: string
}

interface FormProps {
  data: ExtractedFormData
  onChange: (field: keyof ExtractedFormData, val: string) => void
}

export function ExtractedForm({ data, onChange }: FormProps) {
  
  // Helper to render input rows with AI confidence checks
  const renderField = (
    label: string,
    field: keyof ExtractedFormData,
    value: string,
    type: 'text' | 'textarea' = 'text'
  ) => {
    return (
      <div className="flex flex-col gap-1.5 font-sans text-xs flex-1 min-w-[200px]">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-mono tracking-wider text-[#94A3B8]/60 uppercase font-bold">
            {label}
          </span>
          {/* AI Confidence badge icon */}
          <div className="flex items-center gap-1 text-[#10B981]" title="98% AI Confidence score">
            <CheckCircle2 className="h-3 w-3 stroke-2 shrink-0" />
            <span className="text-[8px] font-mono font-bold tracking-wider uppercase">98%</span>
          </div>
        </div>

        {type === 'textarea' ? (
          <textarea
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            rows={3.5}
            className="w-full bg-[#0B1220] border border-[rgba(255,255,255,0.06)] rounded-lg text-xs font-semibold text-white px-3.5 py-2.5 outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all duration-150 resize-none leading-relaxed"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            className="w-full bg-[#0B1220] border border-[rgba(255,255,255,0.06)] rounded-lg text-xs font-semibold text-white px-3.5 py-2.5 outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all duration-150"
          />
        )}
      </div>
    )
  }

  return (
    <div className="bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 shadow-sm space-y-5 select-none animate-fade-in">
      
      {/* Title */}
      <div className="flex items-center gap-2 border-b border-[rgba(255,255,255,0.06)] pb-3">
        <Shield className="h-4.5 w-4.5 text-[#2563EB]" />
        <h2 className="text-xs font-extrabold text-white tracking-widest uppercase font-mono">
          AI Extracted Information
        </h2>
      </div>

      {/* Grid Fields form layout */}
      <div className="space-y-4">
        
        {/* Row 1: FIR & Crime Type */}
        <div className="flex flex-wrap gap-4">
          {renderField('FIR Number', 'firNumber', data.firNumber)}
          {renderField('Crime Type', 'crimeType', data.crimeType)}
        </div>

        {/* Row 2: Date & Time */}
        <div className="flex flex-wrap gap-4">
          {renderField('Incident Date', 'date', data.date)}
          {renderField('Incident Time', 'time', data.time)}
        </div>

        {/* Row 3: District & Police Station */}
        <div className="flex flex-wrap gap-4">
          {renderField('District', 'district', data.district)}
          {renderField('Police Station', 'policeStation', data.policeStation)}
        </div>

        {/* Row 4: Officer & Weapon */}
        <div className="flex flex-wrap gap-4">
          {renderField('Investigating Officer', 'officer', data.officer)}
          {renderField('Weapon Used', 'weaponUsed', data.weaponUsed)}
        </div>

        {/* Row 5: Victim & Accused */}
        <div className="flex flex-wrap gap-4">
          {renderField('Victim Name', 'victimName', data.victimName)}
          {renderField('Accused Name', 'accusedName', data.accusedName)}
        </div>

        {/* Row 6: Vehicle & Location */}
        <div className="flex flex-wrap gap-4">
          {renderField('Vehicle Number', 'vehicleNumber', data.vehicleNumber)}
          {renderField('Location Address', 'location', data.location)}
        </div>

        {/* Row 7: Description (Textarea) */}
        <div>
          {renderField('Crime Description (FIR Text)', 'description', data.description, 'textarea')}
        </div>

      </div>

    </div>
  )
}
export default ExtractedForm
