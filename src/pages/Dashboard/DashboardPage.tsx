import {
  Shield,
  FolderOpen,
  BadgeCheck,
  TrendingUp,
  MapPinned,
  BellRing,
  Search,
  FileText,
  Bot,
  ChevronRight
} from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import {
  PageHeader,
  DashboardCard,
  KPICard,
  SecondaryButton,
} from '../../components/ui/DashboardComponents'
import apiClient from "../../api/client";


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 3. Status Badge Components
interface StatusBadgeProps {
  status: 'Active' | 'Investigating' | 'Closed'
}

function CaseStatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    Active: 'bg-[#22C55E]/10 border-[#22C55E]/20 text-[#22C55E]',
    Investigating: 'bg-[#F59E0B]/10 border-[#F59E0B]/20 text-[#F59E0B]',
    Closed: 'bg-gray-500/10 border-gray-500/20 text-[#94A3B8]',
  }
  return (
    <span className={`px-2.5 py-0.5 rounded border text-[8px] font-mono tracking-wider font-bold uppercase transition-all duration-150 ${styles[status]}`}>
      {status}
    </span>
  )
}

interface SeverityBadgeProps {
  severity: 'High' | 'Medium' | 'Low'
}

function SeverityBadge({ severity }: SeverityBadgeProps) {
  const styles = {
    High: 'bg-[#EF4444]/15 border-[#EF4444]/30 text-[#EF4444]',
    Medium: 'bg-[#F59E0B]/15 border-[#F59E0B]/30 text-[#F59E0B]',
    Low: 'bg-[#22C55E]/15 border-[#22C55E]/30 text-[#22C55E]',
  }
  return (
    <span className={`px-2.5 py-0.5 rounded border text-[8px] font-mono tracking-wider font-bold uppercase transition-all duration-150 ${styles[severity]}`}>
      {severity}
    </span>
  )
}

interface DistrictIntelligence {
  name: string;
  color: string;
  status: string;
}

interface CrimeCategory {
  name: string;
  value: number;
  color: string;
}

interface RecentCase {
  fir: string;
  type: string;
  district: string;
  severity: "High" | "Medium" | "Low";
  status: "Active" | "Investigating" | "Closed";
}

interface MonthlyStat {
  name: string;
  Crimes: number;
}

