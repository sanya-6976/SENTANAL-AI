import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import kspLogo from '../../assets/ksp-logo.jpg'
import './loading-screen.css'

const LOADING_DURATION_MS = 2500
const READY_DELAY_MS = 400

const STATUS_MESSAGES = [
  'Connecting Secure Server...',
  'Loading Crime Database...',
  'Initializing AI Models...',
  'Building Crime Intelligence...',
  'Preparing Investigation Workspace...',
  'Launching Dashboard...',
] as const

function getStatusMessage(progress: number): string {
  if (progress >= 83) return STATUS_MESSAGES[5]
  if (progress >= 66) return STATUS_MESSAGES[4]
  if (progress >= 50) return STATUS_MESSAGES[3]
  if (progress >= 33) return STATUS_MESSAGES[2]
  if (progress >= 16) return STATUS_MESSAGES[1]
  return STATUS_MESSAGES[0]
}

function LoadingScreen() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const startTime = performance.now()
    let animationFrameId = 0

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const nextProgress = Math.min(100, Math.round((elapsed / LOADING_DURATION_MS) * 100))

      setProgress(nextProgress)

      if (nextProgress < 100) {
        animationFrameId = requestAnimationFrame(updateProgress)
      }
    }

    animationFrameId = requestAnimationFrame(updateProgress)

    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  useEffect(() => {
    if (progress < 100) return

    const timeoutId = window.setTimeout(() => {
      navigate('/login', { replace: true })
    }, READY_DELAY_MS)

    return () => window.clearTimeout(timeoutId)
  }, [progress, navigate])

  return (
    <div className="loading-screen select-none">
      {/* Background Grid Pattern Overlay */}
      <div className="loading-screen__overlay" aria-hidden="true" />

      {/* Connected Network Nodes Background (subtle intelligence-gathering visualization) */}
      <svg className="loading-screen__networks" viewBox="0 0 800 600" preserveAspectRatio="none" aria-hidden="true">
        {/* Nodes */}
        <circle cx="160" cy="180" r="3" className="network-node fill-[#2563EB]" />
        <circle cx="280" cy="120" r="3" className="network-node fill-[#2563EB]" />
        <circle cx="620" cy="150" r="3" className="network-node fill-[#2563EB]" />
        <circle cx="680" cy="380" r="3" className="network-node fill-[#2563EB]" />
        <circle cx="490" cy="420" r="3" className="network-node fill-[#2563EB]" />
        <circle cx="180" cy="460" r="3" className="network-node fill-[#2563EB]" />
        <circle cx="340" cy="480" r="3" className="network-node fill-[#2563EB]" />
        
        {/* Connected Edges */}
        <line x1="160" y1="180" x2="280" y2="120" className="network-edge stroke-[#2563EB]" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="280" y1="120" x2="620" y2="150" className="network-edge stroke-[#2563EB]" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="620" y1="150" x2="680" y2="380" className="network-edge stroke-[#2563EB]" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="680" y1="380" x2="490" y2="420" className="network-edge stroke-[#2563EB]" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="490" y1="420" x2="340" y2="480" className="network-edge stroke-[#2563EB]" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="340" y1="480" x2="180" y2="460" className="network-edge stroke-[#2563EB]" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="180" y1="460" x2="160" y2="180" className="network-edge stroke-[#2563EB]" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="280" y1="120" x2="490" y2="420" className="network-edge stroke-[#2563EB]" strokeWidth="0.8" strokeDasharray="3 3" />
      </svg>

      {/* Main Centered Box */}
      <div className="loading-screen__inner">
        {/* Karnataka Police Shield Logo */}
        <img
          src={kspLogo}
          alt="Karnataka State Police Logo"
          className="loading-screen__logo"
        />

        {/* Operating System branding titles */}
        <h1 className="loading-screen__title">Sentinel AI</h1>
        <p className="loading-screen__subtitle">Crime Intelligence Operating System</p>

        {/* Premium Horizontal Progress track */}
        <div className="loading-screen__progress-container">
          <div
            className="loading-screen__progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Operating System loader status log */}
        <p className="loading-screen__message">
          {getStatusMessage(progress)}
        </p>
      </div>
    </div>
  )
}

export default LoadingScreen
