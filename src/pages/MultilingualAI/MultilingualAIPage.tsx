import { useState } from 'react'
import {
  FileText,
  Copy,
  Check,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'

interface SampleFIR {
  id: string
  title: string
  sourceLang: string
  station: string
  originalText: string
  kannadaTranslation: string
  englishTranslation: string
  legalEntities: {
    ipcSection: string
    accused: string
    victim: string
    location: string
    stolenAssets: string
  }
}

const SAMPLE_FIRS: SampleFIR[] = [
  {
    id: 'fir-kn-01',
    title: 'HUBBALLI PS - FIR #342/2025',
    sourceLang: 'Kannada (ಕನ್ನಡ)',
    station: 'Hubballi Suburban Police Station',
    originalText: `ದಿನಾಂಕ 14/05/2025 ರಂದು ರಾತ್ರಿ 01:30 ಗಂಟೆಯ ಸುಮಾರಿಗೆ ಹುಬ್ಬಳ್ಳಿ ಹಳೆ ಬಸ್ ನಿಲ್ದಾಣದ ಹತ್ತಿರವಿರುವ ಕೇಶವಾಪುರ ಪ್ರದೇಶದ ವಸತಿ ಗೃಹವೊಂದರಲ್ಲಿ ಕನ್ನಗಳ್ಳತನ ನಡೆದಿದೆ. ಆರೋಪಿ ರವಿ ಕುಮಾರ್ ಹಿಂಬಾಗಿಲನ್ನು ಮುರಿದು ಒಳನುಗ್ಗಿ 4.5 ಲಕ್ಷ ಮೌಲ್ಯದ ಚಿನ್ನದ ಆಭರಣಗಳನ್ನು ಹಾಗೂ 80,000 ನಗದನ್ನು ಕಳವು ಮಾಡಿದ್ದಾನೆ.`,
    kannadaTranslation: `ದಿನಾಂಕ 14/05/2025 ರಂದು ರಾತ್ರಿ 01:30 ಗಂಟೆಯ ಸುಮಾರಿಗೆ ಹುಬ್ಬಳ್ಳಿ ಹಳೆ ಬಸ್ ನಿಲ್ದಾಣದ ಹತ್ತಿರವಿರುವ ಕೇಶವಾಪುರ ಪ್ರದೇಶದ ವಸತಿ ಗೃಹವೊಂದರಲ್ಲಿ ಕನ್ನಗಳ್ಳತನ ನಡೆದಿದೆ. ಆರೋಪಿ ರವಿ ಕುಮಾರ್ ಹಿಂಬಾಗಿಲನ್ನು ಮುರಿದು ಒಳನುಗ್ಗಿ 4.5 ಲಕ್ಷ ಮೌಲ್ಯದ ಚಿನ್ನದ ಆಭರಣಗಳನ್ನು ಹಾಗೂ 80,000 ನಗದನ್ನು ಕಳವು ಮಾಡಿದ್ದಾನೆ.`,
    englishTranslation: `On 14/05/2025 at approximately 01:30 AM, a housebreaking/night burglary occurred at a residential house in Keshavapur area near Hubballi Old Bus Stand. Accused Ravi Kumar broke open the rear door, entered, and stole gold ornaments valued at ₹4.5 Lakhs along with ₹80,000 cash.`,
    legalEntities: {
      ipcSection: 'IPC Section 457, 380 (Burglary)',
      accused: 'Ravi Kumar',
      victim: 'Suresh Babu',
      location: 'Keshavapur, Hubballi Urban',
      stolenAssets: 'Gold Ornaments (4.5 Lakhs), Cash (₹80,000)'
    }
  },
  {
    id: 'fir-hi-02',
    title: 'BELAGAVI RURAL - FIR #118/2025',
    sourceLang: 'Hindi (हिंदी)',
    station: 'Belagavi Border Control Unit',
    originalText: `दिनांक 10 मई 2025 को रात्रि 11:45 बजे बेलागावी राजमार्ग चेकपोस्ट पर एक संदिग्ध काले रंग की एसयूवी (KA-22-M-9081) को रोका गया। वाहन की तलाशी के दौरान अवैध हथियार और जाली भारतीय मुद्रा (₹2.5 लाख) बरामद की गई।`,
    kannadaTranslation: `ದಿನಾಂಕ 10 ಮೇ 2025 ರಂದು ರಾತ್ರಿ 11:45 ಕ್ಕೆ ಬೆಳಗಾವಿ ಹೆದ್ದಾರಿ ಚೆಕ್‌ಪೋಸ್ಟ್‌ನಲ್ಲಿ ಅನುಮಾನಾಸ್ಪದ ಕಪ್ಪು ಎಸ್‌ಯುವಿ ಕಾರನ್ನು ತಡೆಯಲಾಯಿತು. ತಪಾಸಣೆ ವೇಳೆ ಅಕ್ರಮ ಶಸ್ತ್ರಾಸ್ತ್ರ ಹಾಗೂ ₹2.5 ಲಕ್ಷ ನಕಲಿ ನೋಟು ಪತ್ತೆಯಾಗಿದೆ.`,
    englishTranslation: `On 10th May 2025 at 23:45 hours, a suspicious black SUV (KA-22-M-9081) was intercepted at the Belagavi Highway Checkpost. During vehicle search, illegal weapons and counterfeit Indian currency (₹2.5 Lakhs) were recovered.`,
    legalEntities: {
      ipcSection: 'IPC Section 489B, 489C (Counterfeit Currency)',
      accused: 'Prakash Patil',
      victim: 'State of Karnataka',
      location: 'NH-48 Checkpost, Belagavi Rural',
      stolenAssets: 'Fake Currency ₹2.5L, Unlicensed Pistol'
    }
  }
]

export default function MultilingualAIPage() {
  const [selectedFir, setSelectedFir] = useState<SampleFIR>(SAMPLE_FIRS[0])
  const [selectedLang, setSelectedLang] = useState<'kn' | 'en'>('en')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const textToCopy = selectedLang === 'en' ? selectedFir.englishTranslation : selectedFir.kannadaTranslation
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-auto max-w-[1600px] animate-fade-in select-none space-y-6 pb-12 font-sans">
      <div className="rounded-[24px] border border-[#2563EB]/20 bg-[#0B1220] p-5 lg:p-6">
        <div className="border-b border-white/10 pb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#94A3B8]">
            Step 1 • Upload FIR
          </p>
          <h3 className="mt-1 text-sm font-semibold text-white">
            Select the record to place into the translation pipeline
          </h3>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {SAMPLE_FIRS.map((fir) => (
            <button
              key={fir.id}
              onClick={() => setSelectedFir(fir)}
              className={`flex h-[72px] w-full items-center justify-between rounded-2xl border p-3.5 text-left transition-all ${
                selectedFir.id === fir.id
                  ? 'border-[#2563EB] bg-[#2563EB]/12 text-white'
                  : 'border-white/10 bg-[#08101d] text-[#94A3B8] hover:border-[#2563EB]/30 hover:text-white'
              }`}
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <FileText className="h-4 w-4 shrink-0 text-[#2563EB]" />
                <span className="truncate text-sm font-medium">{fir.title}</span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="rounded-full bg-[#10B981]/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#34D399]">
                  {fir.sourceLang}
                </span>
                <ArrowRight className={`h-3.5 w-3.5 shrink-0 ${selectedFir.id === fir.id ? 'text-[#2563EB]' : 'opacity-40'}`} />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="rounded-[24px] border border-white/10 bg-[#0B1220] p-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="rounded-2xl border border-[#2563EB]/25 bg-[#2563EB]/10 p-2 text-[#2563EB]">
                <FileText className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#94A3B8]">
                  Step 2 • Original FIR input
                </p>
                <h3 className="mt-1 text-sm font-semibold text-white">Source text preserved for legal review</h3>
              </div>
            </div>

            <div className="mt-4 h-[180px] overflow-y-auto rounded-2xl border border-white/10 bg-[#08101d] p-4 text-sm leading-7 text-[#E2E8F0] custom-scrollbar">
              {selectedFir.originalText}
            </div>
          </div>

          <div className="flex h-full rounded-[24px] border border-white/10 bg-[#0B1220] p-6">
            <div className="flex h-full flex-col">
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
                <span className="mt-1 block text-sm font-semibold text-[#2563EB]">{selectedFir.legalEntities.ipcSection}</span>
              </div>

              <div className="flex min-h-[88px] flex-col justify-center rounded-2xl border border-white/10 bg-[#08101d] p-3">
                <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">Accused / Suspect</span>
                <span className="mt-1 block text-sm font-semibold text-[#EF4444]">{selectedFir.legalEntities.accused}</span>
              </div>

              <div className="flex min-h-[88px] flex-col justify-center rounded-2xl border border-white/10 bg-[#08101d] p-3">
                <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">Victim / Complainant</span>
                <span className="mt-1 block text-sm font-semibold text-[#10B981]">{selectedFir.legalEntities.victim}</span>
              </div>

              <div className="flex min-h-[88px] flex-col justify-center rounded-2xl border border-white/10 bg-[#08101d] p-3">
                <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">Stolen Property</span>
                <span className="mt-1 block text-sm font-semibold text-[#F59E0B]">{selectedFir.legalEntities.stolenAssets}</span>
              </div>
            </div>
            </div>
          </div>
        </div>

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
                <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-[#08101d] p-1 text-xs">
                  <button
                    onClick={() => setSelectedLang('en')}
                    className={`rounded-xl px-3 py-1.5 font-semibold transition-all ${
                      selectedLang === 'en' ? 'bg-[#2563EB] text-white shadow-sm' : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setSelectedLang('kn')}
                    className={`rounded-xl px-3 py-1.5 font-semibold transition-all ${
                      selectedLang === 'kn' ? 'bg-[#2563EB] text-white shadow-sm' : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    ಕನ್ನಡ
                  </button>
                </div>

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
              {selectedLang === 'en' ? selectedFir.englishTranslation : selectedFir.kannadaTranslation}
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
    </div>
  )
}
