"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export function StickyFooter() {
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const windowHeight = window.innerHeight
          const documentHeight = document.documentElement.scrollHeight
          const isNearBottom = scrollTop + windowHeight >= documentHeight - 100

          setIsAtBottom(isNearBottom)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial state
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isAtBottom && (
        <motion.div
          className="fixed z-50 bottom-0 left-0 w-full h-32 flex justify-center items-center bg-black/80 backdrop-blur-sm border-t border-white/10"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="w-full max-w-6xl flex justify-between items-center px-8">
            {/* Left side - Logo and name */}
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.img 
                src="/target.png" 
                alt="Target Logo" 
                className="w-8 h-8 cursor-grab active:cursor-grabbing relative z-[60]"
                drag
                dragConstraints={{
                  left: -800,
                  right: 800,
                  top: -400,
                  bottom: 200
                }}
                dragElastic={0.3}
                whileDrag={{ 
                  scale: 1.2, 
                  rotate: 10,
                  zIndex: 70
                }}
                dragTransition={{ 
                  bounceStiffness: 100, 
                  bounceDamping: 15
                }}
                dragMomentum={false}
                dragSnapToOrigin={true}
                onDragStart={() => {
                  console.log("Logo sürüklenmeye başladı")
                }}
                onDragEnd={(event, info) => {
                  console.log("Logo bırakıldı", info.point)
                }}
                style={{
                  position: 'relative'
                }}
              />
              <h3 className="text-xl font-bold text-white">TARGET 2.0</h3>
            </motion.div>

            {/* Center - Simple navigation */}
            <motion.div
              className="flex space-x-8 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a href="/" className="text-white/70 cursor-pointer transition-colors" style={{'--hover-color': '#e6ab3b'} as React.CSSProperties} onMouseEnter={(e) => e.currentTarget.style.color = '#e6ab3b'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>
                Ana Sayfa
              </a>
              <a href="#features" className="text-white/70 cursor-pointer transition-colors" style={{'--hover-color': '#e6ab3b'} as React.CSSProperties} onMouseEnter={(e) => e.currentTarget.style.color = '#e6ab3b'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>
                Özellikler
              </a>
              <a href="#pricing" className="text-white/70 cursor-pointer transition-colors" style={{'--hover-color': '#e6ab3b'} as React.CSSProperties} onMouseEnter={(e) => e.currentTarget.style.color = '#e6ab3b'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>
                Fiyatlandırma
              </a>
              <a href="https://discord.gg/target" target="_blank" rel="noopener noreferrer" className="text-white/70 cursor-pointer transition-colors" style={{'--hover-color': '#e6ab3b'} as React.CSSProperties} onMouseEnter={(e) => e.currentTarget.style.color = '#e6ab3b'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>
                Discord
              </a>
            </motion.div>

            {/* Right side - Copyright */}
            <motion.div
              className="text-right"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-white/40 text-xs">© 2025 Target 2.0</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
