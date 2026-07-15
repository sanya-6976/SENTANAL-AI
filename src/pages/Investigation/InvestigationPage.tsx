import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  GlobalSearch,
  InvestigationTabs,
  CaseOverviewCard,
  EntityCard,
  AIRecommendationCard
} from './components'

// Define Types for entities list
interface EntityAccused {
  type: 'accused'
  name: string
  age: number
  role: string
}

interface EntityVehicle {
  type: 'vehicle'
  regNo: string
  typeDesc: string
}

interface EntityVictim {
  type: 'victim'
  name: string
  age: number
  status: string
}

type EntityItem = EntityAccused | EntityVehicle | EntityVictim

function InvestigationPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('Case Overview')

  // Case Metadata
  const caseData = {
    fir: 'FIR123456',
    caseType: 'Theft Case',
    district: 'Bengaluru Urban',
    station: 'JC Nagar',
    officer: 'Inspector Ramesh',
    status: 'Under Investigation',
    severity: 'Medium'
  }

  // Key key entities mock list
  const entitiesList: EntityItem[] = [
    {
      type: 'accused',
      name: 'Ravi Kumar',
      age: 34,
      role: 'Primary Associate'
    },
    {
      type: 'vehicle',
      regNo: 'KA01AB1234',
      typeDesc: 'White Swift • Seen at 12:15 PM'
    },
    {
      type: 'victim',
      name: 'Suresh Babu',
      age: 43,
      status: 'Resident'
    }
  ]

  // AI recommendations checklist
  const recommendations = [
    'Check CCTV at 3 nearby locations.',
    'Similar modus operandi detected in 3 cases.',
    'Verify accused’s mobile location.',
    'Vehicle linked to previous FIR.',
    'Cross-check fingerprints.'
  ]

  // Toast actions and navigation
  const handleInspectEntity = (item: EntityItem) => {
    console.log('Inspecting case entity:', item)
    navigate(`/crime-database/${caseData.fir}`)
  }

  const handleAskAI = () => {
    alert('[SENTINEL INTELLIGENCE CORE] Generating semantic case correlation maps for FIR123456...')
  }

  return (
    <div className="space-y-6 animate-fade-in select-none">
      
      {/* 1. Page Title Header */}
      <div className="border-b border-[rgba(255,255,255,0.06)] pb-5 select-none">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#F8FAFC]">
          Investigation Workspace
        </h1>
        <p className="text-xs uppercase tracking-widest text-[#94A3B8] font-mono mt-1">
          Investigate FIRs, suspects, vehicles, evidence and AI-generated intelligence.
        </p>
      </div>

      {/* 2. Full-Width Global Input Bar */}
      <GlobalSearch value={search} onChange={setSearch} />

      {/* 3. Navigation tabs panel */}
      <InvestigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 4. Tab Contents layout */}
      {activeTab === 'Case Overview' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-6 pt-2">
          
          {/* Left card: Case Overview (30% -> col-span-3) */}
          <div className="col-span-1 md:col-span-1 lg:col-span-3">
            <CaseOverviewCard {...caseData} />
          </div>

          {/* Center Card: Key Entities (40% -> col-span-4) */}
          <div className="col-span-1 md:col-span-1 lg:col-span-4">
            <EntityCard entities={entitiesList} onInspect={handleInspectEntity} />
          </div>

          {/* Right Card: AI Recommendations (30% -> col-span-3) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <AIRecommendationCard recommendations={recommendations} onAskAI={handleAskAI} />
          </div>

        </div>
      ) : (
        /* Stand-in Tab contents for Timeline, Evidence, etc. */
        <div className="bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-xl p-8 text-center animate-fade-in">
          <h3 className="text-sm font-bold text-white tracking-widest uppercase font-mono mb-2">
            {activeTab} Workspace Panel
          </h3>
          <p className="text-xs text-[#94A3B8] max-w-sm mx-auto leading-relaxed">
            Case registry logs for {caseData.fir} {activeTab.toLowerCase()} entries are loaded. Connect core intelligence feeds to display active maps.
          </p>
          <button
            onClick={() => setActiveTab('Case Overview')}
            className="mt-6 text-[9px] font-mono font-bold tracking-widest text-[#2563EB] hover:text-white hover:bg-[#2563EB] border border-[#2563EB]/40 bg-transparent px-4 py-2 rounded-lg transition-all duration-150 uppercase"
          >
            Return to Case Overview
          </button>
        </div>
      )}

    </div>
  )
}

export default InvestigationPage
