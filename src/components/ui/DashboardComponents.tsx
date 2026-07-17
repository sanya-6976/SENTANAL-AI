import React, { useEffect, useState } from 'react'

export function PageHeader({ title, subtitle, role = 'SCRB Analyst' }: { title: string; subtitle: string; role?: string }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).toUpperCase()
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-[rgba(255,255,255,0.08)] pb-5 mb-6 gap-4 select-none">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#F8FAFC]">{title}</h1>
        <p className="text-xs uppercase tracking-widest text-[#94A3B8] font-mono mt-1">{subtitle}</p>
        <p className="text-xs text-[#94A3B8]/80 mt-2 font-normal">Welcome back, DCP Anjan.</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right font-mono">
          <div className="text-[#F8FAFC] text-xs font-bold tracking-wider">{formatDate(time)}</div>
          <div className="text-[#2563EB] text-[10px] font-bold tracking-widest mt-1 uppercase">{formatTime(time)}</div>
        </div>

        <div className="h-8 w-[1px] bg-[rgba(255,255,255,0.08)] hidden sm:block" />

        <div className="flex items-center gap-2 bg-[#121826] border border-[#2563EB]/40 px-3.5 py-1.5 rounded-lg shadow-sm">
          <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#F8FAFC] uppercase">{role}</span>
        </div>
      </div>
    </div>
  )
}

