import { useState } from 'react'
import {
  Languages,
  Sparkles,
  FileText,
  Copy,
  Check,
  ArrowRight
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
    <div className="space-y-8 animate-fade-in select-none max-w-[1600px] mx-auto pb-12 font-sans">

      {/* SECTION 1: UPLOAD / SELECT FIR & LANGUAGE TOGGLE BAR */}
      <div className="bg-[#0B1220] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.06)] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#2563EB]/15 border border-[#2563EB]/30 rounded-xl text-[#2563EB]">
              <Languages className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Multilingual AI FIR Translator & Legal Information Extractor
              </h2>
              <p className="text-[10px] text-[#94A3B8] font-mono mt-0.5">
                Automatic Language Detection • Information Extraction • English ↔ Kannada Toggle
              </p>
            </div>
          </div>

          {/* Language Toggle: English ↔ Kannada */}
          <div className="flex items-center gap-1.5 bg-[#080D1A] border border-[rgba(255,255,255,0.08)] p-1.5 rounded-xl font-mono text-xs">
            <span className="text-[10px] text-[#94A3B8] font-bold uppercase px-2">Display Language:</span>
            <button
              onClick={() => setSelectedLang('en')}
              className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all ${
                selectedLang === 'en' ? 'bg-[#2563EB] text-white shadow-sm' : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setSelectedLang('kn')}
              className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all ${
                selectedLang === 'kn' ? 'bg-[#2563EB] text-white shadow-sm' : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              ಕನ್ನಡ (Kannada)
            </button>
          </div>
        </div>

        {/* Preset FIR Selection Buttons */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono text-[#94A3B8] uppercase font-bold block">
            Select FIR Record to Translate & Extract:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SAMPLE_FIRS.map((fir) => (
              <button
                key={fir.id}
                onClick={() => setSelectedFir(fir)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                  selectedFir.id === fir.id
                    ? 'bg-[#2563EB]/15 border-[#2563EB] text-white font-bold'
                    : 'bg-[#080D1A] border-[rgba(255,255,255,0.06)] text-[#94A3B8] hover:text-white hover:border-[rgba(255,255,255,0.15)]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="h-4 w-4 text-[#2563EB]" />
                  <span>{fir.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded font-bold">
                    DETECTED: {fir.sourceLang}
                  </span>
                  <ArrowRight className={`h-3.5 w-3.5 ${selectedFir.id === fir.id ? 'text-[#2563EB]' : 'opacity-40'}`} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: TRANSLATED DASHBOARD & INFORMATION EXTRACTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Original Vernacular Input */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#0B1220] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[rgba(255,255,255,0.06)] pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Original FIR Input Document
              </h3>
              <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/15 border border-[#10B981]/30 px-2 py-0.5 rounded font-bold">
                AUTO-DETECTED: {selectedFir.sourceLang}
              </span>
            </div>

            <div className="p-4 bg-[#080D1A] border border-[rgba(255,255,255,0.04)] rounded-xl text-xs leading-relaxed text-[#F8FAFC] font-mono min-h-[140px]">
              {selectedFir.originalText}
            </div>
          </div>
        </div>

        {/* Right Column: Information Extraction in Selected Language */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#0B1220] border border-[#2563EB]/30 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4.5 w-4.5 text-[#2563EB]" />
                <h3 className="text-xs font-bold text-white tracking-wider uppercase font-mono">
                  Extracted FIR Dashboard ({selectedLang === 'en' ? 'English' : 'Kannada'})
                </h3>
              </div>

              <button
                onClick={handleCopy}
                className="bg-[#080D1A] hover:bg-[#182235] border border-[rgba(255,255,255,0.08)] text-[#94A3B8] hover:text-white px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-[#10B981]" /> : <Copy className="h-3.5 w-3.5" />}
                <span>Copy</span>
              </button>
            </div>

            {/* Translated Statement */}
            <div className="p-4 bg-[#080D1A] border border-[#2563EB]/20 rounded-xl text-xs text-[#F8FAFC] leading-relaxed font-mono min-h-[140px]">
              {selectedLang === 'en' ? selectedFir.englishTranslation : selectedFir.kannadaTranslation}
            </div>

            {/* Information Extraction Grid */}
            <div className="space-y-2 border-t border-[rgba(255,255,255,0.06)] pt-4">
              <h4 className="text-[10px] font-mono text-[#94A3B8] uppercase font-bold tracking-wider">
                Extracted Legal Parameters:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-[#080D1A] p-3 rounded-xl border border-[rgba(255,255,255,0.04)]">
                  <span className="text-[9px] text-[#94A3B8] uppercase block font-bold">IPC / Offense Section</span>
                  <span className="text-[#2563EB] font-bold block mt-0.5">{selectedFir.legalEntities.ipcSection}</span>
                </div>

                <div className="bg-[#080D1A] p-3 rounded-xl border border-[rgba(255,255,255,0.04)]">
                  <span className="text-[9px] text-[#94A3B8] uppercase block font-bold">Accused / Suspect</span>
                  <span className="text-[#EF4444] font-bold block mt-0.5">{selectedFir.legalEntities.accused}</span>
                </div>

                <div className="bg-[#080D1A] p-3 rounded-xl border border-[rgba(255,255,255,0.04)]">
                  <span className="text-[9px] text-[#94A3B8] uppercase block font-bold">Victim / Complainant</span>
                  <span className="text-[#10B981] font-bold block mt-0.5">{selectedFir.legalEntities.victim}</span>
                </div>

                <div className="bg-[#080D1A] p-3 rounded-xl border border-[rgba(255,255,255,0.04)]">
                  <span className="text-[9px] text-[#94A3B8] uppercase block font-bold">Stolen Property</span>
                  <span className="text-[#F59E0B] font-bold block mt-0.5">{selectedFir.legalEntities.stolenAssets}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
