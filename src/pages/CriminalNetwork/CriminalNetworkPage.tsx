import { useState, useEffect, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Sparkles, Loader2, X } from 'lucide-react'
import {
  NetworkToolbar,
  GraphCanvas,
  NodeCard
} from './components'
import { getSuspectNetwork } from '../../api/analytics.api'
import { askAIAssistant } from '../../api/ai.api'
import { mockNodes } from './data/MockGraphData'

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

  const [nodes, setNodes] = useState<any[]>([])
  const [links, setLinks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // AI Insights State
  const [aiInsight, setAiInsight] = useState<string | null>(null)
  const [isLoadingAI, setIsLoadingAI] = useState(false)

  useEffect(() => {
    const loadGraph = async () => {
      try {
        setError(null)
        setLoading(true)
        const data = await getSuspectNetwork()
        const rawNodes = Array.isArray(data?.nodes) ? data.nodes : []
        const rawEdges = Array.isArray(data?.edges) ? data.edges : []

        // Coordinate Mapping: if matches mock node, use x/y. Otherwise compute circular layout coordinates.
        const numNodes = rawNodes.length
        const centerX = 50
        const centerY = 50
        const radius = 32

        const mappedNodes = rawNodes.map((node: any, index: number) => {
          const mockNode = mockNodes.find(n => n.id.toLowerCase() === node.id.toLowerCase() || n.label.toLowerCase() === node.label.toLowerCase())
          let x = mockNode?.x
          let y = mockNode?.y

          if (x === undefined || y === undefined) {
            if (index === 0) {
              x = centerX
              y = centerY
            } else {
              const angle = ((index - 1) / (numNodes - 1)) * 2 * Math.PI
              x = centerX + radius * Math.cos(angle)
              y = centerY + radius * Math.sin(angle)
            }
          }

          return {
            id: node.id,
            label: node.label,
            type: node.type || (node.id === 'Rahul Kumar' ? 'suspect' : 'associate'),
            x: Math.max(5, Math.min(95, x)),
            y: Math.max(5, Math.min(95, y)),
            isHighRisk: node.status === 'Active' || node.isHighRisk
          }
        })

        const mappedLinks = rawEdges.map((edge: any) => ({
          source: edge.source,
          target: edge.target
        }))

        setNodes(mappedNodes)
        setLinks(mappedLinks)

        if (mappedNodes.length > 0 && !mappedNodes.some(n => n.id === 'Rahul Kumar')) {
          setSelectedSuspect(mappedNodes[0].id)
        }
      } catch (err) {
        console.error(err)
        setError('Unable to load criminal suspect network.')
      } finally {
        setLoading(false)
      }
    }
    loadGraph()
  }, [])

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
  const activeProfile = useMemo(() => {
    if (suspectsDb[selectedSuspect]) {
      return suspectsDb[selectedSuspect]
    }
    const matchedNode = nodes.find(n => n.id === selectedSuspect)
    return {
      name: matchedNode?.label || selectedSuspect,
      age: 32,
      district: 'Bengaluru Urban',
      status: matchedNode?.isHighRisk ? 'Active Alert' : 'Under Investigation',
      riskScore: matchedNode?.isHighRisk ? 90 : 65,
      firs: 3,
      associates: 2,
      vehicles: 1,
      phones: 1,
      locations: 2,
      arrests: 0
    }
  }, [selectedSuspect, nodes])

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

  const handleRightPanelAction = async (actionName: string) => {
    if (actionName === 'Ask AI Assistant') {
      setIsLoadingAI(true)
      setAiInsight(null)
      try {
        const res = await askAIAssistant({
          question: `Analyze suspect ${activeProfile.name} (Age: ${activeProfile.age}, Location: ${activeProfile.district}, Status: ${activeProfile.status}, Risk Score: ${activeProfile.riskScore}, FIRs: ${activeProfile.firs}, Associates: ${activeProfile.associates}) and provide a comprehensive investigative intelligence report.`
        })
        setAiInsight(res.response)
      } catch (err) {
        console.error("AI Assistant Error:", err)
        setAiInsight("Failed to generate AI insights.")
      } finally {
        setIsLoadingAI(false)
      }
    } else {
      alert(`[SYSTEM CALL] Triggering Executive Action:\n- Target Accused: ${activeProfile.name}\n- Operation: ${actionName}`)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-[#94A3B8] font-mono text-sm tracking-widest">
        Loading suspect network...
      </div>
    )
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
            nodes={nodes}
            links={links}
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

      {/* 4. Horizontal AI Insights Panel */}
      {(isLoadingAI || aiInsight) && (
        <div className="bg-[#111827] border border-[#2563EB]/30 rounded-xl p-6 shadow-[0_0_20px_rgba(37,99,235,0.1)] animate-fade-in relative mt-6">
          {!isLoadingAI && (
            <button 
              onClick={() => setAiInsight(null)}
              className="absolute top-4 right-4 text-[#94A3B8] hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          
          <div className="flex items-center gap-3 mb-4 border-b border-[rgba(255,255,255,0.06)] pb-4">
            <div className="h-10 w-10 rounded-lg bg-[#2563EB]/20 border border-[#2563EB]/40 flex items-center justify-center text-[#2563EB]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white tracking-wide">
                AI Intelligence Brief
              </h3>
              <p className="text-[#94A3B8] text-xs font-mono uppercase tracking-widest mt-0.5">
                Target Profile: {activeProfile.name}
              </p>
            </div>
          </div>

          <div className="text-sm text-[#E2E8F0] leading-relaxed">
            {isLoadingAI ? (
              <div className="flex flex-col items-center justify-center py-8 gap-3 text-[#94A3B8]">
                <Loader2 className="h-8 w-8 animate-spin text-[#2563EB]" />
                <span className="font-mono text-xs uppercase tracking-widest animate-pulse">
                  Synthesizing operational intelligence...
                </span>
              </div>
            ) : (
              <div className="prose prose-invert prose-sm max-w-none prose-headings:text-[#F8FAFC] prose-headings:font-extrabold prose-a:text-[#2563EB] prose-strong:text-white prose-li:marker:text-[#2563EB]">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {aiInsight || ''}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default CriminalNetworkPage