function DashboardPage() {
  const navigate = useNavigate();

  const [stats, setStats] = useState<any>(null);
  const [crimeTrendData, setCrimeTrendData] = useState<MonthlyStat[]>([]);
  const [categoryData, setCategoryData] = useState<CrimeCategory[]>([]);
  const [districtIntelligence, setDistrictIntelligence] = useState<DistrictIntelligence[]>([]);
  const [recentCases, setRecentCases] = useState<RecentCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [
          statsRes,
          trendRes,
          categoryRes,
          districtRes,
          firRes,
        ] = await Promise.all([
          apiClient.get("/analytics/dashboard/stats"),
          apiClient.get("/analytics/dashboard/monthly-stats"),
          apiClient.get("/analytics/dashboard/crimes-by-category"),
          apiClient.get("/analytics/dashboard/crimes-by-district"),
          apiClient.get("/core/firs"),
        ]);

        setStats(statsRes.data);
        setCrimeTrendData(trendRes.data);
        setCategoryData(categoryRes.data);
        setDistrictIntelligence(districtRes.data);
        setRecentCases(firRes.data);
        console.log("Stats:", statsRes.data);
        console.log("Trend:", trendRes.data);
        console.log("Category:", categoryRes.data);
        console.log("District:", districtRes.data);
        console.log("FIR:", firRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08182F]">
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-lg font-medium text-white">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in select-none">
      
      {/* SECTION 1: Page Header */}
      <PageHeader
        title="Dashboard"
        subtitle="Crime Intelligence Overview"
        role="SCRB Analyst"
      />

      {/* SECTION 2: 6 Reusable KPI Cards with distinct colors and shapes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard
          title="Total Crimes"
          value={stats?.total_crimes ?? "--"}
          trend="↑ +12.8%"
          trendLabel="this month"
          trendType="up"
          trendBadge="ANNUAL"
          icon={Shield}
          color="blue"
        />
        <KPICard
          title="Active Cases"
          value={stats?.active_cases ?? "--"}
          trend="↑ +5.6%"
          trendLabel="this month"
          trendType="up"
          trendBadge="LIVE"
          icon={FolderOpen}
          color="orange"
        />
        <KPICard
          title="Solved Cases"
          value={stats?.solved_cases ?? "--"}
          trend="↑ +11.2%"
          trendLabel="this month"
          trendType="up"
          trendBadge="SOLVED"
          icon={BadgeCheck}
          color="green"
        />
        <KPICard
          title="Arrest Rate"
          value={stats?.arrest_rate ?? "--"}
          trend="↑ +8.3%"
          trendLabel="this month"
          trendType="up"
          trendBadge="TARGET"
          icon={TrendingUp}
          color="purple"
        />
        <KPICard
          title="High Risk Districts"
          value={stats?.high_risk_districts ?? "--"}
          trend="View Details"
          trendType="neutral"
          icon={MapPinned}
          color="yellow"
          onClickTrend={() => alert("Forwarding to GIS Geographical risk maps panel...")}
        />
        <KPICard
          title="Live Alerts"
          value={stats?.live_alerts ?? "--"}
          trend="View Alerts"
          trendType="neutral"
          icon={BellRing}
          color="red"
          onClickTrend={() => alert("Displaying active control room alerts console...")}
        />
      </div>

      {/* CHARTS CONTAINER GRID (8 Cols / 4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SECTION 3: Crime Trend Line Chart */}
        <div className="lg:col-span-8">
          <DashboardCard
            title="Crime Trends (Last 6 Months)"
            subtitle="Monthly Registered Crime Statistics"
            action={
              <SecondaryButton onClick={() => alert("Downloading PDF summary report...")}>
                Export PDF
              </SecondaryButton>
            }
          >
            <div className="h-[300px] w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={crimeTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="areaBlueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.03)" vertical={false} />
                  
                  <XAxis
                    dataKey="name"
                    stroke="#94A3B8"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    dy={8}
                  />
                  <YAxis
                    stroke="#94A3B8"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    dx={-6}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111827',
                      borderColor: 'rgba(255, 255, 255, 0.06)',
                      borderRadius: '12px',
                      fontSize: '11px',
                    }}
                    labelStyle={{ color: '#F8FAFC', fontWeight: 'bold' }}
                    itemStyle={{ color: '#2563EB' }}
                  />
                  <Legend 
                    verticalAlign="top" 
                    height={36} 
                    iconType="circle"
                    wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#F8FAFC' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="Crimes"
                    stroke="#2563EB"
                    strokeWidth={2.5}
                    fill="url(#areaBlueGradient)"
                    dot={{ fill: '#0B1220', stroke: '#2563EB', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#2563EB', stroke: '#0B1220', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>
        </div>

        {/* SECTION 4: Crime Category Analysis Doughnut */}
        <div className="lg:col-span-4">
          <DashboardCard
            title="Crime by Category"
            subtitle="Case File Classification"
          >
            <div className="h-[210px] w-full flex items-center justify-center mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111827',
                      borderColor: 'rgba(255, 255, 255, 0.06)',
                      borderRadius: '12px',
                      fontSize: '11px',
                    }}
                    itemStyle={{ color: '#F8FAFC' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Custom Pie Legend Grid with percentages and proper spacing */}
            <div className="grid grid-cols-2 gap-3 mt-4 text-[10px] font-mono border-t border-[rgba(255,255,255,0.06)] pt-4 select-none">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[#94A3B8]">{item.name}</span>
                  </div>
                  <span className="text-white font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

      </div>

      {/* LOWER CONTENT SECTION (4 Cols / 5 Cols / 3 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* SECTION 5: District Intelligence radar card with legend */}
        <div className="lg:col-span-4">
          <DashboardCard
            title="District Wise Crimes"
            subtitle="Geographical Risk Assessment"
          >
            {/* Outline placeholder representation of Karnataka */}
            <div className="relative h-[160px] bg-[#0B1220] border border-[rgba(255,255,255,0.06)] rounded-xl flex items-center justify-center overflow-hidden mb-4 select-none">
              
              {/* Radar radar sweep vectors */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.08)_0%,transparent_70%)]" />
              <div className="absolute h-36 w-36 border border-[#2563EB]/15 rounded-full animate-pulse flex items-center justify-center">
                <div className="h-24 w-24 border border-[#2563EB]/10 rounded-full flex items-center justify-center">
                  <div className="h-12 w-12 border border-[#2563EB]/5 rounded-full" />
                </div>
              </div>
              
              {/* stylized state map nodes outline */}
              <svg className="absolute h-32 w-32 opacity-25 stroke-[#2563EB]" viewBox="0 0 100 100" fill="none">
                <polygon points="50,10 65,25 70,45 85,60 75,85 60,90 35,75 25,60 20,40 35,20" strokeWidth="1" strokeDasharray="3 2" />
                <line x1="50" y1="10" x2="60" y2="90" strokeWidth="0.5" opacity="0.3" />
                <line x1="20" y1="40" x2="85" y2="60" strokeWidth="0.5" opacity="0.3" />
                {/* Node coordinates */}
                <circle cx="50" cy="10" r="2.5" fill="#2563EB" />
                <circle cx="70" cy="45" r="3" fill="#EF4444" className="animate-ping" style={{ transformOrigin: '70px 45px' }} />
                <circle cx="70" cy="45" r="2.5" fill="#EF4444" />
                <circle cx="35" cy="75" r="2.5" fill="#F59E0B" />
                <circle cx="20" cy="40" r="2" fill="#22C55E" />
              </svg>

              <div className="absolute bottom-2 right-2 text-[8px] font-mono uppercase text-[#2563EB] tracking-widest bg-[#111827]/90 border border-white/5 px-2 py-0.5 rounded">
                GIS Live View
              </div>
            </div>

            {/* District alert statuses list representation */}
            <div className="space-y-2">
              {districtIntelligence.map((dist) => (
                <div key={dist.name} className="flex justify-between items-center py-1.5 border-b border-[rgba(255,255,255,0.03)] last:border-b-0 text-[11px] font-mono">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: dist.color }} />
                    <span className="text-[#F8FAFC] tracking-wider">{dist.name}</span>
                  </div>
                  <span className="text-[9px] text-[#94A3B8] font-bold uppercase">{dist.status}</span>
                </div>
              ))}
            </div>

            {/* Geographical risk levels color code legend block */}
            <div className="flex gap-4 justify-center items-center mt-4 pt-3 border-t border-[rgba(255,255,255,0.04)] text-[9px] font-mono text-[#94A3B8] select-none">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444]" />
                <span>High Risk</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                <span>Medium</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                <span>Low</span>
              </div>
            </div>
          </DashboardCard>
        </div>

        {/* SECTION 6: Recent Cases Table (replaces Simple Alerts feed) */}
        <div className="lg:col-span-5">
          <DashboardCard
            title="Recent Cases"
            subtitle="SCRB Live Case registry database"
            action={
              <SecondaryButton onClick={() => alert("Loading full operational database search interface...")}>
                View All
              </SecondaryButton>
            }
          >
            <div className="mt-2 overflow-x-auto rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0B1220] select-none">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.06)] text-[9px] font-mono uppercase tracking-widest text-[#94A3B8] bg-[#111827]/40">
                    <th className="px-4 py-3 font-bold">FIR No.</th>
                    <th className="px-3 py-3 font-bold">Crime Type</th>
                    <th className="px-3 py-3 font-bold">District</th>
                    <th className="px-3 py-3 font-bold">Severity</th>
                    <th className="px-4 py-3 font-bold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(255,255,255,0.03)] text-[11px]">
                  {recentCases.map((row) => (
                    <tr 
                      key={row.fir} 
                      className="hover:bg-[#182235]/40 transition-colors duration-150 text-[#F8FAFC]"
                    >
                      <td className="px-4 py-2.5 font-bold font-mono text-[#2563EB]">{row.fir}</td>
                      <td className="px-3 py-2.5 font-medium">{row.type}</td>
                      <td className="px-3 py-2.5 text-[#94A3B8]">{row.district}</td>
                      <td className="px-3 py-2.5">
                        <SeverityBadge severity={row.severity} />
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <CaseStatusBadge status={row.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DashboardCard>
        </div>

        {/* SECTION 7: Quick Actions with hover scales and icons */}
        <div className="lg:col-span-3">
          <DashboardCard
            title="Quick Actions"
            subtitle="Secure System Navigation Links"
          >
            <div className="flex flex-col gap-3 mt-2 select-none">
              <button
                onClick={() => navigate("/crime-database")}
                className="w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-left text-xs font-semibold text-white bg-gradient-to-r from-[#2563EB]/80 to-[#1D4ED8]/85 border border-[#2563EB]/35 hover:scale-[1.02] hover:shadow-[0_4px_16px_rgba(37,99,235,0.25)] transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Search className="h-4 w-4 text-white" />
                  <span>Search Crime / FIR</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </button>

              <button
                onClick={() => navigate("/investigation")}
                className="w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-left text-xs font-semibold text-white bg-[#111827] border border-[rgba(255,255,255,0.06)] hover:bg-[#182235] hover:scale-[1.02] transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <FolderOpen className="h-4 w-4 text-[#2563EB]" />
                  <span>Open Investigation</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </button>

              <button
                onClick={() => navigate("/ai-assistant")}
                className="w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-left text-xs font-bold text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(37,99,235,0.35)] transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Bot className="h-4 w-4 text-white animate-pulse" />
                  <span>AI Assistant</span>
                </div>
                <span className="text-[9px] text-white font-mono bg-[#0B1220]/75 border border-[#2563EB]/45 px-1 py-0.5 rounded leading-none">CORE</span>
              </button>

              <button
                onClick={() => navigate("/reports")}
                className="w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-left text-xs font-semibold text-white bg-[#111827] border border-[rgba(255,255,255,0.06)] hover:bg-[#182235] hover:scale-[1.02] transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="h-4 w-4 text-[#2563EB]" />
                  <span>Generate Report</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </button>
            </div>
          </DashboardCard>
        </div>

      </div>

    </div>
  )
}

export default DashboardPage
