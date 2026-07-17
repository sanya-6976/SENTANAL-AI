import { Search } from 'lucide-react'

interface GlobalSearchProps {
  value: string
  onChange: (query: string) => void
  placeholder?: string
}

export function GlobalSearch({ value, onChange, placeholder }: GlobalSearchProps) {
  return (
    <div className="relative w-full select-none">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#94A3B8]">
        <Search className="h-5 w-5" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Global Search (FIR, Accused, Vehicle, Phone, Location...)'}
        className="w-full pl-12 pr-4 py-3 bg-[#0B1220] border border-[rgba(255,255,255,0.06)] rounded-xl text-sm font-semibold text-white placeholder-[#94A3B8]/40 outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all duration-150"
      />
    </div>
  )
}
export default GlobalSearch
