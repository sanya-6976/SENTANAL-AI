import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ShieldCheck } from 'lucide-react'
import kspLogo from '../../assets/ksp-logo.jpg'
import './loading-screen.css'

const BOOT_DURATION = 3000
const ACCESS_DELAY = 500
const BOOT_STEPS = [
  'INITIALIZING AI CORE...',
  'CONNECTING TO CRIMINAL DATABASE...',
  'VERIFYING OFFICER CREDENTIALS...',
  'LOADING CASE INTELLIGENCE...',
  'STARTING FACIAL RECOGNITION ENGINE...',
  'ESTABLISHING SECURE NETWORK...'
] as const

function LoadingScreen() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const [isGranted, setIsGranted] = useState(false)

  // Check if already booted in this session to prevent repeating
  useEffect(() => {
    if (sessionStorage.getItem('sentinel_booted')) {
      navigate('/login', { replace: true })
    }
  }, [navigate])

  // 1. Progress tick interval
  useEffect(() => {
    if (sessionStorage.getItem('sentinel_booted')) return

    const startTime = performance.now()
    let frameId: number

    const tick = (now: number) => {
      const elapsed = now - startTime
      const currentProgress = Math.min(100, Math.round((elapsed / BOOT_DURATION) * 100))
      
      setProgress(currentProgress)

      if (currentProgress < 100) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [])

  // 2. Redirect to login page when progress reaches 100%
  useEffect(() => {
    if (progress !== 100) return
    setIsGranted(true)
    sessionStorage.setItem('sentinel_booted', 'true')
    
    const timeout = window.setTimeout(() => {
      navigate('/login', { replace: true })
    }, ACCESS_DELAY)

    return () => window.clearTimeout(timeout)
  }, [navigate, progress])

  // 3. Step calculations based on progress percentage
  const activeStep = Math.min(
    BOOT_STEPS.length - 1,
    Math.floor((progress / 100) * BOOT_STEPS.length)
  )

  const displayedSteps = useMemo(() => {
    return BOOT_STEPS.slice(0, activeStep + 1)
  }, [activeStep])

  return (
    <main 
      className={`boot-screen ${isGranted ? 'boot-screen--granted' : ''}`} 
      aria-label="Sentinel AI system startup"
    >
      {/* Background grids and visual overlays */}
      <div className="boot-screen__grid" />
      <div className="boot-screen__streak boot-screen__streak--one" />
      <div className="boot-screen__streak boot-screen__streak--two" />
      
      <div className="boot-screen__radar">
        <i />
        <b />
        <span />
      </div>
      
      <div className="boot-screen__scanlines" />
      
      {/* Floating background glowing particles */}
      <div className="boot-screen__particles">
        {Array.from({ length: 28 }, (_, index) => (
          <i 
            key={index} 
            style={{ 
              '--i': index, 
              left: `${(index * 37) % 100}%`, 
              top: `${(index * 19) % 100}%` 
            } as React.CSSProperties} 
          />
        ))}
      </div>

      {/* Floating System Status Aside Panel */}
      <aside className="boot-status">
        <div className="boot-status__heading">
          <span className="boot-status__pulse" /> AI STATUS
        </div>
        <div className="boot-status__row">
          <span>Neural Engine</span>
          <b>ONLINE</b>
        </div>
        <div className="boot-status__row">
          <span>Database</span>
          <b>CONNECTED</b>
        </div>
        <div className="boot-status__row">
          <span>Encryption</span>
          <b>ACTIVE</b>
        </div>
        <div className="boot-status__row">
          <span>Threat Scanner</span>
          <b>READY</b>
        </div>
      </aside>

      {/* Center Boot Content Wrapper */}
      <section className="boot-screen__content">
        <div className="boot-screen__seal">
          <span className="boot-screen__orbit" />
          <img src={kspLogo} alt="Karnataka State Police logo" />
        </div>
        
        <p className="boot-screen__classification">
          <ShieldCheck size={12} /> Government Intelligence Network
        </p>
        
        <h1>SENTINEL <em>AI</em></h1>
        
        <p className="boot-screen__subtitle">
          Crime Intelligence Operating System
        </p>

        {/* Boot Sequence Log output lines */}
        <div className="boot-log" aria-live="polite">
          {displayedSteps.map((step, index) => {
            const complete = index < activeStep || progress === 100
            const active = index === activeStep && !complete
            return (
              <div 
                className={`boot-log__item ${complete ? 'boot-log__item--complete' : ''}`} 
                key={step}
              >
                <span className="boot-log__marker">
                  {complete ? <Check size={13} strokeWidth={3} /> : <i />}
                </span>
                <span className="boot-log__text">
                  {step}
                  {active && <b className="boot-log__cursor" />}
                </span>
                {complete && <span className="boot-log__complete">COMPLETE</span>}
              </div>
            )
          })}
          {progress === 100 && <div className="boot-log__ready">SYSTEM READY</div>}
        </div>

        {/* Bottom Progress Bar */}
        <div className="boot-progress">
          <div className="boot-progress__labels">
            <span>BOOT SEQUENCE</span>
            <b>{progress}%</b>
          </div>
          <div className="boot-progress__track">
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className="boot-progress__ticks">
            <span>0%</span>
            <span>25%</span>
            <span>52%</span>
            <span>81%</span>
            <span>100%</span>
          </div>
        </div>
      </section>

      {/* Secure Channel footer metadata */}
      <div className="boot-screen__footer">
        <span>SECURE CHANNEL: KSP-INTEL-09</span>
        <span>ENCRYPTION: AES-256</span>
      </div>

      {/* ACCESS GRANTED flash animation */}
      {isGranted && <div className="boot-screen__access">ACCESS GRANTED</div>}
    </main>
  )
}

export default LoadingScreen