export function DashboardCard({
  title,
  subtitle,
  children,
  className = '',
  action,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  action?: React.ReactNode
}) {
  return (
    <div className={`bg-[#121826] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-6 shadow-md transition-all duration-300 hover:border-[rgba(37,99,235,0.15)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)] ${className}`}>
      <div className="flex justify-between items-start mb-5 border-b border-[rgba(255,255,255,0.04)] pb-3">
        <div>
          <h3 className="text-xs font-bold tracking-wider uppercase text-[#F8FAFC]">{title}</h3>
          {subtitle && <p className="text-[9px] font-mono uppercase tracking-widest text-[#94A3B8] mt-1">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}

interface KPICardProps {
  title: string
  value: string | number
  trend?: string
  trendLabel?: string
  trendBadge?: string
  trendType?: 'up' | 'down' | 'neutral'
  icon: React.ComponentType<{ className?: string }>
  color: 'blue' | 'orange' | 'green' | 'purple' | 'yellow' | 'red'
  onClickTrend?: () => void
}

const colorPresets = {
  blue: {
    bgIcon: 'bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20',
    gradient: 'from-[#111827] to-[#121c30]',
    borderHover: 'hover:border-[#2563EB]/25',
    trendColor: 'text-[#2563EB]',
  },
  orange: {
    bgIcon: 'bg-[#F97316]/10 text-[#F97316] border-[#F97316]/20',
    gradient: 'from-[#111827] to-[#1e1511]',
    borderHover: 'hover:border-[#F97316]/25',
    trendColor: 'text-[#F97316]',
  },
  green: {
    bgIcon: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
    gradient: 'from-[#111827] to-[#111e18]',
    borderHover: 'hover:border-[#10B981]/25',
    trendColor: 'text-[#10B981]',
  },
  purple: {
    bgIcon: 'bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20',
    gradient: 'from-[#111827] to-[#181325]',
    borderHover: 'hover:border-[#8B5CF6]/25',
    trendColor: 'text-[#8B5CF6]',
  },
  yellow: {
    bgIcon: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
    gradient: 'from-[#111827] to-[#1c1a11]',
    borderHover: 'hover:border-[#F59E0B]/25',
    trendColor: 'text-[#F59E0B]',
  },
  red: {
    bgIcon: 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20',
    gradient: 'from-[#111827] to-[#201216]',
    borderHover: 'hover:border-[#EF4444]/25',
    trendColor: 'text-[#EF4444]',
  },
}

export function KPICard({
  title,
  value,
  trend,
  trendLabel,
  trendBadge,
  trendType = 'up',
  icon: Icon,
  color,
  onClickTrend,
}: KPICardProps) {
  const preset = colorPresets[color]

  return (
    <div className={`bg-gradient-to-br ${preset.gradient} border border-[rgba(255,255,255,0.06)] rounded-xl p-5 shadow-md transition-all duration-200 hover:scale-[1.02] ${preset.borderHover} hover:shadow-[0_8px_32px_rgba(0,0,0,0.55)] flex flex-col justify-between select-none relative overflow-hidden group`}>
      {/* Top Header Row */}
      <div className="flex justify-between items-center mb-4">
        {/* 40x40 circular icon */}
        <div className={`h-10 w-10 rounded-full flex items-center justify-center border ${preset.bgIcon} transition-transform duration-300 group-hover:scale-105`}>
          <Icon className="h-4.5 w-4.5" />
        </div>

        {/* Small trend badge */}
        {trendBadge && (
          <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold tracking-wider border ${
            trendType === 'up' ? 'bg-[#22C55E]/10 border-[#22C55E]/20 text-[#22C55E]' :
            trendType === 'down' ? 'bg-[#EF4444]/10 border-[#EF4444]/20 text-[#EF4444]' :
            'bg-gray-500/10 border-gray-500/20 text-gray-400'
          }`}>
            {trendBadge}
          </span>
        )}
      </div>

      {/* Numerical Data Field */}
      <div>
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] font-bold">
          {title}
        </span>
        <h4 className="text-[31px] font-bold text-[#F8FAFC] tracking-tight mt-1 leading-none">
          {value}
        </h4>
        
        {/* Comparison trend text */}
        {(trend || trendLabel) && (
          <div className="flex items-center gap-1.5 mt-3 text-[10px]">
            {trend && onClickTrend ? (
              <button
                onClick={onClickTrend}
                className={`font-semibold cursor-pointer underline hover:text-white transition-colors duration-150 ${preset.trendColor}`}
              >
                {trend}
              </button>
            ) : trend ? (
              <span className={`font-semibold ${
                trendType === 'up' ? 'text-[#22C55E]' :
                trendType === 'down' ? 'text-[#EF4444]' :
                preset.trendColor
              }`}>
                {trend}
              </span>
            ) : null}
            
            {trendLabel && (
              <span className="text-[#94A3B8]/60 font-medium">
                {trendLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function StatusBadge({ status }: { status: 'High' | 'Medium' | 'Low' | 'Solved' | 'Active' }) {
  const styles = {
    High: 'bg-[#EF4444]/10 border-[#EF4444]/30 text-[#EF4444]',
    Medium: 'bg-[#F59E0B]/10 border-[#F59E0B]/30 text-[#F59E0B]',
    Low: 'bg-[#22C55E]/10 border-[#22C55E]/30 text-[#22C55E]',
    Solved: 'bg-[#22C55E]/15 border-[#22C55E]/40 text-[#22C55E]',
    Active: 'bg-[#2563EB]/15 border-[#2563EB]/40 text-[#2563EB]',
  }
  
  return (
    <span className={`px-2.5 py-0.5 rounded border text-[8px] font-mono font-bold tracking-widest uppercase ${styles[status]}`}>
      {status}
    </span>
  )
}

export function AlertCard({
  icon: Icon,
  type,
  district,
  time,
  priority,
}: {
  icon: React.ComponentType<{ className?: string }>
  type: string
  district: string
  time: string
  priority: 'High' | 'Medium' | 'Low'
}) {
  return (
    <div className="flex items-center justify-between p-3.5 bg-[#090B10] border border-[rgba(255,255,255,0.04)] rounded-xl transition-all duration-200 hover:border-[rgba(255,255,255,0.08)]">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg border text-white ${
          priority === 'High' ? 'bg-[#EF4444]/15 border-[#EF4444]/35 text-[#EF4444]' :
          priority === 'Medium' ? 'bg-[#F59E0B]/15 border-[#F59E0B]/35 text-[#F59E0B]' :
          'bg-[#22C55E]/15 border-[#22C55E]/35 text-[#22C55E]'
        }`}>
          <Icon className="h-4.5 w-4.5" />
        </div>
        <div>
          <h5 className="text-[11px] font-bold text-[#F8FAFC] tracking-wide">{type}</h5>
          <p className="text-[9px] text-[#94A3B8] font-mono mt-0.5 uppercase tracking-wider">
            {district} • {time}
          </p>
        </div>
      </div>
      <div>
        <StatusBadge status={priority} />
      </div>
    </div>
  )
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function PrimaryButton({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`bg-[#2563EB] hover:bg-[#1D4ED8] text-[#F8FAFC] font-semibold text-[10px] tracking-widest uppercase px-4 py-2.5 rounded-lg transition-colors cursor-pointer duration-200 outline-none focus:ring-1 focus:ring-[#2563EB] ${className}`}
    >
      {children}
    </button>
  )
}

export function SecondaryButton({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`bg-[#090B10] hover:bg-[#11161F] text-[#94A3B8] hover:text-[#F8FAFC] border border-[rgba(255,255,255,0.08)] font-semibold text-[10px] tracking-widest uppercase px-4 py-2.5 rounded-lg transition-colors cursor-pointer duration-200 outline-none ${className}`}
    >
      {children}
    </button>
  )
}
