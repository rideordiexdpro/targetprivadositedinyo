"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Hero from "@/components/home/hero"
import VideoShowcase from "@/components/video-showcase"
import { NewReleasePromo } from "@/components/new-release-promo"
import { FAQSection } from "@/components/faq-section"
import { PricingSection } from "@/components/pricing-section"
import { StickyFooter } from "@/components/sticky-footer"
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext"
import { ParticleBackground } from "@/components/particle-background"
import { TawkToWidget } from "@/components/tawk-to-widget"
import { HeaderMusicPlayer } from "@/components/header-music-player"

function HomeContent() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [isMobileLanguageDropdownOpen, setIsMobileLanguageDropdownOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  // Theme context handles this now, remove manual theme setting

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMobileNavClick = (elementId: string) => {
    setIsMobileMenuOpen(false)
    setTimeout(() => {
      const element = document.getElementById(elementId)
      if (element) {
        const headerOffset = 120 // Account for sticky header height + margin
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }, 100)
  }

  return (
    <div className="min-h-screen w-full relative bg-background transition-colors duration-300">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Dynamic Background with Top Glow */}
      <div
        className="absolute inset-0 z-0 transition-all duration-300"
        style={{
          background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(230, 171, 59, 0.08), transparent 60%)",
        }}
      />

      {/* Desktop Header */}
      <header
        className={`sticky top-4 z-[9999] mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full bg-background/80 md:flex backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-300 ${
          isScrolled ? "max-w-3xl px-2" : "max-w-5xl px-4"
        } py-2`}
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          perspective: "1000px",
        }}
      >
        <div
          className={`z-50 flex items-center justify-center gap-2 transition-all duration-300 ${
            isScrolled ? "ml-4" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <motion.img
              src="/target.png"
              alt="Target Logo"
              width="32"
              height="32"
              className="size-8 w-8 cursor-grab active:cursor-grabbing relative z-[10000]"
              drag
              dragConstraints={{
                left: -400,
                right: 400,
                top: -200,
                bottom: 200
              }}
              dragElastic={0.3}
              whileDrag={{ 
                scale: 1.2, 
                rotate: 10,
                zIndex: 10001
              }}
              dragTransition={{ 
                bounceStiffness: 100, 
                bounceDamping: 15
              }}
              dragMomentum={false}
              dragSnapToOrigin={true}
              onDragStart={() => {
                console.log("Desktop header logo sürüklenmeye başladı")
              }}
              onDragEnd={(event, info) => {
                console.log("Desktop header logo bırakıldı", info.point)
              }}
            />
            <a href="/" className="font-bold text-xl bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              TARGET
            </a>
          </div>
        </div>

        <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-muted-foreground transition duration-200 hover:text-foreground md:flex md:space-x-2">
          <a
            href="/status"
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="relative z-20">{language === 'tr' ? 'Durum' : 'Status'}</span>
          </a>
          <a
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById("pricing")
              if (element) {
                const headerOffset = 120 // Account for sticky header height + margin
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                const offsetPosition = elementPosition - headerOffset

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                })
              }
            }}
          >
            <span className="relative z-20">{t('nav.pricing')}</span>
          </a>
          <a
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById("faq")
              if (element) {
                const headerOffset = 120 // Account for sticky header height + margin
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                const offsetPosition = elementPosition - headerOffset

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                })
              }
            }}
          >
            <span className="relative z-20">{t('nav.faq')}</span>
          </a>
        </div>

        <div className="flex items-center gap-4">
          <HeaderMusicPlayer />
          <div className="relative">
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

      {/* Mobile Header */}
      <header className="sticky top-4 z-[9999] mx-4 flex w-auto flex-row items-center justify-between rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg md:hidden px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <motion.img
              src="/target.png"
              alt="Target Logo"
              width="28"
              height="28"
              className="size-7 w-7 cursor-grab active:cursor-grabbing relative z-[10000]"
              drag
              dragConstraints={{
                left: -300,
                right: 300,
                top: -150,
                bottom: 150
              }}
              dragElastic={0.3}
              whileDrag={{ 
                scale: 1.2, 
                rotate: 10,
                zIndex: 10001
              }}
              dragTransition={{ 
                bounceStiffness: 100, 
                bounceDamping: 15
              }}
              dragMomentum={false}
              dragSnapToOrigin={true}
              onDragStart={() => {
                console.log("Mobile header logo sürüklenmeye başladı")
              }}
              onDragEnd={(event, info) => {
                console.log("Mobile header logo bırakıldı", info.point)
              }}
            />
            <a href="/" className="font-bold text-lg bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              TARGET
            </a>
          </div>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-background/50 border border-border/50 transition-colors hover:bg-background/80"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col items-center justify-center w-5 h-5 space-y-1">
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            ></span>
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            ></span>
          </div>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden">
          <div className="absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl p-6">
            <nav className="flex flex-col space-y-4">
              <a
                href="/status"
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                {language === 'tr' ? 'Durum' : 'Status'}
              </a>
              <button
                onClick={() => handleMobileNavClick("pricing")}
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                {t('nav.pricing')}
              </button>
              <button
                onClick={() => handleMobileNavClick("faq")}
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                {t('nav.faq')}
              </button>
              <div className="border-t border-border/50 pt-4 mt-4 flex flex-col space-y-3">
                <div className="px-4 py-3">
                  <div className="relative">
                    <button
                      onClick={() => setIsMobileLanguageDropdownOpen(!isMobileLanguageDropdownOpen)}
                      className="w-full flex items-center gap-3 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-xl px-4 py-3 backdrop-blur-sm hover:from-orange-500/20 hover:to-orange-600/20 transition-all duration-300"
                    >
                      <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                      <span className="flex-1 text-left text-lg font-medium text-orange-400">
                        {language === 'en' ? '🇺🇸 English' : '🇹🇷 Türkçe'}
                      </span>
                      <svg className={`w-5 h-5 text-orange-400 transition-transform duration-200 ${isMobileLanguageDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {isMobileLanguageDropdownOpen && (
                      <div className="absolute top-full mt-2 left-0 right-0 bg-gradient-to-br from-black/90 to-black/80 backdrop-blur-md border border-orange-500/30 rounded-xl shadow-2xl overflow-hidden z-50">
                        <button
                          onClick={() => {
                            setLanguage('en')
                            setIsMobileLanguageDropdownOpen(false)
                          }}
                          className={`w-full px-4 py-3 text-left text-lg font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-orange-600/20 ${
                            language === 'en' ? 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 text-orange-300' : 'text-white/80 hover:text-orange-300'
                          }`}
                        >
                          🇺🇸 English
                        </button>
                        <button
                          onClick={() => {
                            setLanguage('tr')
                            setIsMobileLanguageDropdownOpen(false)
                          }}
                          className={`w-full px-4 py-3 text-left text-lg font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-orange-600/20 ${
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
            </nav>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <Hero />

      {/* Video Showcase Section */}
      <VideoShowcase />

      {/* Pricing Section */}
      <div id="pricing">
        <PricingSection />
      </div>

      <NewReleasePromo />

      {/* FAQ Section */}
      <div id="faq">
        <FAQSection />
      </div>

      {/* Sticky Footer */}
      <StickyFooter />
      
      {/* Tawk.to Live Chat Widget */}
      <TawkToWidget />
    </div>
  )
}

export default function Home() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  )
}
