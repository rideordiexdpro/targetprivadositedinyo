"use client"

import { useEffect } from 'react'

export function TawkToWidget() {
  useEffect(() => {
    // Tawk.to API'yi initialize et
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.Tawk_API = window.Tawk_API || {}
      window.Tawk_LoadStart = new Date()
      
      // Cookie policy ayarları
      // @ts-ignore
      window.Tawk_API.onLoad = function() {
        console.log('Tawk.to loaded successfully')
      }
      
      // @ts-ignore
      window.Tawk_API.onStatusChange = function(status: string) {
        console.log('Tawk.to status:', status)
      }
    }

    // Tawk.to script'i yükle
    const script = document.createElement('script')
    const firstScript = document.getElementsByTagName('script')[0]
    
    script.async = true
    script.src = 'https://embed.tawk.to/68ded57128fea3194d8c3b0a/1j6j73h4q'
    script.charset = 'UTF-8'
    script.setAttribute('crossorigin', '*')
    
    // Cookie policy için
    script.setAttribute('data-cookie-consent', 'true')
    
    // Script'i ilk script'ten önce ekle
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript)
    } else {
      document.head.appendChild(script)
    }

    // Cleanup function
    return () => {
      // Script'i kaldır
      const existingScript = document.querySelector('script[src*="embed.tawk.to"]')
      if (existingScript) {
        existingScript.remove()
      }
      
      // Tawk.to widget'ını kaldır
      const tawkWidget = document.getElementById('tawk-widget')
      if (tawkWidget) {
        tawkWidget.remove()
      }
      
      // Global Tawk_API'yi temizle
      if (typeof window !== 'undefined') {
        // @ts-ignore
        delete window.Tawk_API
        // @ts-ignore
        delete window.Tawk_LoadStart
      }
    }
  }, [])

  return null // Bu component görsel bir şey render etmez
}

// Tawk.to API fonksiyonları için yardımcı hook
export function useTawkTo() {
  const showWidget = () => {
    if (typeof window !== 'undefined' && window.Tawk_API) {
      window.Tawk_API.showWidget()
    }
  }

  const hideWidget = () => {
    if (typeof window !== 'undefined' && window.Tawk_API) {
      window.Tawk_API.hideWidget()
    }
  }

  const maximize = () => {
    if (typeof window !== 'undefined' && window.Tawk_API) {
      window.Tawk_API.maximize()
    }
  }

  const minimize = () => {
    if (typeof window !== 'undefined' && window.Tawk_API) {
      window.Tawk_API.minimize()
    }
  }

  const toggle = () => {
    if (typeof window !== 'undefined' && window.Tawk_API) {
      window.Tawk_API.toggle()
    }
  }

  return {
    showWidget,
    hideWidget,
    maximize,
    minimize,
    toggle
  }
}

// Global type definitions
declare global {
  interface Window {
    Tawk_API?: {
      showWidget: () => void
      hideWidget: () => void
      maximize: () => void
      minimize: () => void
      toggle: () => void
      setAttributes: (attributes: Record<string, any>) => void
      addEvent: (event: string, callback: () => void) => void
      removeEvent: (event: string) => void
    }
    Tawk_LoadStart?: Date
  }
}
