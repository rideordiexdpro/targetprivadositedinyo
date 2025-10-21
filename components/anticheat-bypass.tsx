"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { Shield, CheckCircle } from "lucide-react"

export default function AnticheatBypass() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { t } = useLanguage()

  const anticheats = [
    { name: "Ocean", url: "anticheat.ac", status: "Undetected" },
    { name: "Detect", url: "detect.ac", status: "Undetected" },
    { name: "Echo", url: "echo.ac", status: "Undetected" },
    { name: "Storms", url: "storms.ac", status: "Undetected" },
    { name: "Gengar", url: "gengar.ac", status: "Undetected" },
    { name: "Napse", url: "napse.ac", status: "Undetected" },
    { name: "Manuel Kontrol", url: "SS", status: "Undetected" }
  ]

  return (
    <section className="relative py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 backdrop-blur-sm mb-6">
            <Shield className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-orange-400">{t('bypass.badge')}</span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-4">
            {t('bypass.title')}
          </h3>
          
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {t('bypass.description')}
          </p>
        </motion.div>

        {/* Anticheat Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {anticheats.map((anticheat, index) => (
            <motion.div
              key={anticheat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative"
            >
              <div className="relative p-4 rounded-xl bg-gradient-to-br from-black/40 to-black/20 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h4 className="text-lg font-bold text-white mb-1">{anticheat.name}</h4>
                    <p className="text-sm text-white/60">({anticheat.url})</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-sm font-medium text-green-400">{anticheat.status}</span>
                  </div>
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-white/50 text-sm">
            {t('bypass.footer')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
