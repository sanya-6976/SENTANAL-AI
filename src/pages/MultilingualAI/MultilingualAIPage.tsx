import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import apiClient from '../../api/client'
import {
  FileText,
  Copy,
  Check,
  CheckCircle2,
  RefreshCw,
  Sparkles
} from 'lucide-react'

export default function MultilingualAIPage() {
  const location = useLocation()
  const [inputText, setInputText] = useState(location.state?.text || '')
  const [targetLang, setTargetLang] = useState<'kn' | 'en' | 'hi'>('en')
  
  const [isTranslating, setIsTranslating] = useState(false)
  const [translationResult, setTranslationResult] = useState<{
    original: string,
    translation: string,
    legalEntities: {
      ipcSection: string,
      accused: string,
      victim: string,
      location: string,
      stolenAssets: string
    }
  } | null>(null)

  const [copied, setCopied] = useState(false)

  // Auto-translate if text was passed in via router state
  useEffect(() => {
    if (location.state?.text && !translationResult && !isTranslating) {
      handleTranslate()
    }
  }, [location.state])

  const handleTranslate = async () => {
    if (!inputText.trim()) return
    
    setIsTranslating(true)
    try {
      const languageMap = {
        'en': 'English',
        'kn': 'Kannada',
        'hi': 'Hindi'
      }
      
      const res = await apiClient.post('/ai/translate', {
        text: inputText,
        target_language: languageMap[targetLang]
      })
      setTranslationResult(res.data)
    } catch (err) {
      console.error("Translation failed", err)
      alert("Failed to translate the text.")
    } finally {
      setIsTranslating(false)
    }
  }

  const handleCopy = () => {
    if (!translationResult) return
    navigator.clipboard.writeText(translationResult.translation)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-auto max-w-[1600px] animate-fade-in select-none space-y-6 pb-12 font-sans">
      <div className="rounded-[24px] border border-[#2563EB]/20 bg-[#0B1220] p-5 lg:p-6">
        <div className="border-b border-white/10 pb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#94A3B8]">
            Step 1 • Input Case Text
          </p>
          <h3 className="mt-1 text-sm font-semibold text-white">
            Enter FIR text, witness statement, or evidence notes for AI Translation & Analysis
          </h3>
        </div>

        <div className="mt-4">
          <textarea 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or paste your legal text here..."
            className="w-full h-[150px] bg-[#08101d] border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-[#2563EB]/50 custom-scrollbar resize-none"
          />
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setTargetLang('en')}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  targetLang === 'en' ? 'bg-[#2563EB] text-white shadow-sm' : 'bg-[#08101d] border border-white/10 text-[#94A3B8] hover:text-white'
                }`}
              >
                To English
              </button>
              <button
                onClick={() => setTargetLang('kn')}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  targetLang === 'kn' ? 'bg-[#2563EB] text-white shadow-sm' : 'bg-[#08101d] border border-white/10 text-[#94A3B8] hover:text-white'
                }`}
              >
                To Kannada
              </button>
              <button
                onClick={() => setTargetLang('hi')}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  targetLang === 'hi' ? 'bg-[#2563EB] text-white shadow-sm' : 'bg-[#08101d] border border-white/10 text-[#94A3B8] hover:text-white'
                }`}
              >
                To Hindi
              </button>
            </div>
            
            <button 
              onClick={handleTranslate}
              disabled={isTranslating || !inputText.trim()}
              className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
            >
              {isTranslating ? (
                <><RefreshCw className="h-4 w-4 animate-spin" /> Analyzing...</>
              ) : (
                <><Sparkles className="h-4 w-4" /> Translate & Extract</>
              )}
            </button>
          </div>
        </div>
      </div>

      {(translationResult || isTranslating) && (
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
          
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <div className="rounded-[24px] border border-white/10 bg-[#0B1220] p-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="rounded-2xl border border-[#2563EB]/25 bg-[#2563EB]/10 p-2 text-[#2563EB]">
                  <FileText className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#94A3B8]">
                    Step 2 • Original Text
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-white">Source text preserved for legal review</h3>
                </div>
              </div>

              <div className="mt-4 h-[180px] overflow-y-auto rounded-2xl border border-white/10 bg-[#08101d] p-4 text-sm leading-7 text-[#E2E8F0] custom-scrollbar">
                {isTranslating ? <div className="animate-pulse text-[#94A3B8]">Processing text...</div> : translationResult?.original}
              </div>
            </div>

            <div className="flex h-full rounded-[24px] border border-white/10 bg-[#0B1220] p-6">
              <div className="flex h-full flex-col w-full">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#94A3B8]">
                      Step 4 • Extracted information
                    </p>
                    <h3 className="mt-1 text-sm font-semibold text-white">
                      Structured legal and incident details
                    </h3>
                  </div>
                  <div className="rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7FB0FF]">
                    Review ready
                  </div>
                </div>

                <div className="mt-5 flex flex-1 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2">
                  <div className="flex min-h-[88px] flex-col justify-center rounded-2xl border border-white/10 bg-[#08101d] p-3">
                    <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">IPC / Offense Section</span>
                    <span className="mt-1 block text-sm font-semibold text-[#2563EB]">
                      {isTranslating ? '...' : translationResult?.legalEntities?.ipcSection || 'N/A'}
                    </span>
                  </div>

                  <div className="flex min-h-[88px] flex-col justify-center rounded-2xl border border-white/10 bg-[#08101d] p-3">
                    <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">Accused / Suspect</span>
                    <span className="mt-1 block text-sm font-semibold text-[#EF4444]">
                      {isTranslating ? '...' : translationResult?.legalEntities?.accused || 'N/A'}
                    </span>
                  </div>

                  <div className="flex min-h-[88px] flex-col justify-center rounded-2xl border border-white/10 bg-[#08101d] p-3">
                    <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">Victim / Complainant</span>
                    <span className="mt-1 block text-sm font-semibold text-[#10B981]">
                      {isTranslating ? '...' : translationResult?.legalEntities?.victim || 'N/A'}
                    </span>
                  </div>

                  <div className="flex min-h-[88px] flex-col justify-center rounded-2xl border border-white/10 bg-[#08101d] p-3">
                    <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">Stolen Property / Location</span>
                    <span className="mt-1 block text-sm font-semibold text-[#F59E0B]">
                      {isTranslating ? '...' : translationResult?.legalEntities?.stolenAssets || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <div className="rounded-[24px] border border-[#2563EB]/20 bg-[#0B1220] p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#94A3B8]">
                    Step 3 • Translation
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-white">
                    Extracted translation output
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#08101d] px-3 py-2 text-xs font-semibold text-[#94A3B8] transition-all hover:text-white"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-[#10B981]" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>Copy</span>
                  </button>
                </div>
              </div>

              <div className="mt-4 h-[180px] overflow-y-auto rounded-2xl border border-[#2563EB]/20 bg-[#08101d] p-4 text-sm leading-7 text-[#F8FAFC] custom-scrollbar">
                {isTranslating ? <div className="animate-pulse text-[#94A3B8]">Translating...</div> : translationResult?.translation}
              </div>
            </div>

            <div className="rounded-[24px] border border-[#2563EB]/20 bg-[#0B1220] p-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="rounded-2xl border border-[#2563EB]/25 bg-[#2563EB]/10 p-2 text-[#2563EB]">
                  <CheckCircle2 className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#94A3B8]">
                    Step 5 • Officer review
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-white">Case notes ready for the next handoff</h3>
                </div>
              </div>

              <div className="mt-4 h-[180px] overflow-y-auto rounded-2xl border border-white/10 bg-[#08101d] p-4 text-sm leading-7 text-[#E2E8F0] custom-scrollbar">
                Review the translated incident statement, confirm the extracted legal entities, and route the document into the investigative workflow with full context preserved.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
