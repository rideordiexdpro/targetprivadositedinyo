"use client"
import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'tr'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.testimonials': 'Testimonials',
    'nav.faq': 'FAQ',
    
    // Hero Section
    'hero.badge': 'Undetected & Updated',
    'hero.title.target': 'TARGET',
    'hero.title.fivem': 'FiveM',
    'hero.title.domination': 'Domination',
    'hero.description': 'Get Target , Get Power.',
    'hero.cta': 'Get Access',
    'hero.trusted': 'Trusted by FiveM players worldwide',
    'hero.stats.users': 'Active Users',
    'hero.stats.undetected': 'Undetected',
    'hero.stats.support': 'Support',
    'hero.stats.servers': 'Servers',
    
    // Showcase Section
    'showcase.title': 'Showcase',
    'showcase.subtitle': 'See Target in Action',
    'showcase.description': 'Experience the power of Target with our intuitive interface and advanced features designed for FiveM domination.',
    
    // Features Section
    'features.title': 'Cheat Features',
    'features.subtitle': 'Target Features',
    
    // Video Showcase Section
    'video.title': 'Watch Target in Action',
    'video.description': 'See how Target dominates FiveM servers',
    
    // Anticheat Bypass Section
    'bypass.badge': 'Bypass Status',
    'bypass.title': 'Anticheat Bypass Status',
    'bypass.description': 'Target successfully bypasses all major anticheat systems used in FiveM servers',
    'bypass.footer': 'All bypass methods are regularly updated and tested',
    'features.esp.title': 'Undetectable Screenshot Tools Bypass Method',
    'features.esp.description': 'Advanced bypass system that defeats all screenshot detection tools and anti-cheat systems. Completely invisible to all monitoring software while providing full ESP functionality.',
    'features.esp.player': 'Bypass Method for SS Tools',
    'features.esp.vehicle': 'Undetectable Vehicle ESP',
    'features.esp.item': 'Anti-Screenshot Protection',
    'features.esp.health': 'Bypass All Detection',
    'features.esp.distance': 'Stealth Distance Info',
    'features.esp.names': 'Undetectable Names',
    'features.aimbot.title': 'Encrypted Targeting',
    'features.aimbot.description': 'Military-grade encrypted aimbot with advanced cryptographic protection. All targeting data is encrypted in real-time, making detection impossible while delivering perfect accuracy.',
    'features.aimbot.smooth': 'Encrypted & Cant Detect',
    'features.aimbot.fov': 'Hidden FOV System',
    'features.aimbot.bones': 'Encrypted Bone Target',
    'features.aimbot.silent': 'Cant Detect Silent Aim',
    'features.aimbot.trigger': 'Encrypted Triggerbot',
    'features.aimbot.rcs': 'Hidden Recoil Control',
    
    // Pricing Section
    'pricing.badge': 'Subscription Plans',
    'pricing.title': 'Choose your power',
    'pricing.description': 'Dominate FiveM servers with our undetectable cheat. All plans include regular updates and anti-cheat bypass.',
    'pricing.monthly': 'Monthly',
    'pricing.annual': 'Annual',
    'pricing.save': 'Save 20%',
    'pricing.popular': 'Most Popular',
    'pricing.month': '/month',
    'pricing.year': '/year',
    'pricing.basic.name': 'Basic',
    'pricing.basic.description': 'Essential features for casual players',
    'pricing.basic.cta': 'Get Basic',
    'pricing.premium.name': 'Premium',
    'pricing.premium.description': 'Advanced features for serious players',
    'pricing.premium.cta': 'Get Premium',
    'pricing.elite.name': 'Elite',
    'pricing.elite.description': 'Ultimate package for professional players',
    'pricing.elite.cta': 'Get Elite',
    'pricing.features.basic_esp': 'Basic ESP',
    'pricing.features.simple_aimbot': 'Simple Aimbot',
    'pricing.features.community_support': 'Community Support',
    'pricing.features.basic_antidetection': 'Basic Anti-Detection',
    'pricing.features.hwid_slot': '1 HWID Slot',
    'pricing.features.advanced_esp': 'Advanced ESP & Wallhacks',
    'pricing.features.premium_aimbot': 'Premium Aimbot & Triggerbot',
    'pricing.features.priority_support': 'Priority Support',
    'pricing.features.advanced_antidetection': 'Advanced Anti-Detection',
    'pricing.features.custom_themes': 'Custom Menu Themes',
    'pricing.features.hwid_slots': '3 HWID Slots',
    'pricing.features.regular_updates': 'Regular Updates',
    'pricing.features.everything_premium': 'Everything in Premium',
    'pricing.features.custom_requests': 'Custom Feature Requests',
    'pricing.features.private_discord': 'Private Discord Channel',
    'pricing.features.beta_access': 'Beta Access',
    'pricing.features.hwid_spoofer': 'HWID Spoofer',
    'pricing.features.unlimited_hwid': 'Unlimited HWID Slots',
    'pricing.features.vip_support': '24/7 VIP Support',
    'pricing.bottom.text': 'Need a custom cheat or have questions? We\'re here to help.',
    'pricing.bottom.cta': 'Contact our support team →',
    
    // FAQ Section
    'faq.title': 'Got Questions? We\'ve Got Answers',
    'faq.badge': 'FAQ',
    'faq.q1': 'Is it detectable?',
    'faq.a1': 'We minimize detection risk using current bypass technologies. Regular updates provide protection against anti-cheat systems.',
    'faq.q2': 'How often do updates come?',
    'faq.a2': 'Necessary patches are released quickly according to game updates. Weekly maintenance updates are usually made.',
    'faq.q3': 'Can I use it on multiple PCs?',
    'faq.a3': 'Each license is valid for a single device, separate license required for additional device. Device connection is made with HWID system.',
    'faq.q4': 'Is there a money back guarantee?',
    'faq.a4': 'No refunds are made due to being a digital product. You can try the free version before purchasing.',
    'faq.q5': 'How do I get support?',
    'faq.a5': 'You can get 24/7 support from our Discord server. Special support channels are available for premium users.',
    
    // Status Page
    'status.under_maintenance': 'Under Maintenance',
    'status.system_maintenance': 'System Under Maintenance',
    'status.status_description': 'Real-time status of Target 2.0 and all services',
  },
  tr: {
    // Navigation
    'nav.features': 'Özellikler',
    'nav.pricing': 'Fiyatlandırma',
    'nav.testimonials': 'Yorumlar',
    'nav.faq': 'SSS',
    
    // Hero Section
    'hero.badge': 'Tespit Edilmez & Güncel',
    'hero.title.target': 'TARGET',
    'hero.title.fivem': 'FiveM',
    'hero.title.domination': 'Hakimiyeti',
    'hero.description': 'Get Target , Get Power.',
    'hero.cta': 'Erişim Al',
    'hero.trusted': 'Dünya çapında FiveM oyuncuları tarafından güveniliyor',
    'hero.stats.users': 'Aktif Kullanıcı',
    'hero.stats.undetected': 'Tespit Edilmez',
    'hero.stats.support': 'Destek',
    'hero.stats.servers': 'Sunucu',
    
    // Showcase Section
    'showcase.title': 'Vitrin',
    'showcase.subtitle': 'Target\'ı Aksiyonda Gör',
    'showcase.description': 'FiveM hakimiyeti için tasarlanmış sezgisel arayüzümüz ve gelişmiş özelliklerimizle Target\'ın gücünü deneyimleyin.',
    
    // Features Section
    'features.title': 'Hile Özellikleri',
    'features.subtitle': 'Target Özellikleri',
    
    // Video Showcase Section
    'video.title': 'Target\'ı Aksiyonda İzle',
    'video.description': 'Target\'ın FiveM sunucularında nasıl hakimiyet kurduğunu gör',
    
    // Anticheat Bypass Section
    'bypass.badge': 'Bypass Durumu',
    'bypass.title': 'Anticheat Bypass Durumu',
    'bypass.description': 'Target, FiveM sunucularında kullanılan tüm büyük anticheat sistemlerini başarıyla bypass eder',
    'bypass.footer': 'Tüm bypass yöntemleri düzenli olarak güncellenir ve test edilir',
    'features.esp.title': 'Tespit Edilmez Ekran Görüntüsü Araçları Bypass Metodu',
    'features.esp.description': 'Tüm ekran görüntüsü tespit araçlarını ve anti-cheat sistemlerini yenen gelişmiş bypass sistemi. Tam ESP işlevselliği sağlarken tüm izleme yazılımlarından tamamen görünmez.',
    'features.esp.player': 'SS Araçları İçin Bypass',
    'features.esp.vehicle': 'Tespit Edilmez Araç ESP',
    'features.esp.item': 'Anti-Ekran Görüntüsü Koruma',
    'features.esp.health': 'Tüm Tespitleri Bypass',
    'features.esp.distance': 'Gizli Mesafe Bilgisi',
    'features.esp.names': 'Tespit Edilmez İsimler',
    'features.aimbot.title': 'Şifreli Hedefleme',
    'features.aimbot.description': 'Gelişmiş kriptografik koruma ile askeri düzeyde şifreli aimbot. Tüm hedefleme verileri gerçek zamanlı şifrelenir, tespit edilmeyi imkansız hale getirirken mükemmel isabetlilik sağlar.',
    'features.aimbot.smooth': 'Şifreli & Tespit Edilmez',
    'features.aimbot.fov': 'Gizli FOV Sistemi',
    'features.aimbot.bones': 'Şifreli Kemik Hedefleme',
    'features.aimbot.silent': 'Tespit Edilmez Sessiz Nişan',
    'features.aimbot.trigger': 'Şifreli Triggerbot',
    'features.aimbot.rcs': 'Gizli Recoil Kontrolü',
    
    // Pricing Section
    'pricing.badge': 'Abonelik Planları',
    'pricing.title': 'Gücünü seç',
    'pricing.description': 'Tespit edilemeyen hilemizle FiveM sunucularında hakimiyet kur. Tüm planlar düzenli güncellemeler ve anti-cheat bypass içerir.',
    'pricing.monthly': 'Aylık',
    'pricing.annual': 'Yıllık',
    'pricing.save': '%20 Tasarruf',
    'pricing.popular': 'En Popüler',
    'pricing.month': '/ay',
    'pricing.year': '/yıl',
    'pricing.basic.name': 'Temel',
    'pricing.basic.description': 'Sıradan oyuncular için temel özellikler',
    'pricing.basic.cta': 'Temel Al',
    'pricing.premium.name': 'Premium',
    'pricing.premium.description': 'Ciddi oyuncular için gelişmiş özellikler',
    'pricing.premium.cta': 'Premium Al',
    'pricing.elite.name': 'Elite',
    'pricing.elite.description': 'Profesyonel oyuncular için nihai paket',
    'pricing.elite.cta': 'Elite Al',
    'pricing.features.basic_esp': 'Temel ESP',
    'pricing.features.simple_aimbot': 'Basit Aimbot',
    'pricing.features.community_support': 'Topluluk Desteği',
    'pricing.features.basic_antidetection': 'Temel Anti-Tespit',
    'pricing.features.hwid_slot': '1 HWID Slot',
    'pricing.features.advanced_esp': 'Gelişmiş ESP & Duvar Hilesi',
    'pricing.features.premium_aimbot': 'Premium Aimbot & Triggerbot',
    'pricing.features.priority_support': 'Öncelikli Destek',
    'pricing.features.advanced_antidetection': 'Gelişmiş Anti-Tespit',
    'pricing.features.custom_themes': 'Özel Menü Temaları',
    'pricing.features.hwid_slots': '3 HWID Slot',
    'pricing.features.regular_updates': 'Düzenli Güncellemeler',
    'pricing.features.everything_premium': 'Premium\'daki Her Şey',
    'pricing.features.custom_requests': 'Özel Özellik İstekleri',
    'pricing.features.private_discord': 'Özel Discord Kanalı',
    'pricing.features.beta_access': 'Beta Erişimi',
    'pricing.features.hwid_spoofer': 'HWID Spoofer',
    'pricing.features.unlimited_hwid': 'Sınırsız HWID Slot',
    'pricing.features.vip_support': '7/24 VIP Destek',
    'pricing.bottom.text': 'Özel bir hile mi gerekiyor veya sorularınız mı var? Yardım için buradayız.',
    'pricing.bottom.cta': 'Destek ekibimizle iletişime geçin →',
    
    // FAQ Section
    'faq.title': 'Sorularınız mı var? Cevaplarımız hazır',
    'faq.badge': 'SSS',
    'faq.q1': 'Tespit edilir mi?',
    'faq.a1': 'Güncel bypass teknolojileri kullanılarak tespit riskini minimize ediyoruz. Düzenli güncellemeler ile anti-cheat sistemlerine karşı koruma sağlanır.',
    'faq.q2': 'Ne kadar sık güncelleme geliyor?',
    'faq.a2': 'Oyun güncellemelerine göre gerekli yamalar hızlıca yayınlanır. Genellikle haftalık bakım güncellemeleri yapılır.',
    'faq.q3': 'Birden fazla PC\'de kullanabilir miyim?',
    'faq.a3': 'Her lisans tek cihaz için geçerlidir, ek cihaz için ayrı lisans gerekir. HWID sistemi ile cihaz bağlantısı yapılır.',
    'faq.q4': 'Para iade garantisi var mı?',
    'faq.a4': 'Dijital ürün olması nedeniyle iade yapılmamaktadır.',
    'faq.q5': 'Destek nasıl alırım?',
    'faq.a5': 'Discord sunucumuzdan 7/24 destek alabilirsiniz.',
    
    // Status Page
    'status.under_maintenance': 'Bakımda',
    'status.system_maintenance': 'Sistem Bakımda',
    'status.status_description': 'Target 2.0 ve tüm servislerin gerçek zamanlı durumu',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'tr')) {
        setLanguage(savedLanguage)
      }
    }
  }, [])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: 'en', setLanguage: () => {}, t: (key: string) => key }}>
        {children}
      </LanguageContext.Provider>
    )
  }

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang)
    }
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
