"use client"

import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-sm border transition-all duration-300 hover:scale-105"
      style={{
        background: theme === 'dark' 
          ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1))'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))',
        borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        boxShadow: theme === 'dark' 
          ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
          : '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        className="relative w-6 h-6"
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 0 : 180,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            opacity: theme === 'dark' ? 1 : 0,
            scale: theme === 'dark' ? 1 : 0.5,
          }}
          transition={{ duration: 0.2 }}
        >
          <Moon 
            className="w-5 h-5" 
            style={{ color: '#e6ab3b' }}
          />
        </motion.div>
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            opacity: theme === 'light' ? 1 : 0,
            scale: theme === 'light' ? 1 : 0.5,
          }}
          transition={{ duration: 0.2 }}
        >
          <Sun 
            className="w-5 h-5" 
            style={{ color: '#e6ab3b' }}
          />
        </motion.div>
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(230, 171, 59, 0.3) 0%, transparent 70%)`
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  )
}
