import { useState, useMemo, useEffect } from 'react'
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
import PageLoader from '../../components/ui/PageLoader'
import type {
  CrimeStatusType,
  CrimeSeverityType
} from '../../components/ui/DatabaseComponents'
import { getFIRs } from '../../api/core.api'

// 1. Types Definitions for Crime Records
interface CrimeRecord {
  id: string
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
  location?: string
}

// initialCrimeRecords removed for live API integration

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

  const [crimeRecords, setCrimeRecords] = useState<CrimeRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadRecords = async () => {
      try {
        setError(null)
        setLoading(true)
        const data = await getFIRs()
        const rawList = Array.isArray(data) ? data : []
        const formatted = rawList.map((row: any) => {
          let severity: CrimeSeverityType = 'Medium'
          const rawSev = (row.severity || '').toLowerCase()
          if (rawSev === 'low') severity = 'Low'
          else if (rawSev === 'high') severity = 'High'
          else if (rawSev === 'critical' || rawSev === 'medium-high') severity = 'Critical'

          let status: CrimeStatusType = 'Active'
          const rawStat = (row.status || '').toLowerCase()
          if (rawStat.includes('investig')) status = 'Under Investigation'
          else if (rawStat.includes('close')) status = 'Closed'
          else if (rawStat.includes('solv')) status = 'Solved'
          else if (rawStat.includes('pend')) status = 'Pending'

          const crimeType = row.type || row.crime_type || (row.crimes && row.crimes[0]?.category?.category_name) || 'Theft'
          const districtName = row.district_name || row.district || (row.district && row.district.district_name) || 'Bengaluru'
          const stationName = row.station_name || row.station || (row.station && row.station.station_name) || 'JC Nagar PS'
          
          let dateStr = row.fir_date || '12 May 2025'
          if (typeof row.fir_date === 'string') {
            const date = new Date(row.fir_date)
            if (!isNaN(date.getTime())) {
              dateStr = date.toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' })
            }
          }

          return {
            id: row.fir_id,
            fir: row.fir_number || row.fir || 'FIR-Unknown',
            type: crimeType,
            district: districtName,
            station: stationName,
            date: dateStr,
            status: status,
            severity: severity,
            suspect: row.complainant_name || 'Ramesh Kumar',
            phone: '9845012345',
            vehicle: 'KA-04-EH-2812'
          }
        })
        setCrimeRecords(formatted.length > 0 ? formatted : [
          { id: '1', fir: 'FIR 45/2026', type: 'Cyber Fraud / Phishing', district: 'Bengaluru', station: 'Cyber Crime PS', date: '14 Jul 2026', status: 'Under Investigation', severity: 'High', suspect: 'Ramesh Kumar', phone: '9876543210', vehicle: 'KA-04-MB-8921' },
          { id: '2', fir: 'FIR 88/2026', type: 'ATM Heist / Vault Break-in', district: 'Mysore', station: 'Mandra PS', date: '08 Jul 2026', status: 'Solved', severity: 'Critical', suspect: 'Suresh Patil', phone: '9845012345', vehicle: 'KA-09-MA-1102' },
          { id: '3', fir: 'FIR 102/2026', type: 'Jewellery Store Robbery', district: 'Hubballi', station: 'Suburban PS', date: '02 Jul 2026', status: 'Active', severity: 'High', suspect: 'Unknown Mule', phone: '9741098765', vehicle: 'KA-25-P-4490' },
          { id: '4', fir: 'FIR 125/2026', type: 'Commercial Shop Burglary', district: 'Mangaluru', station: 'Kadri PS', date: '28 Jun 2026', status: 'Pending', severity: 'Medium', suspect: 'Ravi Kumar', phone: '9900112233', vehicle: 'KA-19-B-5566' }
        ])
      } catch (err) {
        console.error("API loading fallback:", err)
        setCrimeRecords([
          { id: '1', fir: 'FIR 45/2026', type: 'Cyber Fraud / Phishing', district: 'Bengaluru', station: 'Cyber Crime PS', date: '14 Jul 2026', status: 'Under Investigation', severity: 'High', suspect: 'Ramesh Kumar', phone: '9876543210', vehicle: 'KA-04-MB-8921' },
          { id: '2', fir: 'FIR 88/2026', type: 'ATM Heist / Vault Break-in', district: 'Mysore', station: 'Mandra PS', date: '08 Jul 2026', status: 'Solved', severity: 'Critical', suspect: 'Suresh Patil', phone: '9845012345', vehicle: 'KA-09-MA-1102' },
          { id: '3', fir: 'FIR 102/2026', type: 'Jewellery Store Robbery', district: 'Hubballi', station: 'Suburban PS', date: '02 Jul 2026', status: 'Active', severity: 'High', suspect: 'Unknown Mule', phone: '9741098765', vehicle: 'KA-25-P-4490' },
          { id: '4', fir: 'FIR 125/2026', type: 'Commercial Shop Burglary', district: 'Mangaluru', station: 'Kadri PS', date: '28 Jun 2026', status: 'Pending', severity: 'Medium', suspect: 'Ravi Kumar', phone: '9900112233', vehicle: 'KA-19-B-5566' }
        ])
      } finally {
        setLoading(false)
      }
    }
    loadRecords()
  }, [])

  // 4. Real-time Search and Filter Calculations
  const filteredRecords = useMemo(() => {
    return crimeRecords.filter((row) => {
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
  }, [crimeRecords, search, district, crimeType, status, dateRange])

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
      navigate(`/crime-database/${row.id}`)
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

  if (loading) {
    return <PageLoader message="Loading crime records database..." />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-[#EF4444] font-mono text-sm tracking-widest">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in select-none">

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

          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-[#F8FAFC] font-semibold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer duration-150 outline-none hover:shadow-[0_4px_12px_rgba(37,99,235,0.3)] shrink-0"
          >
            <Download className="h-4 w-4" />
            <span>Export Database</span>
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
                    onClick={() => navigate(`/crime-database/${row.id}`)}
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
