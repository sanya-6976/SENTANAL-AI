import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  GlobalSearch,
  InvestigationTabs,
  CaseOverviewCard,
  EntityCard,
  AIRecommendationCard
} from './components'
import apiClient from '../../api/client'

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

  const [firData, setFirData] = useState<any>(null)
  const [evidenceData, setEvidenceData] = useState<any[]>([])
  const [crimesData, setCrimesData] = useState<any[]>([])
  const [aiInsight, setAiInsight] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [aiLoading, setAiLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [firsRes, evidenceRes, crimesRes] = await Promise.all([
          apiClient.get('/core/firs'),
          apiClient.get('/core/evidence'),
          apiClient.get('/core/crimes')
        ])
        
        if (firsRes.data && firsRes.data.length > 0) {
          setFirData(firsRes.data[0])
        }
        setEvidenceData(evidenceRes.data || [])
        setCrimesData(crimesRes.data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const caseData = firData ? {
    fir: firData.fir_number,
    caseType: 'Criminal Offense', // Derived conceptually
    district: firData.district_id || 'Unknown',
    station: firData.station_id || 'Unknown',
    officer: firData.investigating_officer_id || 'Unassigned',
    status: firData.status || 'Under Investigation',
    severity: firData.severity || 'Medium'
  } : {
    fir: 'FIR123456',
    caseType: 'Theft Case',
    district: 'Bengaluru Urban',
    station: 'JC Nagar',
    officer: 'Inspector Ramesh',
    status: 'Under Investigation',
    severity: 'Medium'
  }

  const entitiesList: EntityItem[] = [
    { type: 'accused', name: 'Ravi Kumar', age: 34, role: 'Primary Associate' },
    { type: 'vehicle', regNo: 'KA01AB1234', typeDesc: 'White Swift • Seen at 12:15 PM' },
    { type: 'victim', name: 'Suresh Babu', age: 43, status: 'Resident' }
  ]

  const recommendations = [
    'Check CCTV at 3 nearby locations.',
    'Similar modus operandi detected in 3 cases.',
    'Verify accused’s mobile location.',
    'Vehicle linked to previous FIR.',
    'Cross-check fingerprints.'
  ]

  const handleInspectEntity = (item: EntityItem) => {
    navigate(`/crime-database/${caseData.fir}`)
  }

  const handleAskAI = async () => {
    if (!firData) return;
    setAiLoading(true);
    setActiveTab('AI Insights');
    try {
      const res = await apiClient.post('/ai/report', { fir_id: firData.fir_id });
      setAiInsight(res.data.report || 'Generated AI Report data unavailable.');
    } catch (err) {
      console.error(err);
      setAiInsight('Failed to generate AI Insights. Ensure the AI service is active.');
    } finally {
      setAiLoading(false);
    }
  }

  // UI rendering blocks for each tab
  const renderTimeline = () => (
    <div className="bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-xl p-8 animate-fade-in">
      <h3 className="text-sm font-bold text-white mb-4">Case Timeline</h3>
      <div className="space-y-4">
        {crimesData.slice(0, 5).map((crime, i) => (
          <div key={crime.crime_id} className="flex gap-4 border-l-2 border-[#2563EB]/40 pl-4 py-2">
            <div className="text-xs text-[#94A3B8] font-mono min-w-[120px]">
              {new Date(crime.reported_at).toLocaleString()}
            </div>
            <div>
              <div className="text-sm text-white font-bold">{crime.crime_description || 'Crime Event'}</div>
              <div className="text-xs text-[#94A3B8]">Severity: {crime.severity} | Category ID: {crime.category_id}</div>
            </div>
          </div>
        ))}
        {firData && (
          <div className="flex gap-4 border-l-2 border-green-500/40 pl-4 py-2">
            <div className="text-xs text-[#94A3B8] font-mono min-w-[120px]">
              {new Date(firData.fir_date).toLocaleString()}
            </div>
            <div>
              <div className="text-sm text-white font-bold">FIR Registered</div>
              <div className="text-xs text-[#94A3B8]">{firData.complainant_name} filed FIR {firData.fir_number}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderEvidence = () => (
    <div className="bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-xl p-8 animate-fade-in">
      <h3 className="text-sm font-bold text-white mb-4">Evidence Registry</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {evidenceData.length > 0 ? evidenceData.map((ev) => (
          <div key={ev.evidence_id} className="bg-[#0B1220] border border-[rgba(255,255,255,0.06)] p-4 rounded-lg">
            <div className="text-xs text-[#2563EB] font-mono font-bold mb-1 uppercase">{ev.evidence_type}</div>
            <div className="text-sm text-white font-bold">{ev.description || 'No description provided'}</div>
            <div className="text-xs text-[#94A3B8] mt-2">Storage: {ev.storage_location || 'Unknown'}</div>
          </div>
        )) : (
          <div className="col-span-full text-center text-[#94A3B8] text-sm">No evidence logs found.</div>
        )}
      </div>
    </div>
  );

  const renderEntitiesGrid = (entities: EntityItem[], filterType: string) => (
    <div className="bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-xl p-8 animate-fade-in">
      <h3 className="text-sm font-bold text-white mb-4 uppercase">{filterType} PROFILES</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {entities.filter(e => e.type === filterType).map((ent, i) => (
          <div key={i} className="flex items-center gap-4 bg-[#0B1220] border border-[rgba(255,255,255,0.06)] p-4 rounded-lg">
            <div className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center text-xl">👤</div>
            <div>
              <div className="text-sm text-white font-bold">{ent.type === 'vehicle' ? ent.regNo : (ent as any).name}</div>
              <div className="text-xs text-[#94A3B8]">{ent.type === 'vehicle' ? ent.typeDesc : `${(ent as any).age} yrs • ${(ent as any).role || (ent as any).status}`}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLinkedCases = () => (
    <div className="bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-xl p-8 animate-fade-in">
      <h3 className="text-sm font-bold text-white mb-4">Linked Cases</h3>
      <div className="space-y-3">
        {crimesData.slice(0,3).map((c, i) => (
          <div key={i} className="flex justify-between items-center bg-[#0B1220] p-4 rounded-lg border border-[rgba(255,255,255,0.06)] cursor-pointer hover:border-[#2563EB]/40">
            <div>
              <div className="text-sm text-white font-bold">{c.crime_description}</div>
              <div className="text-xs text-[#94A3B8]">Severity: {c.severity}</div>
            </div>
            <div className="text-xs font-mono text-[#2563EB]">MATCH: HIGH</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAIInsights = () => (
    <div className="bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-xl p-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
          Sentinel AI Report
        </h3>
        <button onClick={handleAskAI} disabled={aiLoading || !firData} className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold">
          {aiLoading ? 'Generating...' : 'Generate New Insight'}
        </button>
      </div>
      <div className="text-sm text-[#94A3B8] leading-relaxed whitespace-pre-wrap bg-[#0B1220] p-6 rounded-lg border border-[rgba(255,255,255,0.06)]">
        {aiInsight || 'No AI insights generated yet. Click "Generate New Insight" to compile the case brief.'}
      </div>
    </div>
  );

  if (loading) {
    return <div className="text-white text-center py-20 animate-pulse">Loading Workspace...</div>
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
      {activeTab === 'Case Overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-6 pt-2">
          <div className="col-span-1 md:col-span-1 lg:col-span-3">
            <CaseOverviewCard {...caseData} />
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-4">
            <EntityCard entities={entitiesList} onInspect={handleInspectEntity} />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <AIRecommendationCard recommendations={recommendations} onAskAI={handleAskAI} />
          </div>
        </div>
      )}
      {activeTab === 'TIMELINE' && renderTimeline()}
      {activeTab === 'EVIDENCE' && renderEvidence()}
      {activeTab === 'VICTIMS' && renderEntitiesGrid(entitiesList, 'victim')}
      {activeTab === 'VEHICLES' && renderEntitiesGrid(entitiesList, 'vehicle')}
      {activeTab === 'LINKED CASES' && renderLinkedCases()}
      {activeTab === 'AI INSIGHTS' && renderAIInsights()}

    </div>
  )
}

export default InvestigationPage
