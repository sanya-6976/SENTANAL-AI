import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  CrimeHeader,
  CrimeTabs,
  CaseInformationCard,
  CaseSummaryCard,
  AISummaryCard,
  Timeline,
  EvidenceCard,
  VictimCard,
  AccusedCard,
  VehicleCard,
  QuickActions
} from './components'

function CrimeDetailsPage() {
  const { crimeId } = useParams<{ crimeId: string }>()
  
  // Tab Switcher Active state
  const [activeTab, setActiveTab] = useState('Overview')

  // Mock data mapping
  const caseHeader = {
    fir: crimeId || 'FIR123456',
    caseType: 'Theft Case',
    status: 'Under Investigation'
  }

  const caseInformation = {
    fir: crimeId || 'FIR123456',
    crimeType: 'Theft',
    dateTime: '13 May 2025, 14:30',
    district: 'Bengaluru Urban',
    station: 'JC Nagar',
    officer: 'Inspector Ramesh',
    status: 'Under Investigation',
    severity: 'Medium'
  }

  const caseSummary = {
    summaryText: 'A residential burglary involving forced entry was reported in Bengaluru Urban. Cash, jewellery and electronic devices were stolen. Investigation is currently underway and CCTV footage is being analysed.',
    estimatedLoss: '₹4.5 Lakhs',
    category: 'Property Crime'
  }

  const aiInsights = [
    'Similar burglary pattern found in two nearby FIRs.',
    'Vehicle KA01AB1234 appears in another investigation.',
    'Nearby CCTV cameras should be reviewed.',
    'Fingerprints matched partially.'
  ]

  const accusedData = {
    name: 'Ravi Kumar',
    age: 34,
    riskScore: 'High (92%)',
    status: 'Detained'
  }

  const victimData = {
    name: 'Suresh Babu',
    age: 43,
    address: '12th Cross, JC Nagar, Bengaluru',
    contact: '+91 98450 12345'
  }

  const vehicleData = {
    registration: 'KA01AB1234',
    type: 'White Swift Hatchback',
    owner: 'Aniket Sharma'
  }

  // Action Panel handlers
  const handleQuickAction = (actionName: string) => {
    alert(`[ACTION RECEIVED] Sentinel Executive pipeline trigger:\n- Target FIR: ${caseHeader.fir}\n- Command: ${actionName}`)
  }

  return (
    <div className="space-y-6 animate-fade-in select-none">
      
      {/* 1. Page Header Panel */}
      <div className="border-b border-[rgba(255,255,255,0.06)] pb-5 select-none">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#F8FAFC]">
          Crime Details
        </h1>
        <p className="text-xs uppercase tracking-widest text-[#94A3B8] font-mono mt-1">
          View complete case information, evidence and investigation progress.
        </p>
      </div>

      {/* 2. Top Case Header Badge Card */}
      <CrimeHeader {...caseHeader} />

      {/* 3. Detail Navigation Tabs */}
      <CrimeTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 4. Tab Workspace Layout */}
      {activeTab === 'Overview' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pt-2">
          
          {/* Left / Center Panels (75% width on large screens) */}
          <div className="col-span-1 lg:col-span-3 space-y-6">
            
            {/* Top Cards Row: Information, Summary & AI Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CaseInformationCard {...caseInformation} />
              <CaseSummaryCard {...caseSummary} />
              <AISummaryCard insights={aiInsights} />
            </div>

            {/* Timeline Row */}
            <Timeline />

            {/* Bottom Row: Evidence, Suspects and Victims details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EvidenceCard />
              <AccusedCard {...accusedData} />
              <VictimCard {...victimData} />
              <VehicleCard {...vehicleData} />
            </div>

          </div>

          {/* Right Sticky Operations Panel (25% width on large screens) */}
          <div className="col-span-1">
            <QuickActions onAction={handleQuickAction} />
          </div>

        </div>
      ) : (
        /* Alternate Tabs Stand-in View */
        <div className="bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-xl p-8 text-center animate-fade-in">
          <h3 className="text-sm font-bold text-white tracking-widest uppercase font-mono mb-2">
            {activeTab} Registry Workspace
          </h3>
          <p className="text-xs text-[#94A3B8] max-w-sm mx-auto leading-relaxed">
            Authorized access only. Case logs list for {caseHeader.fir} {activeTab.toLowerCase()} reports are securely mapped.
          </p>
          <button
            onClick={() => setActiveTab('Overview')}
            className="mt-6 text-[9px] font-mono font-bold tracking-widest text-[#2563EB] hover:text-white hover:bg-[#2563EB] border border-[#2563EB]/40 bg-transparent px-4 py-2 rounded-lg transition-all duration-150 uppercase"
          >
            Go back to Overview
          </button>
        </div>
      )}

    </div>
  )
}

export default CrimeDetailsPage
