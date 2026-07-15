import { useState } from 'react'
import {
  NetworkToolbar,
  GraphCanvas,
  NodeCard
} from './components'

interface SuspectProfile {
  name: string
  age: number
  district: string
  status: string
  riskScore: number
  firs: number
  associates: number
  vehicles: number
  phones: number
  locations: number
  arrests: number
}

function CriminalNetworkPage() {
  const [search, setSearch] = useState('')
  
  // Selected Suspect state
  const [selectedSuspect, setSelectedSuspect] = useState<string>('Rahul Kumar')

  // Toolbar Action Triggers (incremental counters to notify canvas)
  const [resetTrigger, setResetTrigger] = useState(0)
  const [centerTrigger, setCenterTrigger] = useState(0)
  const [expandTrigger, setExpandTrigger] = useState(0)

  // Suspects profiles database
  const suspectsDb: Record<string, SuspectProfile> = {
    'Rahul Kumar': {
      name: 'Rahul Kumar',
      age: 34,
      district: 'Bengaluru Urban',
      status: 'Under Investigation',
      riskScore: 92,
      firs: 8,
      associates: 5,
      vehicles: 2,
      phones: 3,
      locations: 6,
      arrests: 2
    },
    'Amit Singh': {
      name: 'Amit Singh',
      age: 40,
      district: 'Hubballi Rural',
      status: 'Pending Trial',
      riskScore: 78,
      firs: 4,
      associates: 3,
      vehicles: 1,
      phones: 2,
      locations: 3,
      arrests: 1
    },
    'Vikram Malhotra': {
      name: 'Vikram Malhotra',
      age: 29,
      district: 'Mysuru Central',
      status: 'Under Investigation',
      riskScore: 65,
      firs: 2,
      associates: 2,
      vehicles: 1,
      phones: 1,
      locations: 2,
      arrests: 0
    },
    'Kiran Gowda': {
      name: 'Kiran Gowda',
      age: 31,
      district: 'Bengaluru Urban',
      status: 'Active Alert',
      riskScore: 84,
      firs: 5,
      associates: 4,
      vehicles: 0,
      phones: 3,
      locations: 4,
      arrests: 1
    }
  }

  // Get active selected suspect profile
  const activeProfile = suspectsDb[selectedSuspect] || suspectsDb['Rahul Kumar']

  // Action Handlers
  const handleToolbarReset = () => {
    setResetTrigger((prev) => prev + 1)
  }

  const handleToolbarCenter = () => {
    setCenterTrigger((prev) => prev + 1)
  }

  const handleToolbarExpand = () => {
    setExpandTrigger((prev) => prev + 1)
  }

  const handleToolbarExport = () => {
    alert(`[SYSTEM CALL] Exporting relational link matrix for ${activeProfile.name} in PDF/JSON formats...`)
  }

  const handleRightPanelAction = (actionName: string) => {
    alert(`[SYSTEM CALL] Triggering Executive Action:\n- Target Accused: ${activeProfile.name}\n- Operation: ${actionName}`)
  }

  return (
    <div className="space-y-6 animate-fade-in select-none">
      
      {/* 1. Page Header Panel */}
      <div className="border-b border-[rgba(255,255,255,0.06)] pb-5 select-none">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#F8FAFC]">
          Criminal Network Analysis
        </h1>
        <p className="text-xs uppercase tracking-widest text-[#94A3B8] font-mono mt-1">
          Visualize relationships between suspects, crimes, vehicles and associated entities.
        </p>
      </div>

      {/* 2. Top Network search and controls Toolbar */}
      <NetworkToolbar
        searchQuery={search}
        onSearchChange={setSearch}
        onReset={handleToolbarReset}
        onCenter={handleToolbarCenter}
        onExpand={handleToolbarExpand}
        onExport={handleToolbarExport}
      />

      {/* 3. Grid Workspace layout */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        
        {/* Left canvas: Graph view (70% width on desktop -> col-span-7) */}
        <div className="col-span-1 lg:col-span-7">
          <GraphCanvas
            searchQuery={search}
            onSelectSuspect={setSelectedSuspect}
            onResetTrigger={resetTrigger}
            onCenterTrigger={centerTrigger}
            onExpandTrigger={expandTrigger}
          />
        </div>

        {/* Right side: selected suspect information panel (30% width -> col-span-3) */}
        <div className="col-span-1 lg:col-span-3">
          <NodeCard
            {...activeProfile}
            onAction={handleRightPanelAction}
          />
        </div>

      </div>

    </div>
  )
}

export default CriminalNetworkPage
