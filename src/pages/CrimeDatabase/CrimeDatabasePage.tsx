import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Download,
  SlidersHorizontal,
  Eye,
  FileText,
  ChevronRight
} from 'lucide-react'
import {
  DatabaseSearchBar,
  DatabaseFilterSelect,
  DatabaseStatusBadge,
  DatabaseSeverityBadge,
  DatabasePagination,
  DatabaseEmptyState,
} from '../../components/ui/DatabaseComponents'
import type {
  CrimeStatusType,
  CrimeSeverityType
} from '../../components/ui/DatabaseComponents'

// 1. Types Definitions for Crime Records
interface CrimeRecord {
  fir: string
  type: string
  district: string
  station: string
  date: string
  status: CrimeStatusType
  severity: CrimeSeverityType
  suspect: string
  phone: string
  vehicle?: string
}

// 2. Mock 10 Detailed Crime Database Records representing Karnataka
const initialCrimeRecords: CrimeRecord[] = [
  {
    fir: 'FIR/2025/1043',
    type: 'Theft',
    district: 'Bengaluru',
    station: 'JC Nagar PS',
    date: '12 May 2025',
    status: 'Under Investigation',
    severity: 'Medium',
    suspect: 'Ramesh Kumar',
    phone: '9845012345',
    vehicle: 'KA-04-EH-2812'
  },
  {
    fir: 'FIR/2025/1102',
    type: 'Robbery',
    district: 'Mysuru',
    station: 'VV Puram PS',
    date: '12 May 2025',
    status: 'Active',
    severity: 'High',
    suspect: 'Shekhar Gowda',
    phone: '9900234567',
    vehicle: 'KA-09-MA-7833'
  },
  {
    fir: 'FIR/2025/2091',
    type: 'Assault',
    district: 'Hubballi',
    station: 'Hubballi North PS',
    date: '11 May 2025',
    status: 'Under Investigation',
    severity: 'Medium',
    suspect: 'Manjunath S',
    phone: '7760456123'
  },
  {
    fir: 'FIR/2025/3044',
    type: 'Cyber Crime',
    district: 'Bengaluru',
    station: 'Cyber Crime Cell',
    date: '11 May 2025',
    status: 'Active',
    severity: 'Critical',
    suspect: 'Unknown Hacker',
    phone: '8095112233'
  },
  {
    fir: 'FIR/2025/1298',
    type: 'Kidnapping',
    district: 'Mangaluru',
    station: 'Mangaluru Town PS',
    date: '10 May 2025',
    status: 'Pending',
    severity: 'Critical',
    suspect: 'Vikram Hegde',
    phone: '9448123456',
    vehicle: 'KA-19-P-4402'
  },
  {
    fir: 'FIR/2025/0843',
    type: 'Fraud',
    district: 'Dharwad',
    station: 'Dharwad PS',
    date: '10 May 2025',
    status: 'Closed',
    severity: 'Low',
    suspect: 'Sunitha Rao',
    phone: '8236124578'
  },
  {
    fir: 'FIR/2025/1429',
    type: 'Burglary',
    district: 'Belagavi',
    station: 'Belagavi PS',
    date: '09 May 2025',
    status: 'Solved',
    severity: 'High',
    suspect: 'Anand Nayak',
    phone: '9880112233'
  },
  {
    fir: 'FIR/2025/0932',
    type: 'Vehicle Theft',
    district: 'Kalaburagi',
    station: 'Kalaburagi PS',
    date: '08 May 2025',
    status: 'Solved',
    severity: 'Medium',
    suspect: 'Malik Patel',
    phone: '7022345678',
    vehicle: 'KA-32-Y-9082'
  },
  {
    fir: 'FIR/2025/1703',
    type: 'Drug Trafficking',
    district: 'Udupi',
    station: 'Udupi Coastal PS',
    date: '07 May 2025',
    status: 'Active',
    severity: 'Critical',
    suspect: 'D Souza Fernandes',
    phone: '9945887766'
  },
  {
    fir: 'FIR/2025/2241',
    type: 'Domestic Violence',
    district: 'Tumakuru',
    station: 'Tumakuru PS',
    date: '06 May 2025',
    status: 'Closed',
    severity: 'Low',
    suspect: 'Nagaraju K',
    phone: '8861234599'
  }
]

// 3. Dropdowns Selection Lists
const districtOptions = [
  { value: 'All Districts', label: 'All Districts' },
  { value: 'Bengaluru', label: 'Bengaluru' },
  { value: 'Mysuru', label: 'Mysuru' },
  { value: 'Hubballi', label: 'Hubballi' },
  { value: 'Mangaluru', label: 'Mangaluru' },
  { value: 'Dharwad', label: 'Dharwad' },
  { value: 'Belagavi', label: 'Belagavi' },
  { value: 'Udupi', label: 'Udupi' },
  { value: 'Kalaburagi', label: 'Kalaburagi' },
  { value: 'Tumakuru', label: 'Tumakuru' }
]

