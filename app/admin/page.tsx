"use client"

import { useEffect } from "react"

export default function AdminPage() {
  useEffect(() => {
    // Open Rick Roll in new tab/window immediately when page loads
    const openRickRoll = () => {
      // Try multiple methods to ensure it opens
      try {
        // Method 1: Standard window.open
        const newWindow = window.open(
          'https://www.youtube.com/watch?v=dQw4w9WgXcQ&autoplay=1',
          '_blank',
          'noopener,noreferrer'
        )
        
        // Method 2: If popup blocked, redirect current page
        if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
          window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&autoplay=1'
        } else {
          newWindow.focus()
        }
      } catch (error) {
        // Fallback: redirect current page
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&autoplay=1'
      }
    }

    // Small delay then open
    const timer = setTimeout(openRickRoll, 100)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center text-white/60">
        <div className="text-6xl mb-4">🔒</div>
        <h1 className="text-2xl mb-2">Admin Panel</h1>
        <p className="text-sm">Access Denied</p>
      </div>
    </div>
  )
}
