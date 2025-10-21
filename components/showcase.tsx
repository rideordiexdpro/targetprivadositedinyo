"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

export default function Showcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { t } = useLanguage()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMousePosition({ x, y })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm mb-6"
            style={{background: '#e6ab3b20', borderColor: '#e6ab3b50', border: '1px solid'}}
          >
            <Sparkles className="w-4 h-4" style={{color: '#e6ab3b'}} />
            <span className="text-sm font-medium" style={{color: '#e6ab3b'}}>{t('showcase.title')}</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-transparent mb-4" style={{backgroundImage: 'linear-gradient(to right, #e6ab3b, #e6ab3b)', WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
            {t('showcase.subtitle')}
          </h2>

          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-12">
            {t('showcase.description')}
          </p>
        </motion.div>

        {/* Main Showcase Image with Perspective */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-6xl mx-auto group cursor-pointer"
        >
          {/* Main Container */}
          <div 
            className="relative rounded-2xl p-4"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "1200px" }}
          >
            {/* Menu Screenshot */}
            <motion.div 
              className="relative rounded-xl overflow-hidden transition-all duration-300"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateX(${mousePosition.y * 15}deg) rotateY(${mousePosition.x * 15}deg)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <img
                src="/menu.png"
                alt="Target Menu Interface"
                className="w-full h-auto object-cover"
                draggable={false}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
