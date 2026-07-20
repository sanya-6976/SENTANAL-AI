import { useState } from 'react'
import MapToolbar from './components/MapToolbar'
import GISMap from './components/GISMap'
import FilterPanel from './components/FilterPanel'

function GISPage() {
  // Top Toolbar search query state
  const [search, setSearch] = useState('')

  // Map Layer States
  const [heatmap, setHeatmap] = useState(true)
  const [points, setPoints] = useState(true)
  const [stations, setStations] = useState(true)
  const [boundary, setBoundary] = useState(true)
  const [traffic] = useState(false)

  // Filters Selection state
  const [dateRange, setDateRange] = useState('All Dates')
  const [crimeType, setCrimeType] = useState('All Types')
  const [severity, setSeverity] = useState('All')
  const [district, setDistrict] = useState('All Districts')

  // Render values to pass to Map (synced on Apply Filters click)
  const [appliedDistrict, setAppliedDistrict] = useState('All Districts')
  const [appliedSeverity, setAppliedSeverity] = useState('All')

  // Trigger filter application overlay
  const handleApplyFilters = () => {
    setAppliedDistrict(district)
    setAppliedSeverity(severity)
    alert(`[SYSTEM CRIT] Applying GIS filtering parameters:\n- Date: ${dateRange}\n- Crime Category: ${crimeType}\n- Severity Code: ${severity}\n- Target District: ${district}`)
  }

  return (
    <div className="space-y-6 animate-fade-in select-none">

      {/* 2. Top Toolbar (Search and switches) */}
      <MapToolbar
        searchQuery={search}
        onSearchChange={setSearch}
        heatmapActive={heatmap}
        setHeatmapActive={setHeatmap}
        clustersActive={points}
        setClustersActive={setPoints}
        stationsActive={stations}
        setStationsActive={setStations}
        boundaryActive={boundary}
        setBoundaryActive={setBoundary}
      />

      {/* 3. Responsive Map Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left Side: Large Map Card (80% on desktop, cols 4) */}
        <div className="col-span-1 lg:col-span-4">
          <GISMap
            heatmap={heatmap}
            points={points}
            stations={stations}
            boundary={boundary}
            traffic={traffic}
            searchQuery={search}
            selectedDistrict={appliedDistrict}
            selectedSeverity={appliedSeverity}
          />
        </div>

        {/* Right Side: Control Panels Card (20% on desktop, cols 1) */}
        <div className="col-span-1 bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 shadow-sm self-start min-h-[480px] h-full flex flex-col">
          <FilterPanel
            dateRange={dateRange}
            setDateRange={setDateRange}
            crimeType={crimeType}
            setCrimeType={setCrimeType}
            severity={severity}
            setSeverity={setSeverity}
            district={district}
            setDistrict={setDistrict}
            onApplyFilters={handleApplyFilters}
          />
        </div>

      </div>

    </div>
  )
}

export default GISPage
