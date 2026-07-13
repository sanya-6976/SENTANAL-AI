import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Check } from 'lucide-react'
import kspLogo from '../../assets/ksp-logo.jpg'
import policeSuv from '../../assets/police_suv.png'

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please provide officer credentials to log in.')
      return
    }
    setError('')
    setIsLoading(true)

    // Simulate link authentication
    setTimeout(() => {
      setIsLoading(false)
      navigate('/dashboard')
    }, 850)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#090B10] text-[#F8FAFC] overflow-hidden select-none">
      
      {/* 1. LEFT PANEL (45% split) */}
      <div className="relative hidden md:flex md:w-[45%] flex-col justify-between overflow-hidden pt-8 pb-12 px-12 border-r border-[rgba(255,255,255,0.08)] bg-[#090B10]">
        
        {/* Full-panel background image of police SUVs */}
        <div className="absolute inset-0 z-0">
          <img
            src={policeSuv}
            alt="Police Patrol Vehicle Background"
            className="w-full h-full object-cover object-[center_80%]"
          />
          {/* Dark overlay covers the image (brighter opacity for more visibility) */}
          <div className="absolute inset-0 bg-black/42" />
          {/* Bottom gradient fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090B10] via-transparent to-black/20" />
        </div>

        {/* Content Centered Over the Background (shifted upwards into sky area) */}
        <div className="relative z-10 flex flex-col items-center text-center mt-3 px-4">
          {/* Karnataka State Police Logo */}
          <img
            src={kspLogo}
            alt="Karnataka State Police Logo"
            className="h-20 w-auto rounded-full object-contain mb-6 border border-white/10 p-0.5 bg-[#11161F] shadow-lg"
          />
          
          <h2 className="text-3xl font-extrabold tracking-[0.25em] text-[#F8FAFC]">SENTINEL AI</h2>
          <p className="text-xs uppercase tracking-[0.2em] text-[#2563EB] font-bold mt-2 font-mono">
            Crime Intelligence Operating System
          </p>
          
          <div className="w-12 h-[2px] bg-[#2563EB] my-8" />
          
          <p className="text-sm md:text-base text-[#E2E8F0] font-medium leading-relaxed max-w-sm">
            Empowering Karnataka Police with AI-powered intelligence, analytics and investigation tools.
          </p>
        </div>
        
        {/* Generous empty space in the middle, letting the police car background show organically */}
        <div className="flex-1" />
      </div>

      {/* 2. RIGHT PANEL (55% split) */}
      <div className="flex-1 flex flex-col justify-between p-8 sm:p-12 relative bg-[#090B10]">
        
        {/* Background Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.008)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none opacity-40 z-0" />

        {/* Mobile Logo Block (Hidden on Desktop) */}
        <div className="md:hidden flex flex-col items-center text-center mb-8 relative z-10">
          <img
            src={kspLogo}
            alt="Karnataka State Police Logo"
            className="h-14 w-auto rounded-full object-contain mb-3 border border-white/10"
          />
          <h2 className="text-xl font-bold tracking-[0.2em] text-[#F8FAFC]">SENTINEL AI</h2>
          <p className="text-[10px] uppercase tracking-wider text-[#94A3B8] font-mono mt-0.5">
            Crime Intelligence Operating System
          </p>
        </div>

        {/* Vertically Centered Login Form Card */}
        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="w-full max-w-[420px] bg-[#11161F] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-8 shadow-2xl">
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold tracking-tight text-[#F8FAFC]">Welcome Back, Officer</h3>
              <p className="text-xs text-[#94A3B8] mt-1.5 font-mono uppercase tracking-wider">
                Sign in to continue securely.
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3.5 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-lg text-xs font-mono text-[#EF4444]">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email Address */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] mb-1.5">
                  Email Address / Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]/60">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#090B10] border border-[rgba(255,255,255,0.08)] rounded-lg pl-10 pr-4 py-3 text-sm text-[#F8FAFC] placeholder-slate-600 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                    placeholder="officer.email@ksp.gov.in"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]/60">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#090B10] border border-[rgba(255,255,255,0.08)] rounded-lg pl-10 pr-10 py-3 text-sm text-[#F8FAFC] placeholder-slate-600 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                    placeholder="••••••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#94A3B8]/60 hover:text-[#F8FAFC] focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Checkboxes items */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${
                      rememberMe ? 'bg-[#2563EB] border-[#2563EB]' : 'border-[rgba(255,255,255,0.08)] bg-[#090B10]'
                    }`}>
                      {rememberMe && <Check className="h-3 w-3 text-white stroke-[3.5]" />}
                    </div>
                  </div>
                  <span className="text-[#94A3B8] font-mono text-[11px]">Remember Me</span>
                </label>
                
                <a
                  href="#forgot-password"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Contact the district SCRB Administrator IT coordinator to reset local passwords.");
                  }}
                  className="text-[#94A3B8] hover:text-[#F8FAFC] font-mono text-[11px] transition-colors"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Submit Action button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-[#F8FAFC] font-bold text-xs tracking-[0.16em] uppercase py-3.5 rounded-lg transition-colors cursor-pointer duration-200 mt-2"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Validating Connection...
                  </span>
                ) : (
                  'ACCESS SENTINEL AI'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Security Warning notice */}
        <div className="flex flex-col items-center gap-2 mt-8 relative z-10">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] bg-[#11161F]/80 border border-[rgba(255,255,255,0.06)] px-4 py-2.5 rounded-lg shadow-sm">
            <ShieldCheck className="h-4 w-4 text-[#2563EB]" />
            <span>Secure • Trusted • Confidential</span>
          </div>
          
          <div className="text-[10px] text-[#EF4444]/80 font-mono tracking-wider uppercase mt-1">
            ⚠️ Restricted Government Access - Authorized Personnel Only
          </div>
          
          <span className="text-[9px] text-[#94A3B8]/30 font-mono tracking-widest uppercase mt-4">
            Karnataka State Police © 2026. All Rights Reserved.
          </span>
        </div>

      </div>

    </div>
  )
}

export default LoginPage
