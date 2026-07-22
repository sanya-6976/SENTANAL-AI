import { HelpCircle, Phone, MessageSquare, LifeBuoy, Wrench } from 'lucide-react'
import kspLogo from '../../assets/ksp-logo.jpg'

export default function DashboardFooter() {
  const helpDeskItems = [
    { label: 'Help & Support', icon: LifeBuoy, href: 'mailto:aryansnair546@gmail.com' },
    { label: 'Feedback', icon: MessageSquare, href: 'https://github.com/sanya-6976' },
    { label: 'Contact Technical Team', icon: Wrench, href: 'mailto:aryansnair546@gmail.com' },
  ]

  const emergencyContacts = [
    { icon: '🚔', name: 'Police Emergency', number: '112' },
    { icon: '👩', name: "Women's Helpline", number: '1091' },
    { icon: '💻', name: 'Cyber Crime Helpline', number: '1930' },
  ]

  return (
    <footer id="dashboard-footer" className="mt-10 border-t border-[rgba(255,255,255,0.08)] pt-6 pb-4 select-none font-sans text-xs">
      
      {/* 3-COLUMN COMPACT ENTERPRISE LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        
        {/* Column 1 – Karnataka State Police */}
        <div className="flex items-center gap-3.5">
          <div className="h-9 w-9 rounded-lg overflow-hidden border border-[#2563EB]/40 shrink-0">
            <img src={kspLogo} alt="Karnataka State Police Logo" className="h-full w-full object-cover filter brightness-95" />
          </div>
          <div className="flex flex-col">
            <h4 className="text-xs font-extrabold text-[#F8FAFC] tracking-wide uppercase leading-none">
              Karnataka State Police
            </h4>
            <span className="text-[10px] font-bold text-[#2563EB] tracking-wider uppercase mt-1.5 leading-none">
              Sentinel AI
            </span>
            <span className="text-[9px] font-mono text-[#94A3B8]/70 mt-1.5 leading-none truncate">
              AI Crime Intelligence Operating System
            </span>
          </div>
        </div>

        {/* Column 2 – Help Desk */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-3.5 w-3.5 text-[#2563EB]" />
            <h5 className="text-[11px] font-bold text-[#F8FAFC] tracking-wider uppercase">HELP DESK</h5>
          </div>
          <ul className="space-y-1.5">
            {helpDeskItems.map((item) => {
              const IconComp = item.icon
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#94A3B8] hover:text-[#F8FAFC] hover:translate-x-0.5 transition-all duration-150 cursor-pointer flex items-center gap-2 group"
                  >
                    <IconComp className="h-3 w-3 text-[#2563EB]/70 group-hover:text-[#2563EB] transition-colors" />
                    <span>{item.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Column 3 – Emergency Contacts */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-[#EF4444]" />
            <h5 className="text-[11px] font-bold text-[#F8FAFC] tracking-wider uppercase">EMERGENCY</h5>
          </div>
          <ul className="space-y-1.5 font-mono text-[11px]">
            {emergencyContacts.map((contact) => (
              <li key={contact.name} className="flex items-center justify-between text-[#94A3B8]">
                <span className="flex items-center gap-1.5">
                  <span>{contact.icon}</span>
                  <span>{contact.name}</span>
                </span>
                <span className="font-bold text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/25 px-2 py-0.5 rounded text-[10px]">
                  {contact.number}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* BOTTOM THIN STRIP */}
      <div className="border-t border-[rgba(255,255,255,0.04)] pt-3 mt-4 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-[#94A3B8]/60">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[#F8FAFC]/80 font-bold">© 2026 Karnataka State Police</span>
          <span>•</span>
          <span className="text-[#2563EB] font-bold">Sentinel AI Prototype</span>
          <span>•</span>
          <span>Government of Karnataka</span>
        </div>

        <div className="flex items-center gap-2">
          <span>Version 1.0</span>
          <span>•</span>
          <span className="text-[#F59E0B] font-bold">Internal Use Only</span>
        </div>
      </div>

    </footer>
  )
}
