import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import GlobalContextMenu from '../components/common/GlobalContextMenu'
function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    const saved = sessionStorage.getItem('sidebar_collapsed')
    return saved !== null ? saved === 'true' : false
  })

  useEffect(() => {
    sessionStorage.setItem('sidebar_collapsed', String(collapsed))
  }, [collapsed])

  // Block body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileOpen])

  const handleToggleCollapse = () => {
    if (window.innerWidth < 1200) {
      setMobileOpen((prev) => !prev)
    } else {
      setCollapsed((prev) => !prev)
    }
  }

  return (
    <div className="min-h-screen flex bg-[#090B10] text-[#E2E8F0] relative">
      
      {/* 1. Left Sidebar Navigation */}
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={handleToggleCollapse}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* 2. Mobile Drawer Backdrop Overlay click shield */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 xl:hidden backdrop-blur-sm transition-opacity duration-300"
        />
      )}

      {/* 3. Main Content Area Panel */}
      <div className="flex flex-1 flex-col overflow-x-hidden min-h-screen">
        <Navbar onToggleSidebar={handleToggleCollapse} />
        <main className="flex-1 p-6 overflow-y-auto relative">
          <Outlet />
        </main>
      </div>

      {/* Global Right-Click Context Menu */}
      <GlobalContextMenu />

    </div>
  )
}

export default DashboardLayout
