"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Shield, CheckCircle, Activity, Server, Clock, Users } from "lucide-react"
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext"

function StatusContent() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { language, setLanguage, t } = useLanguage()
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "system")
    root.classList.add("dark")
  }, [])

  const anticheats = [
    { name: "Ocean", url: "anticheat.ac", status: "Undetected", logo: "/ocean.png" },
    { name: "Detect", url: "detect.ac", status: "Undetected", logo: "/detect.png" },
    { name: "Echo", url: "echo.ac", status: "Undetected", logo: "/echo.png" },
    { name: "Storms", url: "storms.ac", status: "Undetected", logo: "/stormss.png" },
    { name: "Gengar", url: "gengar.ac", status: "Undetected", logo: "/gengar.png" },
    { name: "Napse", url: "napse.ac", status: "Undetected", logo: "/napse.png" },
    { name: "Manuel Kontrol", url: "SS", status: "Undetected", logo: "/manuel.png" }
  ]


  return (
    <div className="min-h-screen w-full relative bg-black">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.12), transparent 60%), #000000",
        }}
      />

      {/* Header */}
      <header className="sticky top-4 z-[9999] mx-auto max-w-5xl px-4 py-2">
        <div className="flex items-center justify-between rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg px-6 py-3">
          <a href="/" className="flex items-center gap-2">
            <img
              src="/target.png"
              alt="Target Logo"
              width="32"
              height="32"
              className="size-8 w-8"
            />
            <span className="font-bold text-xl bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              TARGET
            </span>
          </a>

          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-lg hover:bg-background/50"
            >
              ← Back to Home
            </a>
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-full px-4 py-2 backdrop-blur-sm hover:from-orange-500/20 hover:to-orange-600/20 transition-all duration-300"
              >
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-orange-400">
                  {language === 'en' ? '🇺🇸 English' : '🇹🇷 Türkçe'}
                </span>
                <svg className={`w-4 h-4 text-orange-400 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isLanguageDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 bg-gradient-to-br from-black/90 to-black/80 backdrop-blur-md border border-orange-500/30 rounded-xl shadow-2xl overflow-hidden z-50">
                  <button
                    onClick={() => {
                      setLanguage('en')
                      setIsLanguageDropdownOpen(false)
                    }}
                    className={`w-full px-4 py-3 text-left text-sm font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-orange-600/20 ${
                      language === 'en' ? 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 text-orange-300' : 'text-white/80 hover:text-orange-300'
                    }`}
                  >
                    🇺🇸 English
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('tr')
                      setIsLanguageDropdownOpen(false)
                    }}
                    className={`w-full px-4 py-3 text-left text-sm font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-orange-600/20 ${
                      language === 'tr' ? 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 text-orange-300' : 'text-white/80 hover:text-orange-300'
                    }`}
                  >
                    🇹🇷 Türkçe
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 backdrop-blur-sm mb-6">
              <Activity className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-400">Live Status</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-4">
              {language === 'tr' ? 'Target 2.0 Durum' : 'Target 2.0 Status'}
            </h1>
            
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              {t('status.status_description')}
            </p>
          </motion.div>


          {/* Target 2.0 Status - Minimal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="max-w-md mx-auto">
              <div className="relative p-6 rounded-xl bg-gradient-to-br from-black/40 to-black/20 border border-orange-500/20 backdrop-blur-sm text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                  <h3 className="text-xl font-bold text-white">Target 2.0</h3>
                  <Clock className="w-5 h-5 text-orange-400" />
                </div>
                <span className="text-lg font-semibold text-orange-400">{t('status.under_maintenance')}</span>
              </div>
            </div>
          </motion.div>

          {/* Anticheat Bypass Status */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Bypass Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 backdrop-blur-sm mb-6">
                <Clock className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-medium text-orange-400">{t('status.system_maintenance')}</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Anticheat Bypass Status
              </h2>
              

            </div>

            {/* Anticheat Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {anticheats.map((anticheat, index) => (
                <motion.div
                  key={anticheat.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="group relative"
                >
                  <div className="relative p-4 rounded-xl bg-gradient-to-br from-black/40 to-black/20 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/10 p-2 flex items-center justify-center">
                          <img 
                            src={anticheat.logo} 
                            alt={`${anticheat.name} Logo`}
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-lg font-bold text-white">{anticheat.name}</h3>
                          <span className="text-sm font-semibold text-green-400">{anticheat.status}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                    </div>

                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/5 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Status Footer */}
            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/30 backdrop-blur-sm">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">All bypass methods are operational and regularly updated</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default function StatusPage() {
  return (
    <LanguageProvider>
      <StatusContent />
    </LanguageProvider>
  )
}