const typeOptions = [
  { value: 'All Types', label: 'All Types' },
  { value: 'Theft', label: 'Theft' },
  { value: 'Cyber Crime', label: 'Cyber Crime' },
  { value: 'Robbery', label: 'Robbery' },
  { value: 'Burglary', label: 'Burglary' },
  { value: 'Kidnapping', label: 'Kidnapping' },
  { value: 'Fraud', label: 'Fraud' },
  { value: 'Assault', label: 'Assault' },
  { value: 'Drug Trafficking', label: 'Drug Trafficking' },
  { value: 'Domestic Violence', label: 'Domestic Violence' },
  { value: 'Vehicle Theft', label: 'Vehicle Theft' }
]

const statusOptions = [
  { value: 'All Status', label: 'All Status' },
  { value: 'Under Investigation', label: 'Under Investigation' },
  { value: 'Active', label: 'Active' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Closed', label: 'Closed' },
  { value: 'Solved', label: 'Solved' }
]

const dateOptions = [
  { value: 'All Dates', label: 'All Dates' },
  { value: 'Last 7 Days', label: 'Last 7 Days' },
  { value: 'Last 30 Days', label: 'Last 30 Days' },
  { value: 'Year 2025', label: 'Year 2025' }
]

function CrimeDatabasePage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [district, setDistrict] = useState('All Districts')
  const [crimeType, setCrimeType] = useState('All Types')
  const [status, setStatus] = useState('All Status')
  const [dateRange, setDateRange] = useState('All Dates')
  
  const [showFiltersPanel, setShowFiltersPanel] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  // 4. Real-time Search and Filter Calculations
  const filteredRecords = useMemo(() => {
    return initialCrimeRecords.filter((row) => {
      // a. Text keyword matching
      if (search.trim() !== '') {
        const query = search.toLowerCase()
        const matchFir = row.fir.toLowerCase().includes(query)
        const matchType = row.type.toLowerCase().includes(query)
        const matchDist = row.district.toLowerCase().includes(query)
        const matchSuspect = row.suspect.toLowerCase().includes(query)
        const matchPhone = row.phone.includes(query)
        const matchVehicle = row.vehicle ? row.vehicle.toLowerCase().includes(query) : false
        
        if (!matchFir && !matchType && !matchDist && !matchSuspect && !matchPhone && !matchVehicle) {
          return false
        }
      }

      // b. District filter matching
      if (district !== 'All Districts' && row.district !== district) return false

      // c. Crime Category filter matching
      if (crimeType !== 'All Types' && row.type !== crimeType) return false

      // d. Status filter matching
      if (status !== 'All Status' && row.status !== status) return false

      // e. Date ranges filter matching (mock index filter)
      if (dateRange === 'Last 7 Days') {
        const day = parseInt(row.date.split(' ')[0], 10)
        if (day < 6) return false // May 6 - May 12 is last 7 days
      }

      return true
    })
  }, [search, district, crimeType, status, dateRange])

  // Reset Filters trigger
  const handleClearFilters = () => {
    setSearch('')
    setDistrict('All Districts')
    setCrimeType('All Types')
    setStatus('All Status')
    setDateRange('All Dates')
    setCurrentPage(1)
  }

  // System Export Action
  const handleExport = () => {
    alert(`Exporting ${filteredRecords.length} crime records database registry as PDF/CSV configuration...`)
  }

  // Action Click Alerts
  const handleRowInspect = (row: CrimeRecord, type: 'view' | 'record' | 'navigate') => {
    if (type === 'view') {
      navigate(`/crime-database/${row.fir.replace(/\//g, '_')}`)
    } else if (type === 'record') {
      alert(`[CASE MANAGEMENT SYSTEM] Opening Case Records Logs for ${row.fir} in Workspace...`)
    } else {
      alert(`[NAVIGATION INTERFACE] Navigating to detailed GIS risk coordinates page for ${row.district}...`)
    }
  }

  // Left strip color key mapper
  const getSeverityStrip = (severity: CrimeSeverityType) => {
    switch (severity) {
      case 'Low': return 'border-l-4 border-l-[#22C55E]'
      case 'Medium': return 'border-l-4 border-l-[#F59E0B]'
      case 'High': return 'border-l-4 border-l-[#F97316]'
      case 'Critical': return 'border-l-4 border-l-[#EF4444]'
    }
  }

  return (
    <div className="space-y-6 animate-fade-in select-none">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-[rgba(255,255,255,0.06)] pb-5 mb-6 gap-4 select-none">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#F8FAFC]">
            Crime Database
          </h1>
          <p className="text-xs uppercase tracking-widest text-[#94A3B8] font-mono mt-1">
            Search, monitor and manage all registered crime records across Karnataka.
          </p>
        </div>
        
        {/* Export Button */}
        <button
          onClick={handleExport}
          className="flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-[#F8FAFC] font-semibold text-[10px] tracking-widest uppercase px-4 py-2.5 rounded-lg transition-all cursor-pointer duration-150 outline-none focus:ring-1 focus:ring-[#2563EB] hover:shadow-[0_4px_12px_rgba(37,99,235,0.3)] shrink-0 self-start sm:self-center"
        >
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>

      {/* FILTER PANEL WRAPPER CARD */}
      <div className="bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 shadow-md flex flex-col gap-4">
        
        {/* Row 1: Search & Filter toggle button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <DatabaseSearchBar
            value={search}
            onChange={(val) => { setSearch(val); setCurrentPage(1); }}
            placeholder="Search by FIR Number, Crime, Suspect, Vehicle, Phone Number or Location..."
          />
          
          <button
            onClick={() => setShowFiltersPanel(!showFiltersPanel)}
            className={`flex items-center justify-center gap-2 border px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer duration-150 shrink-0 outline-none ${
              showFiltersPanel
                ? 'bg-[#2563EB]/10 border-[#2563EB]/30 text-white'
                : 'bg-[#0B1220] border-[rgba(255,255,255,0.06)] text-[#94A3B8] hover:text-white hover:border-[rgba(255,255,255,0.12)]'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Row 2: Aligned Select Dropdowns (collapsible block) */}
        {showFiltersPanel && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-[rgba(255,255,255,0.04)] pt-4 animate-slide-down">
            <DatabaseFilterSelect
              label="Date Range"
              value={dateRange}
              onChange={(val) => { setDateRange(val); setCurrentPage(1); }}
              options={dateOptions}
            />
            <DatabaseFilterSelect
              label="District"
              value={district}
              onChange={(val) => { setDistrict(val); setCurrentPage(1); }}
              options={districtOptions}
            />
            <DatabaseFilterSelect
              label="Crime Type"
              value={crimeType}
              onChange={(val) => { setCrimeType(val); setCurrentPage(1); }}
              options={typeOptions}
            />
            <DatabaseFilterSelect
              label="Status"
              value={status}
              onChange={(val) => { setStatus(val); setCurrentPage(1); }}
              options={statusOptions}
            />
          </div>
        )}
      </div>

      {/* DATABASE GRID LIST DATA TABLE */}
      {filteredRecords.length > 0 ? (
        <div className="bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 shadow-sm space-y-4">
          <div className="overflow-x-auto rounded-xl border border-[rgba(255,255,255,0.04)] bg-[#0B1220]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.06)] text-[9px] font-mono uppercase tracking-widest text-[#94A3B8] bg-[#111827]/30">
                  <th className="px-5 py-3.5 font-bold">FIR Number</th>
                  <th className="px-4 py-3.5 font-bold">Crime Type</th>
                  <th className="px-4 py-3.5 font-bold">District</th>
                  <th className="px-4 py-3.5 font-bold">Police Station</th>
                  <th className="px-4 py-3.5 font-bold">Date</th>
                  <th className="px-4 py-3.5 font-bold">Status</th>
                  <th className="px-4 py-3.5 font-bold">Severity</th>
                  <th className="px-5 py-3.5 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.03)] text-[11.5px]">
                {filteredRecords.map((row) => (
                  <tr
                    key={row.fir}
                    onClick={() => navigate(`/crime-database/${row.fir.replace(/\//g, '_')}`)}
                    className={`hover:bg-[#182235]/40 transition-all duration-150 text-[#F8FAFC] cursor-pointer ${getSeverityStrip(row.severity)}`}
                  >
                    <td className="px-5 py-3.5 font-bold font-mono text-[#2563EB]">
                      {row.fir}
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-white">{row.type}</td>
                    <td className="px-4 py-3.5 text-[#94A3B8]">{row.district}</td>
                    <td className="px-4 py-3.5 text-[#94A3B8]">{row.station}</td>
                    <td className="px-4 py-3.5 font-medium">{row.date}</td>
                    <td className="px-4 py-3.5">
                      <DatabaseStatusBadge status={row.status} />
                    </td>
                    <td className="px-4 py-3.5">
                      <DatabaseSeverityBadge severity={row.severity} />
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-3 text-[#94A3B8]">
                        
                        {/* Action 1: Eye Icon */}
                        <button
                          onClick={(e) => { e.stopPropagation(); handleRowInspect(row, 'view'); }}
                          title="View Details"
                          className="hover:text-white transition-all duration-150 cursor-pointer p-1 rounded hover:bg-[#182235]"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        
                        {/* Action 2: FileText Icon */}
                        <button
                          onClick={(e) => { e.stopPropagation(); handleRowInspect(row, 'record'); }}
                          title="Open Record Logs"
                          className="hover:text-[#2563EB] transition-all duration-150 cursor-pointer p-1 rounded hover:bg-[#182235]"
                        >
                          <FileText className="h-4 w-4" />
                        </button>
                        
                        {/* Action 3: Navigate Chevron */}
                        <button
                          onClick={(e) => { e.stopPropagation(); handleRowInspect(row, 'navigate'); }}
                          title="Navigate Geographic coordinates"
                          className="hover:text-[#2563EB] transition-all duration-150 cursor-pointer p-1 rounded hover:bg-[#182235]"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGE FOOTER PAGINATION ALIGNMENT */}
          <div className="flex justify-center pt-2">
            <DatabasePagination
              currentPage={currentPage}
              totalPages={2}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      ) : (
        /* Styled Empty Filter State */
        <DatabaseEmptyState onClearFilters={handleClearFilters} />
      )}
    </div>
  )
}

export default CrimeDatabasePage
